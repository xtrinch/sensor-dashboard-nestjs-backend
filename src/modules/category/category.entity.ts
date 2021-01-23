import { Column, Entity, OneToMany } from 'typeorm';
import { Topic } from '~modules/topic/topic.entity';
import { AbstractEntity } from '~utils/abstract.entity';

export type CategoryId = number;

export interface CategoryWhereInterface {
  id?: number;
}

@Entity()
export class Category extends AbstractEntity {
  @OneToMany(() => Topic, (topic) => topic.category)
  public topics: Topic[];

  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @Column({ type: 'varchar', nullable: true })
  public description: string;
}
