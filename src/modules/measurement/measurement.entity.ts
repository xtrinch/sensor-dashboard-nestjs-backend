import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { Sensor } from '~modules/sensor/sensor.entity';
import { AbstractEntity } from '~utils/abstract.entity';

export type MeasurementId = number;

@Entity()
export class Measurement extends AbstractEntity {
  @PrimaryGeneratedColumn()
  public id: MeasurementId;

  @Column({ type: 'float' })
  public measurement: number;

  @Column()
  public measurementType: MeasurementTypeEnum;

  @ManyToOne(() => Sensor, (sensor) => sensor.measurements)
  @JoinColumn({ name: 'sensorId' })
  public sensor: Sensor;

  @Column('integer')
  public sensorId: number;

  public toString(): string {
    return this.measurementType;
  }
}
