import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
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
}
