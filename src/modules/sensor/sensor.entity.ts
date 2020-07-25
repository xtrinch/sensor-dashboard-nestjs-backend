import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { SensorBoardTypesEnum } from '~/modules/sensor/enum/sensor-board-types.enum';
import Measurement from '~modules/measurement/measurement.entity';

export type SensorId = string;

@Entity()
export class Sensor extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public location: string;

  @Column()
  public sensorAccessToken: string;

  @Column()
  public boardType: SensorBoardTypesEnum;

  @OneToMany((type) => Measurement, (measurement) => measurement.sensor)
  public measurements: Measurement[];
}

export default Sensor;
