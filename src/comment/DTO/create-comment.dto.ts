import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCommentDTO {
  @IsNotEmpty()
  continent: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  writer: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @IsNotEmpty()
  content: string;
}
