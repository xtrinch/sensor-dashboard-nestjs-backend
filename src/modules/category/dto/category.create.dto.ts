import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryCreateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
}
