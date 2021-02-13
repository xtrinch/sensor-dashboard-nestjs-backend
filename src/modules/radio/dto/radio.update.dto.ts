import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { BoardTypeEnum } from '~utils/board-types.enum';

export class RadioUpdateDto {
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

  @IsOptional()
  @IsObject()
  public config: any;
}
