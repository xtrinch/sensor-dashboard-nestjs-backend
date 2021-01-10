import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BoardTypeEnum } from '~utils/board-types.enum';

export class ForwarderCreateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public location: string;

  @IsEnum(BoardTypeEnum)
  public boardType: BoardTypeEnum;
}
