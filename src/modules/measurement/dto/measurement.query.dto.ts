import { Matches, IsNotEmpty, IsEnum } from 'class-validator';
import { DateRange } from '~utils/date.range';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';

export class MeasurementQueryDto {
  @IsNotEmpty()
  @Matches(DateRange.regex)
  public readonly createdAtRange: string;

  @IsNotEmpty()
  @IsEnum(MeasurementTypeEnum)
  public readonly measurementType: MeasurementTypeEnum;
}
