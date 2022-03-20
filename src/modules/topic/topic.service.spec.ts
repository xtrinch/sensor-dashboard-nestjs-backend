import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { AppModule } from '~app.module';
import { TopicCreateDto } from '~modules/topic/dto/topic.create.dto';
import { TopicUpdateDto } from '~modules/topic/dto/topic.update.dto';
import {
  TopicFixture,
  TopicFixtureInterface,
} from '~modules/topic/topic.fixture';
import { TopicService } from '~modules/topic/topic.service';

describe('TopicService', () => {
  let topicService: TopicService;
  let module: TestingModule = null;
  let fixture: TopicFixtureInterface;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    topicService = module.get<TopicService>(TopicService);
    fixture = await TopicFixture(module);
  }, 20000);

  it('should create a topic', async () => {
    const data = plainToClass(TopicCreateDto, {
      name: 'A topic name',
      categoryId: fixture.categoryOne.id,
      description: 'A description',
    });

    await validateOrReject(data);
    const topic = await topicService.create(fixture.userRequest, data);
    expect(topic).toBeDefined();
    expect(topic.name).toBeDefined();
  });

  it('should update a topic', async () => {
    const data = plainToClass(TopicUpdateDto, {
      name: 'A new location',
      description: 'A different description',
    });

    await validateOrReject(data);
    const topic = await topicService.update({ id: fixture.topicOne.id }, data);
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
    const success = await topicService.delete({
      id: fixture.topicOne.id,
    });

    expect(success).toEqual(true);
  });

  afterAll(async () => {
    await module.close();
  });
});
