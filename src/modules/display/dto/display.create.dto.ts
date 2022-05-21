import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { SensorId } from '~modules/sensor/sensor.entity';

export class DisplayCreateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public location: string;

  @IsArray()
  @ArrayMinSize(1)
  public sensorIds: SensorId[];

  @IsArray()
  @IsEnum(MeasurementTypeEnum, { each: true })
  @ArrayMinSize(1)
  public measurementTypes: MeasurementTypeEnum[];
}
