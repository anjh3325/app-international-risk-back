import { Expose } from 'class-transformer';

@Expose()
export class CommentDTO {
  id: number;
  country: string;
  writer: string;
  content: string;
  createAt: Date;
}
