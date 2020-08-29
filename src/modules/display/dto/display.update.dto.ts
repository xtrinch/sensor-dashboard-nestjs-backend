import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DisplayBoardTypesEnum } from '~modules/display/enum/display-board-types.enum';

export class DisplayUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public location: string;

  @IsOptional()
  @IsEnum(DisplayBoardTypesEnum)
  public boardType: DisplayBoardTypesEnum;
}