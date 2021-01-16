import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractSmallEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;
}
