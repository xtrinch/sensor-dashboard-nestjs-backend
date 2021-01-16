import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CommentCreateDto } from '~modules/comment/dto/comment.create.dto';
import { CommentUpdateDto } from '~modules/comment/dto/comment.update.dto';
import { UserRequest } from '~modules/user/jwt.guard';
import { PaginationQueryDto } from '~utils/pagination.query.dto';
import { Comment, CommentId, CommentWhereInterface } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  public async findAll(
    where: CommentWhereInterface,
    options: { relations?: string[] },
    pagination: PaginationQueryDto,
  ): Promise<Pagination<Comment>> {
    const results = await paginate<Comment>(
      this.commentRepository,
      pagination,
      {
        ...options,
        where,
      },
    );

    return results;
  }

  public async find(
    where: CommentWhereInterface,
    options?: { relations: string[] },
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne(where, options);

    if (!comment) {
      throw new NotFoundException();
    }

    return comment;
  }

  public async create(
    request: UserRequest,
    data: CommentCreateDto,
  ): Promise<Comment> {
    const comment = new Comment();
    comment.userId = request.user?.id;
    comment.user = request.user;
    comment.description = data.description;
    comment.topicId = data.topicId;

    await Comment.save(comment);

    return comment;
  }

  public async update(
    request: UserRequest,
    id: CommentId,
    data: CommentUpdateDto,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOneOrFail({ id });

    if (comment.userId !== request.user?.id) {
      throw new ForbiddenException();
    }
    if (data.description) {
      comment.description = data.description;
    }

    await Comment.save(comment);

    return comment;
  }

  public async delete(
    request: UserRequest,
    where: CommentWhereInterface,
  ): Promise<boolean> {
    const comment = await this.find(where);

    if (comment.userId !== request.user?.id) {
      throw new ForbiddenException();
    }

    await Comment.remove(comment);

    return true;
  }
}
