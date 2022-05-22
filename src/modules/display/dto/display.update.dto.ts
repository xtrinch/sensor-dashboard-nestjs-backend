import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { SensorId } from '~modules/sensor/sensor.entity';
import { DisplayTypeEnum } from '../enum/display-types.enum';

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
  @IsArray()
  @ArrayMinSize(1)
  public sensorIds: SensorId[];

  @IsOptional()
  @IsArray()
  @IsEnum(MeasurementTypeEnum, { each: true })
  @ArrayMinSize(1)
  public measurementTypes: MeasurementTypeEnum[];

  @IsOptional()
  @IsEnum(DisplayTypeEnum)
  public type: DisplayTypeEnum;
}
