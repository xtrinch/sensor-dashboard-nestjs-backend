import { Type } from 'class-transformer';
import { IsNumber, IsUUID } from 'class-validator';
import { CategoryId } from '~modules/category/category.entity';
import { TopicId } from '~modules/topic/topic.entity';

export class CommentQueryDto {
  @IsUUID()
  categoryId?: CategoryId;

  @IsUUID()
  topicId?: TopicId;
}
