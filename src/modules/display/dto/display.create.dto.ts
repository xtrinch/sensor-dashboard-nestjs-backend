import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DisplayBoardTypesEnum } from '~modules/display/enum/display-board-types.enum';

export class DisplayCreateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public location: string;

  @IsEnum(DisplayBoardTypesEnum)
  public boardType: DisplayBoardTypesEnum;
}
