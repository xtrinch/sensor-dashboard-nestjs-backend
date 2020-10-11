import { Column, Entity, OneToMany } from 'typeorm';
import { Display } from '~modules/display/display.entity';
import { Forwarder } from '~modules/forwarder/forwarder.entity';
import { Sensor } from '~modules/sensor/sensor.entity';
import { AbstractEntity } from '~utils/abstract.entity';

export interface UserWhereInterface {
  username?: string;
  id?: number;
  email?: string;
  sub?: string;
}

export type UserId = number;

@Entity()
export class User extends AbstractEntity {
  @Column()
  public sub: string; // e.g. google ID

  @Column()
  public imageUrl: string; // e.g. from google

  @Column({ length: 128, unique: true, nullable: false })
  public email: string;

  @Column({ length: 128, unique: true, nullable: false })
  public username: string;

  @Column({ length: 128, nullable: false })
  public password: string;

  @Column('boolean', { nullable: true })
  public isAdmin: boolean;

  @Column()
  public name: string;

  @Column()
  public surname: string;

  @Column({ type: 'timestamptz', nullable: true })
  public lastSeenAt: Date;

  @OneToMany(() => Sensor, (sensor) => sensor.user)
  public sensors: Sensor[];

  @OneToMany(() => Display, (display) => display.user)
  public displays: Display[];

  @OneToMany(() => Forwarder, (forwarder) => forwarder.user)
  public forwarders: Forwarder[];
}
