import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { CategoryId } from '~modules/category/category.entity';

export class TopicCreateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsUUID()
  @IsNotEmpty()
  public categoryId: CategoryId;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsOptional()
  public tag: string;
}
