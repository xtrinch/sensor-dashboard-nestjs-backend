import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Display } from '~modules/display/display.entity';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { Measurement } from '~modules/measurement/measurement.entity';
import { SensorTypeEnum } from '~modules/sensor/enum/sensor-types.enum';
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

  @OneToMany(() => Measurement, (measurement) => measurement.sensor)
  public measurements: Measurement[];

  @Column('text', { array: true })
  public measurementTypes: MeasurementTypeEnum[];

  @Column('text', { array: true })
  public sensorTypes: SensorTypeEnum[];

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

  @Column('text', { nullable: true })
  public testSquash: string;

  public toString(): string {
    return this.name;
  }
}
