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
  UseGuards,
} from '@nestjs/common';
import { Comment, CommentId } from '~/modules/comment/comment.entity';
import { CommentService } from '~/modules/comment/comment.service';
import { CommentCreateDto } from '~modules/comment/dto/comment.create.dto';
import { CommentDto } from '~modules/comment/dto/comment.dto';
import { CommentUpdateDto } from '~modules/comment/dto/comment.update.dto';
import { JwtGuard, UserRequest } from '~modules/user/jwt.guard';
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

  @UseGuards(JwtGuard)
  @Post()
  public async create(
    @Body() data: CommentCreateDto,
    @Request() request: UserRequest,
  ): Promise<CommentDto> {
    const comment = await this.commentService.create(request, data);
    return CommentDto.fromComment(comment);
  }

  @UseGuards(JwtGuard)
  @Put('/:id')
  public async update(
    @Body() data: CommentUpdateDto,
    @Param('id') id: CommentId,
    @Request() request: UserRequest,
  ): Promise<CommentDto> {
    const comment = await this.commentService.update(request, id, data);
    return CommentDto.fromComment(comment);
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  public async get(
    @Param('id') id: CommentId,
    @Request() request: UserRequest,
  ): Promise<CommentDto> {
    const comment = await this.commentService.find({ id });

    return CommentDto.fromComment(comment);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  public async delete(
    @Param('id') id: CommentId,
    @Request() request: UserRequest,
  ): Promise<{ status: string }> {
    await this.commentService.delete(request, { id });

    return {
      status: '200',
    };
  }
}
