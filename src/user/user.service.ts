import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { SignInUserDTO } from './dto/signIn-user.dto';

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
}
