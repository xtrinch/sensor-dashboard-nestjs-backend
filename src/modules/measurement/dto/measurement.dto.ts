import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { Measurement } from '~modules/measurement/measurement.entity';
import { SensorDto } from '~modules/sensor/dto/sensor.dto';

export class MeasurementDto {
  public id: string;
  public measurement: number;
  public measurementType: MeasurementTypeEnum;
  public sensor?: SensorDto;
  public createdAt: Date;

  public static fromMeasurement(measurement: Measurement): MeasurementDto {
    return {
      id: measurement.id,
      measurement: measurement.measurement,
      measurementType: measurement.measurementType,
      sensor: measurement.sensor
        ? SensorDto.fromSensor(measurement.sensor)
        : undefined,
      createdAt: measurement.createdAt,
    };
  }
}
