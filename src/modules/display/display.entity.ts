import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne
} from 'typeorm';
import { DisplayTypeEnum } from '~modules/display/enum/display-types.enum';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { Sensor } from '~modules/sensor/sensor.entity';
import { User, UserId } from '~modules/user/user.entity';
import { AbstractIOTDeviceEntity } from '~utils/abstract.iot-device.entity';

export type DisplayId = number;

export interface DisplayWhereInterface {
  id?: number;
  accessToken?: string;
  userId?: UserId;
}

@Entity()
export class Display extends AbstractIOTDeviceEntity {
  @ManyToMany(() => Sensor, (sensor) => sensor.displays, {
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  public sensors: Sensor[];

  @ManyToOne(() => User, (user) => user.displays, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  public user: User;

  @Column({ type: 'varchar' })
  public displayType: DisplayTypeEnum;

  @Column('text', { array: true })
  public measurementTypes: MeasurementTypeEnum[];
}
