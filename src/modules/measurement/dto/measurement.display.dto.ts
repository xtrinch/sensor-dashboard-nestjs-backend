import { MeasurementTypeUnitEnum } from '~modules/measurement/enum/measurement-type-unit.enum';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { Measurement } from '~modules/measurement/measurement.entity';

export class MeasurementDisplayDto {
  public measurement: string;
  public measurementType: MeasurementTypeEnum;
  public measurementTypeUnit: MeasurementTypeUnitEnum;

  public static fromMeasurement(measurement: Measurement): MeasurementDisplayDto {
    return {
      measurement: `${measurement.measurement.toFixed(1)}`,
      measurementType: measurement.measurementType,
      measurementTypeUnit: MeasurementTypeUnitEnum[measurement.measurementType],
    };
  }
}
