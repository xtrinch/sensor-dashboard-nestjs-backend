import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicService } from '~/modules/topic/topic.service';
import { CategoryModule } from '~modules/category/category.module';
import { TopicController } from '~modules/topic/topic.controller';
import { Topic } from '~modules/topic/topic.entity';
import { TopicRepository } from '~modules/topic/topic.repository';

@Module({
  imports: [CategoryModule, TypeOrmModule.forFeature([Topic, TopicRepository])],
  providers: [TopicService],
  exports: [TopicService, TypeOrmModule],
  controllers: [TopicController],
})
export class TopicModule {}
