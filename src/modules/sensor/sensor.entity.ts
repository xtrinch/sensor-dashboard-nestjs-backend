import {
  Column,
  Entity,
  FindOperator,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Display } from '~modules/display/display.entity';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { Measurement } from '~modules/measurement/measurement.entity';
import { SensorTypeEnum } from '~modules/sensor/enum/sensor-types.enum';
import { User, UserId } from '~modules/user/user.entity';
import { AbstractIOTDeviceEntity } from '~utils/abstract.iot-device.entity';

export type SensorId = string;

export interface SensorWhereInterface {
  id?: FindOperator<string> | string;
  accessToken?: string;
  userId?: UserId;
  private?: boolean;
}

@Entity()
export class Sensor extends AbstractIOTDeviceEntity {
  @Column({ type: 'varchar' })
  public displayName: string;

  // e.g. #ffffff
  @Column({ type: 'varchar', length: 7, default: '#ffffff' })
  public color: string;

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

  @ManyToOne(() => User, (user) => user.sensors, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  public user: User;

  @ManyToMany(() => Display, (display) => display.sensors)
  public displays: Display[];

  @Column('boolean', { default: false })
  public private: boolean;

  @Column('text', { nullable: true })
  public testSquash: string;

  // measurement array with all latest measurements (one for each type)
  public lastMeasurements?: Measurement[];

  public toString(): string {
    return this.name;
  }
}
