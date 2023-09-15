import { Expose } from 'class-transformer';

@Expose()
export class CommentDTO {
  id: number;
  continent: string;
  country: string;
  writer: string;
  password: string;
  content: string;
  createAt: Date;
}
