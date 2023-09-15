import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Comment } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentDTO } from './DTO/create-comment.dto';
import { DeleteCommentDTO } from './DTO/delete-comment.dto';
import { ModifyCommentDTO } from './DTO/modify-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  async findById(id: number): Promise<Comment> {
    return await this.prismaService.comment.findUnique({
      where: { id: Number(id) },
    });
  }

  async getAll(): Promise<Comment[]> {
    return await this.prismaService.comment.findMany();
  }

  async create(createCommentDTO: CreateCommentDTO): Promise<Comment> {
    return await this.prismaService.comment.create({
      data: createCommentDTO,
    });
  }

  async modify(modifyCommentDTO: ModifyCommentDTO): Promise<Comment> {
    const { id, password, content } = modifyCommentDTO;
    const comment = await this.findById(id);

    if (comment.password !== password) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    return await this.prismaService.comment.update({
      where: { id: Number(id) },
      data: { content: content },
    });
  }

  async delete(deleteCommentDTO: DeleteCommentDTO) {
    const { id, password } = deleteCommentDTO;
    const comment = await this.findById(id);

    if (!comment) {
      throw new BadRequestException('이미 삭제된 코멘트입니다.');
    }
    if (comment.password !== password) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    await this.prismaService.comment.delete({ where: { id: Number(id) } });
  }

  async deleteAllbyWriter(writer: string) {
    await this.prismaService.comment.deleteMany({ where: { writer: writer } });
  }
}
