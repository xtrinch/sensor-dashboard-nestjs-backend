import { IsNotEmpty, IsString } from 'class-validator';

export class TopicCreateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public location: string;
}
