import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { DescriptionDto } from '~modules/comment/dto/description.dto';

export class CommentUpdateDto {
  @IsNotEmpty()
  @Type(() => DescriptionDto)
  @ValidateNested()
  public description: DescriptionDto;
}
