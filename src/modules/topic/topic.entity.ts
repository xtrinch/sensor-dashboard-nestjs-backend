import { RawDraftContentState } from 'draft-js';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category, CategoryId } from '~modules/category/category.entity';
import { Comment } from '~modules/comment/comment.entity';
import { User, UserId } from '~modules/user/user.entity';
import { AbstractEntity } from '~utils/abstract.entity';

export type TopicId = number;

export interface TopicWhereInterface {
  id?: number;
  userId?: UserId;
  categoryId?: CategoryId;
}

@Entity()
export class Topic extends AbstractEntity {
  @ManyToOne(() => Category, (category) => category.topics, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  public category: Category;

  @Column('integer')
  public categoryId: CategoryId;

  @OneToMany(() => Comment, (comment) => comment.topic)
  public comments: Comment[];

  @ManyToOne(() => User, (user) => user.topics)
  @JoinColumn({ name: 'userId' })
  public user: User;

  @Column('integer')
  public userId: UserId;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'jsonb' })
  public description?: RawDraftContentState;

  @Column({ type: 'varchar', nullable: true })
  public tag: string;
}
