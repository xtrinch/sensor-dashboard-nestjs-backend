import { Column, Generated } from 'typeorm';
import { AbstractEntity } from '~utils/abstract.entity';
import { BoardTypeEnum } from '~utils/board-types.enum';

export abstract class AbstractIOTDeviceEntity extends AbstractEntity {
  @Column({ type: 'timestamptz', nullable: true })
  public lastSeenAt: Date;

  @Column({ type: 'varchar' })
  @Generated('uuid')
  public accessToken: string;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar' })
  public location: string;

  @Column('integer')
  public userId: number;

  @Column({ type: 'varchar' })
  public boardType: BoardTypeEnum;
}
