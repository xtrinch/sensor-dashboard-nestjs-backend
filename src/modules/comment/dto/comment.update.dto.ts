import { IsNotEmpty, IsString } from 'class-validator';

export class CommentUpdateDto {
  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsString()
  @IsNotEmpty()
  public name: string;
}
