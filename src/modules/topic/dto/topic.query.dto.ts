import { IsUUID } from 'class-validator';
import { CategoryId } from '~modules/category/category.entity';

export class TopicQueryDto {
  @IsUUID()
  categoryId?: CategoryId;
}
