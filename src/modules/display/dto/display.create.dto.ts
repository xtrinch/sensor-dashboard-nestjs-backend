import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { SensorId } from '~modules/sensor/sensor.entity';
import { BoardState } from '../display.entity';
import { DisplayTypeEnum } from '../enum/display-types.enum';

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

  @IsOptional()
  @IsEnum(DisplayTypeEnum)
  public type: DisplayTypeEnum;

  @IsOptional()
  @IsObject()
  state: BoardState;
}
