import { IsEnum, IsString, IsOptional, IsArray } from 'class-validator';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';

export class SensorUpdateDto {
  @IsString()
  @IsOptional()
  public name: string;

  @IsString()
  @IsOptional()
  public location: string;

  @IsArray()
  @IsEnum(MeasurementTypeEnum, { each: true })
  @IsOptional()
  public measurementTypes: MeasurementTypeEnum[];
}
