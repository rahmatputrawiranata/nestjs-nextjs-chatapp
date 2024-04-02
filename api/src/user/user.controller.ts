import {
  Body,
  Controller,
  Get,
  Post,
  Request
} from '@nestjs/common';
import { HttpResponseInterface } from 'src/@interceptors/http-transformer.interceptor';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { UpdateUserProfileDTO } from './dto/createUser.dto';

@Controller('')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async getUserProfile(
    @Request() req,
  ): Promise<HttpResponseInterface<UserDTO>> {
    const user = await this.userService.findByUnique({
      id: req.user.id,
    });

    return {
      status: true,
      statusCode: 200,
      response: user,
    };
  }

  @Post('updateProfile')
  async createProfile(
    @Request() req,
    @Body() updateUserProfileDTO: UpdateUserProfileDTO,
  ): Promise<HttpResponseInterface<UserDTO>> {
    const user = await this.userService.updateProfile(
      req.user.id,
      updateUserProfileDTO,
    );
    return {
      status: true,
      statusCode: 201,
      response: user,
    };
  }
}
