import { SensorBoardTypesEnum } from '~/modules/sensor/enum/sensor-board-types.enum';
import {
  IsEnum,
  IsString,
  IsNotEmpty,
  ArrayMinSize,
  IsArray,
} from 'class-validator';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';

export class SensorCreateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEnum(SensorBoardTypesEnum)
  public boardType: SensorBoardTypesEnum;

  @IsString()
  @IsNotEmpty()
  public location: string;

  @IsArray()
  @IsEnum(MeasurementTypeEnum, { each: true })
  @ArrayMinSize(0)
  public measurementTypes: MeasurementTypeEnum[];
}
