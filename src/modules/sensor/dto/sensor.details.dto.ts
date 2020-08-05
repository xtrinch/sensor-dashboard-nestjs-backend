import { SensorBoardTypesEnum } from '~/modules/sensor/enum/sensor-board-types.enum';
import Sensor from '~modules/sensor/sensor.entity';
import { SensorDto } from '~modules/sensor/dto/sensor.dto';

export class SensorDetailsDto extends SensorDto {
  public sensorAccessToken: string;

  public static fromSensor(sensor: Sensor): SensorDetailsDto {
    return {
      ...SensorDto.fromSensor(sensor),
      sensorAccessToken: sensor.sensorAccessToken,
    };
  }
}
