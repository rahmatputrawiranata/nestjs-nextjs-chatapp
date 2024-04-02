import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { HttpResponseInterface } from 'src/@interceptors/http-transformer.interceptor';
import { Public } from './decorators/public.decorator';

@Controller('/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerDTO: RegisterDTO): Promise<
    HttpResponseInterface<{
      access_token: string;
    }>
  > {
    const tokenResponse = await this.authService.register(registerDTO);
    return {
      status: true,
      statusCode: HttpStatus.CREATED,
      response: tokenResponse,
    };
  }

  @Public()
  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<
    HttpResponseInterface<{
      access_token: string;
    }>
  > {
    const tokenResponse = await this.authService.login(loginDTO);

    return {
      status: true,
      statusCode: HttpStatus.OK,
      response: tokenResponse,
    };
  }
}
