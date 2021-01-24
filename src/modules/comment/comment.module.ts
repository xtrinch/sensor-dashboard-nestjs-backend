import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from '~/modules/comment/comment.service';
import { CategoryModule } from '~modules/category/category.module';
import { CommentController } from '~modules/comment/comment.controller';
import { Comment } from '~modules/comment/comment.entity';
import { TopicModule } from '~modules/topic/topic.module';

@Module({
  imports: [TopicModule, CategoryModule, TypeOrmModule.forFeature([Comment])],
  providers: [CommentService],
  exports: [CommentService, TypeOrmModule],
  controllers: [CommentController],
})
export class CommentModule {}
