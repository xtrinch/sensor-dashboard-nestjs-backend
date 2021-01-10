import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { SensorTypeEnum } from '~modules/sensor/enum/sensor-types.enum';
import { Sensor } from '~modules/sensor/sensor.entity';
import { UserDto } from '~modules/user/dto/user.dto';
import { UserId } from '~modules/user/user.entity';
import { BoardTypeEnum } from '~utils/board-types.enum';

export class SensorDto {
  public id: number;
  public name: string;
  public displayName: string;
  public boardType: BoardTypeEnum;
  public location: string;
  public measurementTypes: MeasurementTypeEnum[];
  public timezone: string;
  public userId: UserId;
  public user: UserDto;
  public lastSeenAt: Date;
  public private: boolean;
  public sensorTypes: SensorTypeEnum[];

  public static fromSensor(sensor: Sensor): SensorDto {
    return {
      id: sensor.id,
      name: sensor.name,
      displayName: sensor.displayName,
      boardType: sensor.boardType,
      location: sensor.location,
      measurementTypes: sensor.measurementTypes,
      timezone: sensor.timezone,
      userId: sensor.userId,
      user: sensor.user ? UserDto.fromUser(sensor.user) : undefined,
      lastSeenAt: sensor.lastSeenAt,
      private: sensor.private,
      sensorTypes: sensor.sensorTypes,
    };
  }
}
