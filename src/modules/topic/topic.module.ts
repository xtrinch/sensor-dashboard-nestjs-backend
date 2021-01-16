import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicService } from '~/modules/topic/topic.service';
import { TopicController } from '~modules/topic/topic.controller';
import { Topic } from '~modules/topic/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic])],
  providers: [TopicService],
  exports: [TopicService, TypeOrmModule],
  controllers: [TopicController],
})
export class TopicModule {}
