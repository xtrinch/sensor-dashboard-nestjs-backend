import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { TopicCreateDto } from '~modules/topic/dto/topic.create.dto';
import { TopicUpdateDto } from '~modules/topic/dto/topic.update.dto';
import { UserRequest } from '~modules/user/jwt.guard';
import { PaginationQueryDto } from '~utils/pagination.query.dto';
import { Topic, TopicId, TopicWhereInterface } from './topic.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
  ) {}

  public async findAll(
    where: TopicWhereInterface,
    options: { relations?: string[] },
    pagination: PaginationQueryDto,
  ): Promise<Pagination<Topic>> {
    const results = await paginate<Topic>(this.topicRepository, pagination, {
      ...options,
      where,
    });

    return results;
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
    const topic = new Topic();
    topic.userId = request.user?.id;
    topic.user = request.user;
    topic.name = data.name;
    topic.categoryId = data.categoryId;

    await Topic.save(topic);

    return topic;
  }

  public async update(
    request: UserRequest,
    id: TopicId,
    data: TopicUpdateDto,
  ): Promise<Topic> {
    const topic = await this.topicRepository.findOneOrFail({ id });

    if (topic.userId !== request.user?.id) {
      throw new ForbiddenException();
    }
    if (data.name) {
      topic.name = data.name;
    }
    await Topic.save(topic);

    return topic;
  }

  public async delete(
    where: TopicWhereInterface,
  ): Promise<boolean> {
    const topic = await this.find(where);
    if (!topic) {
      throw new BadRequestException("Cannot delete topic.");
    }
    await Topic.remove(topic);

    return true;
  }
}
