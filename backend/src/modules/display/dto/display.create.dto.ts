import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { DisplayTypeEnum } from '~modules/display/enum/display-types.enum';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { SensorId } from '~modules/sensor/sensor.entity';
import { BoardTypeEnum } from '~utils/board-types.enum';

export class DisplayCreateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public location: string;

  @IsEnum(BoardTypeEnum)
  public boardType: BoardTypeEnum;

  @IsEnum(DisplayTypeEnum)
  public displayType: DisplayTypeEnum;

  @IsArray()
  @ArrayMinSize(1)
  public sensorIds: SensorId[];

  @IsArray()
  @IsEnum(MeasurementTypeEnum, { each: true })
  @ArrayMinSize(1)
  public measurementTypes: MeasurementTypeEnum[];
}
