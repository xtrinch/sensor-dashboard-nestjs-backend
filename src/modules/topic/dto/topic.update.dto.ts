import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RawDraftContentState } from 'draft-js';

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
  public description: RawDraftContentState;
}
