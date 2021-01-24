import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CategoryId } from '~modules/category/category.entity';
import { DescriptionDto } from '~modules/comment/dto/description.dto';
import { TopicId } from '~modules/topic/topic.entity';

export class CommentCreateDto {
  @IsNotEmpty()
  @Type(() => DescriptionDto)
  @ValidateNested()
  public description: DescriptionDto;

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
