import { SensorBoardTypesEnum } from '~/modules/sensor/enum/sensor-board-types.enum';
import {
  IsEnum,
  IsString,
  IsNotEmpty,
  ArrayMinSize,
  IsArray,
  Validate,
} from 'class-validator';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { TimezoneValidator } from '~utils/timezone.validator';

export class SensorCreateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEnum(SensorBoardTypesEnum)
  public boardType: SensorBoardTypesEnum;

  @IsString()
  @IsNotEmpty()
  public location: string;

  @IsString()
  @Validate(TimezoneValidator)
  public timezone: string;

  @IsArray()
  @IsEnum(MeasurementTypeEnum, { each: true })
  @ArrayMinSize(0)
  public measurementTypes: MeasurementTypeEnum[];
}
