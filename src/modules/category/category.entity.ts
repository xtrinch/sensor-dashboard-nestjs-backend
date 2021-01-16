import { Column, Entity, OneToMany } from 'typeorm';
import { Topic } from '~modules/topic/topic.entity';
import { UserId } from '~modules/user/user.entity';
import { AbstractEntity } from '~utils/abstract.entity';

export type CategoryId = number;

export interface CategoryWhereInterface {
  id?: number;
  userId?: UserId;
}

@Entity()
export class Category extends AbstractEntity {
  @OneToMany(() => Topic, (topic) => topic.category)
  public topics: Topic[];

  @Column()
  public name: string;
}
