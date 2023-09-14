import { IsNotEmpty, MinLength } from 'class-validator';

export class SignInUserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;
}
