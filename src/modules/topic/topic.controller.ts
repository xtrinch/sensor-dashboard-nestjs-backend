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
import { Topic, TopicId } from '~/modules/topic/topic.entity';
import { TopicService } from '~/modules/topic/topic.service';
import { TopicCreateDto } from '~modules/topic/dto/topic.create.dto';
import { TopicDto } from '~modules/topic/dto/topic.dto';
import { TopicQueryDto } from '~modules/topic/dto/topic.query.dto';
import { TopicUpdateDto } from '~modules/topic/dto/topic.update.dto';
import AuthGuard from '~modules/user/auth.decorator';
import { PermissionsEnum } from '~modules/user/enum/permissions.enum';
import { UserRequest } from '~modules/user/jwt.guard';
import { PaginationDto } from '~utils/pagination.dto';
import { PaginationQueryDto } from '~utils/pagination.query.dto';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  public async findAll(
    @Query() pagination: PaginationQueryDto,
    @Query() query: TopicQueryDto,
  ): Promise<PaginationDto<TopicDto>> {
    const items = await this.topicService.findAll(
      { categoryId: query.categoryId },
      {},
      pagination,
    );

    return PaginationDto.fromPagination<Topic, TopicDto>(
      items,
      TopicDto.fromTopic,
    );
  }

  @AuthGuard()
  @Post()
  public async create(
    @Body() data: TopicCreateDto,
    @Request() request: UserRequest,
  ): Promise<TopicDto> {
    const topic = await this.topicService.create(request, data);
    return TopicDto.fromTopic(topic);
  }

  @AuthGuard()
  @Put('/:id')
  public async update(
    @Body() data: TopicUpdateDto,
    @Param('id') id: TopicId,
    @Request() request: UserRequest,
  ): Promise<TopicDto> {
    const topic = await this.topicService.update(
      { id, userId: request.user?.id },
      data,
    );
    return TopicDto.fromTopic(topic);
  }

  @AuthGuard()
  @Get('/:id')
  public async get(
    @Param('id') id: TopicId,
    @Request() request: UserRequest,
  ): Promise<TopicDto> {
    const topic = await this.topicService.find({ id });

    return TopicDto.fromTopic(topic);
  }

  @AuthGuard({
    permissions: [PermissionsEnum.Topic__delete],
  })
  @Delete('/:id')
  public async delete(
    @Param('id') id: TopicId,
    @Request() request: UserRequest,
  ): Promise<{ status: string }> {
    await this.topicService.delete({ id, userId: request.user?.id });

    return {
      status: '200',
    };
  }
}
