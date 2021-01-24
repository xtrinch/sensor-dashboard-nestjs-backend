import { Column, Entity, OneToMany } from 'typeorm';
import { Comment } from '~modules/comment/comment.entity';
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

  @OneToMany(() => Comment, (comment) => comment.category)
  public comments: Comment[];

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar', nullable: true })
  public description: string;

  @Column({ type: 'boolean' })
  public protected: boolean;

  public numTopics: number;

  public numComments: number;
}
