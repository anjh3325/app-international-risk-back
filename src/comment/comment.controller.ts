import { Controller } from '@nestjs/common';
import {
  UseInterceptors,
  UsePipes,
  Body,
  Post,
  Delete,
  Param,
  Patch,
  Get,
} from '@nestjs/common/decorators';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { CommentService } from './comment.service';

import { Comment } from '@prisma/client';
import { CommentDTO } from './DTO/comment.dto';
import { plainToInstance } from 'class-transformer';
import { CreateCommentDTO } from './DTO/create-comment.dto';
import { ModifyCommentDTO } from './DTO/modify-comment.dto';
import { DeleteCommentDTO } from './DTO/delete-comment.dto';

@Controller('comment')
@UsePipes(ValidationPipe)
@UseInterceptors(ClassSerializerInterceptor)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 전체 코멘트 불러오기
  @Get()
  async getAll(): Promise<Comment[]> {
    return await this.commentService.getAll();
  }

  // 코멘트 작성
  @Post()
  async create(@Body() createCommentDTO: CreateCommentDTO): Promise<Comment> {
    const created = this.commentService.create(createCommentDTO);

    return plainToInstance(CommentDTO, created);
  }

  // 코멘트 삭제
  @Delete()
  async deleteComment(@Body() deleteCommentDTO: DeleteCommentDTO) {
    await this.commentService.delete(deleteCommentDTO);
  }

  // 코멘트 수정
  @Patch()
  async modifyComment(
    @Body() modifyCommentDTO: ModifyCommentDTO,
  ): Promise<Comment> {
    const modify = await this.commentService.modify(modifyCommentDTO);

    return plainToInstance(CommentDTO, modify);
  }
}
