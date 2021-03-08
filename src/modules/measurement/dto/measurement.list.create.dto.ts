import { MeasurementCreateDto } from '~modules/measurement/dto/measurement.create.dto';
import { ValidateNested, ArrayMinSize, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class MeasurementListCreateDto {
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MeasurementCreateDto)
  measurements: MeasurementCreateDto[];
}
