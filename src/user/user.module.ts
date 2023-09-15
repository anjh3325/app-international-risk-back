import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { CommentService } from 'src/comment/comment.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, CommentService],
})
export class UserModule {}
