import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BoardTypeEnum } from '~utils/board-types.enum';

export class ForwarderUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public location: string;

  @IsOptional()
  @IsEnum(BoardTypeEnum)
  public boardType: BoardTypeEnum;
}
