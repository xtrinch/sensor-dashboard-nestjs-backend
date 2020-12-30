import { MeasurementTypeUnitEnum } from '~modules/measurement/enum/measurement-type-unit.enum';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { Measurement } from '~modules/measurement/measurement.entity';
import { SensorDto } from '~modules/sensor/dto/sensor.dto';

export class MeasurementDisplayDto {
  public id: number;
  public measurement: string;
  public measurementType: MeasurementTypeEnum;
  public sensor?: SensorDto;
  public createdAt: Date;
  public measurementTypeUnit: MeasurementTypeUnitEnum;

  public static fromMeasurement(measurement: Measurement): MeasurementDisplayDto {
    return {
      id: measurement.id,
      measurement: `${measurement.measurement}`,
      measurementType: measurement.measurementType,
      measurementTypeUnit: MeasurementTypeUnitEnum[measurement.measurementType],
      sensor: measurement.sensor
        ? SensorDto.fromSensor(measurement.sensor)
        : undefined,
      createdAt: measurement.createdAt,
    };
  }
}
