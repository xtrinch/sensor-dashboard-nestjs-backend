import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from '~/modules/comment/comment.service';
import { CommentController } from '~modules/comment/comment.controller';
import { Comment } from '~modules/comment/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentService],
  exports: [CommentService, TypeOrmModule],
  controllers: [CommentController],
})
export class CommentModule {}
