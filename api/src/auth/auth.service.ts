import { HttpException, Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDTO: RegisterDTO): Promise<{
    access_token: string;
  }> {
    const user = await this.UserService.create(registerDTO);
    const payload = { username: user.username, sub: user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(loginDTO: LoginDTO): Promise<{
    access_token: string;
  }> {
    const user = await this.UserService.findOneByUnique({
      email: loginDTO.emailOrUsername,
      username: loginDTO.emailOrUsername,
    });

    if (!user) {
      throw new HttpException('Username or Email not registered', 404);
    }

    const isPasswordMatch = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException('Invalid password', 401);
    }

    const payload = {
      username: user.username,
      sub: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
