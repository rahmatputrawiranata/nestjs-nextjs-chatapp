import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  emailOrUsername: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
