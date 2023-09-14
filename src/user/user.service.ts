import {
  ConflictException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { SignInUserDTO } from './dto/signIn-user.dto';
import { DeleteUserDTO } from './dto/delete-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findUser(name: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: { name: name },
    });
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const user = await this.findUser(createUserDTO.name);
    if (user) {
      throw new ConflictException('이미 존재하는 아이디입니다.');
    }

    return await this.prismaService.user.create({ data: createUserDTO });
  }
  async signIn(signInUserDTO: SignInUserDTO): Promise<User> {
    const { name, password } = signInUserDTO;
    const user = await this.findUser(name);
    if (!user && user.password !== password) {
      throw new ConflictException('아이디 또는 비밀번호가 잘못되었습니다.');
    }

    return user;
  }

  async delete(id: number, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) {
      throw new BadRequestException('이미 탈퇴한 유저입니다.');
    } else if (user.password === password) {
      await this.prismaService.user.delete({ where: { id: Number(id) } });
    }
  }
}
