import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TopicUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public location: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsOptional()
  public tag: string;
}
