import {
  Column, Entity,
  Generated, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { DisplayBoardTypesEnum } from '~modules/display/enum/display-board-types.enum';
import { Sensor } from '~modules/sensor/sensor.entity';
import { User, UserId } from '~modules/user/user.entity';
import { AbstractEntity } from '~utils/abstract.entity';

export type DisplayId = number;

export interface DisplayWhereInterface {
  id?: number;
  displayAccessToken?: string;
  userId?: UserId;
}

@Entity()
export class Display extends AbstractEntity {
  @PrimaryGeneratedColumn()
  public id: DisplayId;

  @Column()
  public name: string;
  
  @Column()
  @Generated('uuid')
  public displayAccessToken: string;

  @ManyToMany(() => Display, display => display.sensors, { 
    cascade: ["insert", "update"],
  })
  @JoinTable()
  public sensors: Sensor[];

  @Column({ type: 'timestamptz', nullable: true })
  public lastSeenAt: Date;

  @ManyToOne(() => User, (user) => user.displays)
  @JoinColumn({ name: 'userId' })
  public user: User;

  @Column('integer')
  public userId: number;

  @Column()
  public location: string;

  @Column()
  public boardType: DisplayBoardTypesEnum;
}
