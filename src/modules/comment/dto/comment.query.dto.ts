import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { CategoryId } from '~modules/category/category.entity';
import { TopicId } from '~modules/topic/topic.entity';

export class CommentQueryDto {
  @IsNumber()
  @Type(() => Number)
  categoryId?: CategoryId;

  @IsNumber()
  @Type(() => Number)
  topicId?: TopicId;
}
