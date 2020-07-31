import {
  Matches,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsArray,
  MinLength,
  ArrayMinSize,
} from 'class-validator';
import { DateRange } from '~utils/date.range';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';

export class MeasurementQueryDto {
  @IsOptional()
  @Matches(DateRange.regex)
  public readonly createdAtRange?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(MeasurementTypeEnum, { each: true })
  @ArrayMinSize(1)
  public readonly measurementTypes?: MeasurementTypeEnum[];
}
