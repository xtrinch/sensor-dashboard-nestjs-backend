import { IsEnum, IsNotEmpty, IsString, Validate } from 'class-validator';
import { SensorBoardTypesEnum } from '~/modules/sensor/enum/sensor-board-types.enum';
import { TimezoneValidator } from '~utils/timezone.validator';

export class SensorCreateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public displayName: string;

  @IsEnum(SensorBoardTypesEnum)
  public boardType: SensorBoardTypesEnum;

  @IsString()
  @IsNotEmpty()
  public location: string;

  @IsString()
  @Validate(TimezoneValidator)
  public timezone: string;

  // @IsArray()
  // @IsEnum(MeasurementTypeEnum, { each: true })
  // @ArrayMinSize(0)
  // public measurementTypes: MeasurementTypeEnum[];
}
