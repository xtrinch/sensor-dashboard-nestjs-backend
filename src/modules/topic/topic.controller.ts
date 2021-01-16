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
  UseGuards
} from '@nestjs/common';
import { Topic, TopicId } from '~/modules/topic/topic.entity';
import { TopicService } from '~/modules/topic/topic.service';
import { TopicCreateDto } from '~modules/topic/dto/topic.create.dto';
import { TopicDto } from '~modules/topic/dto/topic.dto';
import { TopicUpdateDto } from '~modules/topic/dto/topic.update.dto';
import { JwtGuard, UserRequest } from '~modules/user/jwt.guard';
import { PaginationDto } from '~utils/pagination.dto';
import { PaginationQueryDto } from '~utils/pagination.query.dto';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  public async findAll(
    @Query() pagination: PaginationQueryDto,
  ): Promise<PaginationDto<TopicDto>> {
    const items = await this.topicService.findAll({}, {}, pagination);

    return PaginationDto.fromPagination<Topic, TopicDto>(
      items,
      TopicDto.fromTopic,
    );
  }

  @UseGuards(JwtGuard)
  @Post()
  public async create(
    @Body() data: TopicCreateDto,
    @Request() request: UserRequest,
  ): Promise<TopicDto> {
    const topic = await this.topicService.create(request, data);
    return TopicDto.fromTopic(topic);
  }

  @UseGuards(JwtGuard)
  @Put('/:id')
  public async update(
    @Body() data: TopicUpdateDto,
    @Param('id') id: TopicId,
    @Request() request: UserRequest,
  ): Promise<TopicDto> {
    const topic = await this.topicService.update(request, id, data);
    return TopicDto.fromTopic(topic);
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  public async get(
    @Param('id') id: TopicId,
    @Request() request: UserRequest,
  ): Promise<TopicDto> {
    const topic = await this.topicService.find(
      { id },
    );

    return TopicDto.fromTopic(topic);
  }

  @UseGuards(JwtGuard)
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
