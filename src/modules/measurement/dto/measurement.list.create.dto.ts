import { Type } from 'class-transformer';
import { ArrayMinSize, ValidateNested } from 'class-validator';
import { MeasurementCreateDto } from '~modules/measurement/dto/measurement.create.dto';

export class MeasurementListCreateDto {
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MeasurementCreateDto)
  measurements: MeasurementCreateDto[];
}
