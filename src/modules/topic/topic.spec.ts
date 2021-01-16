import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { CommentModule } from '~modules/comment/comment.module';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { TopicCreateDto } from '~modules/topic/dto/topic.create.dto';
import { TopicUpdateDto } from '~modules/topic/dto/topic.update.dto';
import { Topic } from '~modules/topic/topic.entity';
import {
  TopicFixture,
  TopicFixtureInterface,
} from '~modules/topic/topic.fixture';
import { TopicModule } from '~modules/topic/topic.module';
import { TopicService } from '~modules/topic/topic.service';
import { UserModule } from '~modules/user/user.module';
import { BoardTypeEnum } from '~utils/board-types.enum';

describe('TopicService', () => {
  let topicService: TopicService;
  let module: TestingModule = null;
  let fixture: TopicFixtureInterface;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [TopicService],
      imports: [
        TopicModule,
        UserModule,
        CommentModule,
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([Topic]),
      ],
    }).compile();

    topicService = module.get<TopicService>(TopicService);
    fixture = await TopicFixture(module);
  }, 20000);

  it('should create a topic', async () => {
    const data = plainToClass(TopicCreateDto, {
      name: 'A topic name',
      location: 'A location',
      boardType: BoardTypeEnum.DOIT_ESP32_DEVKIT_V1,
      measurementTypes: Object.values(MeasurementTypeEnum),
    });

    await validateOrReject(data);
    const topic = await topicService.create(fixture.userRequest, data);
    expect(topic).toBeDefined();
    expect(topic.name).toBeDefined();
  });

  it('should update a topic', async () => {
    const data = plainToClass(TopicUpdateDto, {
      name: 'A new location',
    });

    await validateOrReject(data);
    const topic = await topicService.update(
      fixture.userRequest,
      fixture.topicOne.id,
      data,
    );
    expect(topic).toBeDefined();
    expect(topic.name).toEqual('A new location');
  });

  it('should list topics', async () => {
    const topics = await topicService.findAll(
      {},
      {},
      {
        limit: 20,
        page: 1,
      },
    );

    expect(topics.items.length).not.toBe(0);
  });

  it('should delete a topic', async () => {
    const success = await topicService.delete(fixture.userRequest, {
      id: fixture.topicOne.id,
    });

    expect(success).toEqual(true);
  });

  afterAll(async () => {
    await module.close();
  });
});