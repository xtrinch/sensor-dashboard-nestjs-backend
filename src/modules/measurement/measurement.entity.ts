import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import Sensor, { SensorId } from '~/modules/sensor/sensor.entity';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';

export type MeasurementId = string;

@Entity()
export class Measurement extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: MeasurementId;

  @Column({ type: 'float' })
  public measurement: number;

  @Column()
  public measurementType: MeasurementTypeEnum;

  @ManyToOne((type) => Sensor, (sensor) => sensor.measurements)
  sensor: Sensor;
}

export default Measurement;
