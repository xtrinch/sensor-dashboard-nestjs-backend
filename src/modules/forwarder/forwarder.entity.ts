import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User, UserId } from '~modules/user/user.entity';
import { AbstractIOTDeviceEntity } from '~utils/abstract.iot-device.entity';

export type ForwarderId = number;

export interface ForwarderWhereInterface {
  id?: number;
  accessToken?: string;
  userId?: UserId;
}

@Entity()
export class Forwarder extends AbstractIOTDeviceEntity {
  @ManyToOne(() => User, (user) => user.forwarders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  public user: User;

  @Column({ default: 0, type: 'integer' })
  public numForwarded: number;
}
