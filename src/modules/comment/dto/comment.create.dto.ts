import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { CategoryId } from '~modules/category/category.entity';
import { TopicId } from '~modules/topic/topic.entity';

export class CommentCreateDto {
  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsUUID()
  public topicId?: TopicId;

  @IsUUID()
  public categoryId?: CategoryId;

  @IsString()
  @IsNotEmpty()
  public name: string;
}
