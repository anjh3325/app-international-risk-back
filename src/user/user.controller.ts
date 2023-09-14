import { Controller } from '@nestjs/common';
import {
  Body,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { SignInUserDTO } from './dto/signIn-user.dto';

@Controller('user')
@UsePipes(ValidationPipe)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입
  @Post('/create')
  async create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    const created = await this.userService.create(createUserDTO);
    return plainToInstance(UserDTO, created);
  }

  // 로그인
  @Post('/signIn')
  async signIn(@Body() signInUserDTO: SignInUserDTO): Promise<User> {
    const user = await this.userService.signIn(signInUserDTO);
    return plainToInstance(UserDTO, user);
  }
}
