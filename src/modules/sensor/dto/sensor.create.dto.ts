import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  Validate,
} from 'class-validator';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { SensorTypeEnum } from '~modules/sensor/enum/sensor-types.enum';
import { IsValidCSSColor } from '~utils/css-color.validator';
import { TimezoneValidator } from '~utils/timezone.validator';

export class SensorCreateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public displayName: string;

  @IsString()
  @IsNotEmpty()
  public location: string;

  @IsString()
  @Validate(TimezoneValidator)
  public timezone: string;

  @Type(() => Boolean)
  @IsBoolean()
  public private: boolean;

  @IsArray()
  @IsEnum(MeasurementTypeEnum, { each: true })
  @ArrayMinSize(1)
  public measurementTypes: MeasurementTypeEnum[];

  @IsArray()
  @IsEnum(SensorTypeEnum, { each: true })
  @ArrayMinSize(1)
  public sensorTypes: SensorTypeEnum[];

  @IsValidCSSColor()
  public color: string;
}
