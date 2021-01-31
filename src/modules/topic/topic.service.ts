import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CategoryRepository } from '~modules/category/category.repository';
import { TopicCreateDto } from '~modules/topic/dto/topic.create.dto';
import { TopicUpdateDto } from '~modules/topic/dto/topic.update.dto';
import { TopicRepository } from '~modules/topic/topic.repository';
import { UserRequest } from '~modules/user/jwt.guard';
import { PaginationQueryDto } from '~utils/pagination.query.dto';
import { Topic, TopicWhereInterface } from './topic.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(TopicRepository)
    private topicRepository: TopicRepository,
    @InjectRepository(CategoryRepository)
    public categoryRepository: CategoryRepository,
  ) {}

  public async findAll(
    where: TopicWhereInterface,
    options: { relations?: string[] },
    pagination: PaginationQueryDto,
  ): Promise<Pagination<Topic>> {
    return this.topicRepository.findAll(where, options, pagination);
  }

  public async find(
    where: TopicWhereInterface,
    options?: { relations: string[] },
  ): Promise<Topic> {
    const topic = await this.topicRepository.findOne(where, options);

    if (!topic) {
      throw new NotFoundException();
    }

    return topic;
  }

  public async create(
    request: UserRequest,
    data: TopicCreateDto,
  ): Promise<Topic> {
    let topic = new Topic();
    topic.userId = request.user?.id;
    topic.user = request.user;
    topic.name = data.name;
    topic.categoryId = data.categoryId;
    topic.description = data.description;
    topic.tag = data.tag;

    topic = await Topic.save(topic);

    await this.categoryRepository.update(
      { id: topic.categoryId },
      { lastTopicId: topic.id },
    );

    return topic;
  }

  public async update(
    where: TopicWhereInterface,
    data: TopicUpdateDto,
  ): Promise<Topic> {
    const topic = await this.find(where);

    topic.name = data.name;
    topic.description = data.description;
    topic.tag = data.tag;

    await Topic.save(topic);

    return topic;
  }

  public async delete(where: TopicWhereInterface): Promise<boolean> {
    const topic = await this.find(where);
    if (!topic) {
      throw new BadRequestException('Cannot delete topic.');
    }
    await Topic.remove(topic);

    return true;
  }
}
