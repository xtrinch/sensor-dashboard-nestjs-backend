import { CreateDateColumn, BaseEntity, UpdateDateColumn } from 'typeorm';

export abstract class AbstractEntity extends BaseEntity {
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
