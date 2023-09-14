import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  BadRequestException,
} from '@nestjs/common/exceptions';
import { Comment } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentDTO } from './DTO/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  async create(createCommentDTO: CreateCommentDTO): Promise<Comment> {
    return await this.prismaService.comment.create({
      data: createCommentDTO,
    });
  }

  async delete(id: number) {
    const comment = await this.prismaService.comment.findUnique({
      where: { id: Number(id) },
    });
    if (!comment) {
      throw new BadRequestException('이미 삭제된 코멘트입니다.');
    }
    await this.prismaService.comment.delete({ where: { id: Number(id) } });
  }
}
