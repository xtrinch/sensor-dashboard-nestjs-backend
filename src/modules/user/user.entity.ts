import { Column, Entity, OneToMany } from 'typeorm';
import { Display } from '~modules/display/display.entity';
import { Forwarder } from '~modules/forwarder/forwarder.entity';
import { Sensor } from '~modules/sensor/sensor.entity';
import { AbstractEntity } from '~utils/abstract.entity';

export interface UserWhereInterface {
  username?: string;
  id?: number;
  email?: string;
}

export type UserId = number;

@Entity()
export class User extends AbstractEntity {
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

  @OneToMany(() => Display, (display) => display.user)
  public displays: Display[];

  @OneToMany(() => Forwarder, (forwarder) => forwarder.user)
  public forwarders: Forwarder[];
}
