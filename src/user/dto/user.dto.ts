import { Exclude, Expose } from 'class-transformer';

@Expose()
export class UserDTO {
  id: number;
  name: string;

  @Exclude()
  password: string;

  createAt: Date;
}
