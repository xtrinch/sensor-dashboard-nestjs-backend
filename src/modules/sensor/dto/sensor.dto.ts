import { SensorBoardTypesEnum } from '~/modules/sensor/enum/sensor-board-types.enum';
import Sensor from '~modules/sensor/sensor.entity';

export class SensorDto {
  public id: string;
  public name: string;
  public boardType: SensorBoardTypesEnum;
  public location: string;

  public static fromSensor(sensor: Sensor): SensorDto {
    return {
      id: sensor.id,
      name: sensor.name,
      boardType: sensor.boardType,
      location: sensor.location,
    };
  }
}
