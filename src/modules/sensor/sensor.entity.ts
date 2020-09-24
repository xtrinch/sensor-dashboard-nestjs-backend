import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SensorBoardTypesEnum } from '~/modules/sensor/enum/sensor-board-types.enum';
import { Display } from '~modules/display/display.entity';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { Measurement } from '~modules/measurement/measurement.entity';
import { User, UserId } from '~modules/user/user.entity';
import { AbstractIOTDeviceEntity } from '~utils/abstract.iot-device.entity';

export type SensorId = number;

export interface SensorWhereInterface {
  id?: number;
  accessToken?: string;
  userId?: UserId;
  private?: boolean;
}

@Entity()
export class Sensor extends AbstractIOTDeviceEntity {
  @Column()
  public displayName: string;

  @Column()
  public boardType: SensorBoardTypesEnum;

  @OneToMany(() => Measurement, (measurement) => measurement.sensor)
  public measurements: Measurement[];

  @Column('text', { array: true })
  public measurementTypes: MeasurementTypeEnum[];

  @Column({
    default: 'Europe/Vienna',
  })
  public timezone: string;

  @ManyToOne(() => User, (user) => user.sensors, { eager: true })
  @JoinColumn({ name: 'userId' })
  public user: User;

  @ManyToMany(() => Display, (display) => display.sensors)
  public displays: Display[];

  @Column('boolean', { default: false })
  public private: boolean;

  public toString(): string {
    return this.name;
  }
}
