import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryCreateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsOptional()
  public description: string;

  @IsBoolean()
  @Type(() => Boolean)
  public protected: boolean;
}
