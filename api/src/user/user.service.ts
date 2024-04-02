import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { FilterQuery, Model } from 'mongoose';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserProfileDTO } from './dto/createUser.dto';
import { ZodiacService } from 'src/zodiac/zodiac.service';
import { HoroscopeService } from 'src/horoscope/horoscope.service';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private zodiacService: ZodiacService,
    private horoscopeService: HoroscopeService,
  ) {}

  async findOneByUnique({
    id,
    username,
    email,
  }: {
    id?: string;
    username?: string;
    email?: string;
  }) {
    if (!id && !username && !email) {
      return null;
    }

    const orMethod: FilterQuery<User>[] = [];
    if (id) orMethod.push({ _id: id });
    if (username) orMethod.push({ username });
    if (email) orMethod.push({ email });
    const res = await this.userModel.findOne({
      $or: orMethod,
    });
    return res;
  }

  async findByUnique({
    id,
    username,
    email,
  }: {
    id?: string;
    username?: string;
    email?: string;
  }): Promise<UserDTO> {
    const user = await this.findOneByUnique({
      id,
      username,
      email,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      profile: user.profile ?? null,
    };
  }

  async create(user: CreateUserDTO): Promise<UserDTO> {
    const [userExistsByEmail, userExistsByUsername] = await Promise.all([
      await this.findOneByUnique({ email: user.email }),
      await this.findOneByUnique({ username: user.username }),
    ]);

    if (userExistsByEmail) {
      throw new HttpException(
        'This email already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (userExistsByUsername) {
      throw new HttpException(
        'This username already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    const password = await bcrypt.hash(user.password, 10);
    const userCreated = await this.userModel.create({
      ...user,
      password,
    });

    return {
      id: userCreated.id,
      username: userCreated.username,
      email: userCreated.email,
      profile: userCreated.profile ?? null,
    };
  }

  async updateProfile(
    userId: string,
    userProfile: UpdateUserProfileDTO,
  ): Promise<UserDTO> {
    const user = await this.findOneByUnique({ id: userId });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const zodiac = await this.zodiacService.findZodiacByDate(
      userProfile.birthDate,
    );

    if (!zodiac) {
      throw new HttpException('Zodiac not found', HttpStatus.NOT_FOUND);
    }
    const horoscope = await this.horoscopeService.findHoroscopeByDate(
      userProfile.birthDate,
    );
    // console.log(zodiac, horoscope)
    if (!horoscope) {
      throw new HttpException('Horoscope not found', HttpStatus.NOT_FOUND);
    }
    const profile = {
      ...userProfile,
      birthDate: new Date(userProfile.birthDate),
      zodiac: zodiac.name,
      horoscope: horoscope.name,
    };

    user.profile = profile;
    await user.save();

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      profile: user.profile ?? null,
    };
  }
}
