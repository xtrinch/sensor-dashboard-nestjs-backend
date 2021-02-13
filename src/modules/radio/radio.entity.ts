import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User, UserId } from '~modules/user/user.entity';
import { AbstractIOTDeviceEntity } from '~utils/abstract.iot-device.entity';

export type RadioId = number;

export interface RadioWhereInterface {
  id?: number;
  accessToken?: string;
  userId?: UserId;
}

@Entity()
export class Radio extends AbstractIOTDeviceEntity {
  @ManyToOne(() => User, (user) => user.radios, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  public user: User;

  @Column({ type: 'jsonb', nullable: true })
  public config: string;
}
