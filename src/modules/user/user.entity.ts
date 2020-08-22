import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Sensor } from '~modules/sensor/sensor.entity';
import { AbstractEntity } from '~utils/abstract.entity';

export interface UserWhereInterface {
  username?: string;
  id?: number;
  email?: string;
}

@Entity()
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128, unique: true, nullable: false })
  email: string;

  @Column({ length: 128, unique: true, nullable: false })
  username: string;

  @Column({ length: 128, nullable: false })
  password: string;

  @Column('boolean', { nullable: true })
  isAdmin: boolean;

  @Column()
  name: string;

  @Column()
  surname: string;

  @OneToMany(() => Sensor, (sensor) => sensor.user)
  public sensors: Sensor[];
}
