import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserService } from '../user.service';
import { Injectable } from '@nestjs/common';

export class ProfileDTO {
  name: string;
  gender: string;
  birthDate: Date;
  height: number;
  weight: number;
  zodiac: string;
  horoscope: string;
  imageProfileBase64?: string;
}

export class UserDTO {
  id: string;
  email: string;
  username: string;
  password?: string;
  profile?: ProfileDTO;
}

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUserUsernameUniqueConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly UserService: UserService) {}

  async validate(username: string, args: ValidationArguments) {
    const user = await this.UserService.findOneByUnique({
      username: username,
    });
    return !user;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Username "${validationArguments.value}" is already taken. Please choose another one.`;
  }
}

export class IsUserEmailUniqueConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly UserService: UserService) {}

  async validate(email: string, args: ValidationArguments) {
    const user = await this.UserService.findOneByUnique({
      email: email,
    });
    return !user;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Email "${validationArguments.value}" is already taken. Please choose another one.`;
  }
}

export function IsUserUsernameUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserUsernameUniqueConstraint,
    });
  };
}

export function IsUserEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserEmailUniqueConstraint,
    });
  };
}
