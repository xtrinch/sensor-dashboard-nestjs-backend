import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RawDraftContentState } from 'draft-js';
import { CategoryId } from '~modules/category/category.entity';

export class TopicCreateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  public categoryId: CategoryId;

  @IsNotEmpty()
  public description: RawDraftContentState;
}
