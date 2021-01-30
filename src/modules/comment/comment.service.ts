import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CategoryRepository } from '~modules/category/category.repository';
import { CommentCreateDto } from '~modules/comment/dto/comment.create.dto';
import { CommentUpdateDto } from '~modules/comment/dto/comment.update.dto';
import { Topic } from '~modules/topic/topic.entity';
import { UserRequest } from '~modules/user/jwt.guard';
import { PaginationQueryDto } from '~utils/pagination.query.dto';
import { Comment, CommentWhereInterface } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Topic)
    public topicRepository: Repository<Topic>,
    @InjectRepository(CategoryRepository)
    public categoryRepository: CategoryRepository,
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
    let comment = new Comment();
    comment.userId = request.user?.id;
    comment.user = request.user;
    comment.description = data.description;
    comment.topicId = data.topicId;
    comment.categoryId = data.categoryId;
    comment.name = data.name;

    comment = await Comment.save(comment);

    await this.topicRepository.update(
      { id: comment.topicId },
      { lastCommentId: comment.id },
    );
    await this.categoryRepository.update(
      { id: comment.categoryId },
      { lastCommentId: comment.id },
    );

    return comment;
  }

  public async update(
    where: CommentWhereInterface,
    data: CommentUpdateDto,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOneOrFail(where);

    comment.description = data.description;
    comment.name = data.name;

    await Comment.save(comment);

    return comment;
  }

  public async delete(where: CommentWhereInterface): Promise<boolean> {
    const comment = await this.find(where);

    await Comment.remove(comment);

    return true;
  }
}
