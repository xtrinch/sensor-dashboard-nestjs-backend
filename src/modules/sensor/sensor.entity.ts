import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SensorBoardTypesEnum } from '~/modules/sensor/enum/sensor-board-types.enum';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { Measurement } from '~modules/measurement/measurement.entity';
import { User } from '~modules/user/user.entity';
import { AbstractEntity } from '~utils/abstract.entity';

export type SensorId = number;

export interface SensorWhereInterface {
  sensorAccessToken?: string;
}

@Entity()
export class Sensor extends AbstractEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public location: string;

  @Column()
  @Generated('uuid')
  public sensorAccessToken: string;

  @Column()
  public boardType: SensorBoardTypesEnum;

  @OneToMany(() => Measurement, (measurement) => measurement.sensor)
  public measurements: Measurement[];

  @Column('text', { array: true, default: () => 'array[]::text[]' })
  public measurementTypes: MeasurementTypeEnum[];

  @Column({
    default: 'Europe/Ljubljana',
  })
  public timezone: string;

  @ManyToOne(() => User, (user) => user.sensors)
  @JoinColumn({ name: 'userId' })
  public user: User;

  @Column('integer')
  public userId: number;

  public toString(): string {
    return this.name;
  }
}
