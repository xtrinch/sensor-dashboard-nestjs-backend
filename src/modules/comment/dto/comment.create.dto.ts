import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator';
import { CategoryId } from '~modules/category/category.entity';
import { TopicId } from '~modules/topic/topic.entity';

export class CommentCreateDto {
  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNumber()
  @Type(() => Number)
  public topicId?: TopicId;

  @IsNumber()
  @Type(() => Number)
  public categoryId?: CategoryId;

  @IsString()
  @IsNotEmpty()
  public name: string;
}
