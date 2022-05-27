import { BoardState, Display } from '~modules/display/display.entity';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { SensorDto } from '~modules/sensor/dto/sensor.dto';
import { SensorId } from '~modules/sensor/sensor.entity';
import { UserDto } from '~modules/user/dto/user.dto';
import { UserId } from '~modules/user/user.entity';
import { AbstractDto } from '~utils/abstract.dto';
import { DisplayTypeEnum } from '../enum/display-types.enum';

export class DisplayDto implements AbstractDto {
  public id: string;
  public name: string;
  public location: string;
  public userId: UserId;
  public user: UserDto;
  public lastSeenAt: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public sensorIds: SensorId[];
  public sensors: SensorDto[];
  public measurementTypes: MeasurementTypeEnum[];
  public state: BoardState;
  public type: DisplayTypeEnum;

  public static fromDisplay(display: Display): DisplayDto {
    return {
      id: display.id,
      name: display.name,
      location: display.location,
      userId: display.userId,
      user: display.user ? UserDto.fromUser(display.user) : undefined,
      lastSeenAt: display.lastSeenAt,
      createdAt: display.createdAt,
      updatedAt: display.updatedAt,
      sensors: (display.sensors || []).map((s) => SensorDto.fromSensor(s)),
      sensorIds: (display.sensors || []).map((s) => s.id),
      measurementTypes: display.measurementTypes,
      state: display.state,
      type: display.type,
    };
  }
}
