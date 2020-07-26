import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Sensor from '~/modules/sensor/sensor.entity';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { AbstractEntity } from '~utils/abstract.entity';

export type MeasurementId = string;

@Entity()
export class Measurement extends AbstractEntity {
  @PrimaryGeneratedColumn()
  public id: MeasurementId;

  @Column({ type: 'float' })
  public measurement: number;

  @Column()
  public measurementType: MeasurementTypeEnum;

  @ManyToOne(() => Sensor, (sensor) => sensor.measurements)
  sensor: Sensor;

  public toString(): string {
    return this.measurementType;
  }
}

export default Measurement;
