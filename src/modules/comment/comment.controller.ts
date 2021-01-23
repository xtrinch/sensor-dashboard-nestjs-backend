import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { Comment, CommentId } from '~/modules/comment/comment.entity';
import { CommentService } from '~/modules/comment/comment.service';
import { CommentCreateDto } from '~modules/comment/dto/comment.create.dto';
import { CommentDto } from '~modules/comment/dto/comment.dto';
import { CommentUpdateDto } from '~modules/comment/dto/comment.update.dto';
import AuthGuard from '~modules/user/auth.decorator';
import { UserRequest } from '~modules/user/jwt.guard';
import { PaginationDto } from '~utils/pagination.dto';
import { PaginationQueryDto } from '~utils/pagination.query.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  public async findAll(
    @Query() pagination: PaginationQueryDto,
  ): Promise<PaginationDto<CommentDto>> {
    const items = await this.commentService.findAll({}, {}, pagination);

    return PaginationDto.fromPagination<Comment, CommentDto>(
      items,
      CommentDto.fromComment,
    );
  }

  @AuthGuard()
  @Post()
  public async create(
    @Body() data: CommentCreateDto,
    @Request() request: UserRequest,
  ): Promise<CommentDto> {
    const comment = await this.commentService.create(request, data);
    return CommentDto.fromComment(comment);
  }

  @AuthGuard()
  @Put('/:id')
  public async update(
    @Body() data: CommentUpdateDto,
    @Param('id') id: CommentId,
    @Request() request: UserRequest,
  ): Promise<CommentDto> {
    const comment = await this.commentService.update(id, data);
    return CommentDto.fromComment(comment);
  }

  @AuthGuard()
  @Get('/:id')
  public async get(
    @Param('id') id: CommentId,
    @Request() request: UserRequest,
  ): Promise<CommentDto> {
    const comment = await this.commentService.find({ id });

    return CommentDto.fromComment(comment);
  }

  @AuthGuard()
  @Delete('/:id')
  public async delete(
    @Param('id') id: CommentId,
    @Request() request: UserRequest,
  ): Promise<{ status: string }> {
    await this.commentService.delete({ id, userId: request.user?.id });

    return {
      status: '200',
    };
  }
}
