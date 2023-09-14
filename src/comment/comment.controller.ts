import { Controller } from '@nestjs/common';
import {
  UseInterceptors,
  UsePipes,
  Body,
  Post,
  Delete,
  Param,
} from '@nestjs/common/decorators';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { CommentService } from './comment.service';
import { CreateCommentDTO } from './DTO/create-comment.dto';
import { Comment } from '@prisma/client';
import { CommentDTO } from './DTO/comment.dto';
import { plainToInstance } from 'class-transformer';

@Controller('comment')
@UsePipes(ValidationPipe)
@UseInterceptors(ClassSerializerInterceptor)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 코멘트 작성
  @Post()
  async create(@Body() createCommentDTO: CreateCommentDTO): Promise<Comment> {
    const created = this.commentService.create(createCommentDTO);

    return plainToInstance(CommentDTO, created);
  }

  // 코멘트 삭제
  @Delete('/:id')
  async deleteComment(@Param('id', ParseIntPipe) id: number) {
    await this.commentService.delete(id);
  }
}
