import { Matches, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { DateRange } from '~utils/date.range';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';

export class MeasurementQueryDto {
  @IsOptional()
  @Matches(DateRange.regex)
  public readonly createdAtRange: string;

  @IsOptional()
  @IsEnum(MeasurementTypeEnum)
  public readonly measurementType: MeasurementTypeEnum;
}
