import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { Sensor } from '~modules/sensor/sensor.entity';
import { AbstractSmallEntity } from '~utils/abstract.small.entity';

export type MeasurementId = string;

@Entity()
export class Measurement extends AbstractSmallEntity {
  @Column({ type: 'float4' })
  public measurement: number;

  @Column({ type: 'varchar' })
  public measurementType: MeasurementTypeEnum;

  @ManyToOne(() => Sensor, (sensor) => sensor.measurements, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sensorId' })
  public sensor: Sensor;

  @Column({ type: 'uuid' })
  public sensorId: string;

  public toString(): string {
    return this.measurementType;
  }
}
