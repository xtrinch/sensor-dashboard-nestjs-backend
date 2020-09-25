import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';
import { DisplayTypeEnum } from '~modules/display/enum/display-types.enum';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { SensorId } from '~modules/sensor/sensor.entity';
import { BoardTypeEnum } from '~utils/board-types.enum';

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
  @IsEnum(BoardTypeEnum)
  public boardType: BoardTypeEnum;

  @IsOptional()
  @IsEnum(DisplayTypeEnum)
  public displayType: DisplayTypeEnum;
  
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  public sensorIds: SensorId[];

  @IsOptional()
  @IsArray()
  @IsEnum(MeasurementTypeEnum, { each: true })
  @ArrayMinSize(1)
  public measurementTypes: MeasurementTypeEnum[];
}
