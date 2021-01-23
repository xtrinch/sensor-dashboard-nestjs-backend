import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { CategoryId } from '~modules/category/category.entity';

export class TopicQueryDto {
  @IsNumber()
  @Type(() => Number)
  categoryId?: CategoryId;
}
