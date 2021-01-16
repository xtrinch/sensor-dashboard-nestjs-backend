import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CategoryId } from '~modules/category/category.entity';

export class TopicCreateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  public categoryId: CategoryId;
}
