import { Column, Generated } from 'typeorm';
import { AbstractEntity } from '~utils/abstract.entity';
import { BoardTypeEnum } from '~utils/board-types.enum';

export abstract class AbstractIOTDeviceEntity extends AbstractEntity {
  @Column({ type: 'timestamptz', nullable: true })
  public lastSeenAt: Date;

  @Column()
  @Generated('uuid')
  public accessToken: string;

  @Column()
  public name: string;

  @Column()
  public location: string;

  @Column('integer')
  public userId: number;

  @Column()
  public boardType: BoardTypeEnum;
}
