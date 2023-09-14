import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCommentDTO {
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  writer: string;
  @IsNotEmpty()
  content: string;
}
