import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { Sensor } from '~modules/sensor/sensor.entity';
import { User, UserId } from '~modules/user/user.entity';
import { AbstractIOTDeviceEntity } from '~utils/abstract.iot-device.entity';
import { DisplayTypeEnum } from './enum/display-types.enum';

export type DisplayId = string;

export interface DisplayWhereInterface {
  id?: string;
  accessToken?: string;
  userId?: UserId;
}

export interface BoardState {
  objects: any[];
  snapAngle: number;
  version: string;
  hoverCursor: 'string';
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

  @Column('text', { array: true })
  public measurementTypes: MeasurementTypeEnum[];

  @Column('varchar', { default: DisplayTypeEnum.CUSTOM })
  public type: DisplayTypeEnum;

  @Column({ type: 'jsonb', default: '{}' })
  public state: BoardState;
}
