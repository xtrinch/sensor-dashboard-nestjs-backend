import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { BoardTypeEnum } from '~utils/board-types.enum';

export class RadioCreateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public location: string;

  @IsEnum(BoardTypeEnum)
  public boardType: BoardTypeEnum;

  @IsOptional()
  @IsObject()
  public config: any;
}
