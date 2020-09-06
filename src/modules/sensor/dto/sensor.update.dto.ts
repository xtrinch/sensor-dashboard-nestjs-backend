import { Type } from 'class-transformer';
import {
  IsArray,





  IsBoolean, IsEnum,

  IsOptional, IsString,


  Validate
} from 'class-validator';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { TimezoneValidator } from '~utils/timezone.validator';

export class SensorUpdateDto {
  @IsString()
  @IsOptional()
  public name: string;

  @IsString()
  @IsOptional()
  public displayName: string;

  @IsString()
  @IsOptional()
  public location: string;

  @IsString()
  @IsOptional()
  @Validate(TimezoneValidator)
  public timezone: string;

  @IsArray()
  @IsEnum(MeasurementTypeEnum, { each: true })
  @IsOptional()
  public measurementTypes: MeasurementTypeEnum[];

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  public private: boolean;
}
