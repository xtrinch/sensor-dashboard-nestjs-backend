import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  @JoinColumn({ name: 'sensorId' })
  public sensor: Sensor;

  @Column('integer')
  public sensorId: number;

  public toString(): string {
    return this.measurementType;
  }
}

export default Measurement;
