import { SensorDto } from '~modules/sensor/dto/sensor.dto';
import { Sensor } from '~modules/sensor/sensor.entity';

export class SensorDetailsDto extends SensorDto {
  public sensorAccessToken: string;

  public static fromSensor(sensor: Sensor): SensorDetailsDto {
    return {
      ...SensorDto.fromSensor(sensor),
      sensorAccessToken: sensor.sensorAccessToken,
    };
  }
}
