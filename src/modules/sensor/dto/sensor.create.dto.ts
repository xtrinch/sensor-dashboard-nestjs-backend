import { SensorBoardTypesEnum } from '~/modules/sensor/enum/sensor-board-types.enum';
import { IsEnum, IsString, IsNotEmpty } from 'class-validator';

export class SensorCreateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEnum(SensorBoardTypesEnum)
  public boardType: SensorBoardTypesEnum;

  @IsString()
  @IsNotEmpty()
  public location: string;
}
