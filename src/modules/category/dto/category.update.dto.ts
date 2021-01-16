import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public name: string;
}
