import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Category, CategoryId } from '~modules/category/category.entity';
import { Topic, TopicId } from '~modules/topic/topic.entity';
import { User, UserId } from '~modules/user/user.entity';
import { AbstractEntity } from '~utils/abstract.entity';

export type CommentId = number;

export interface CommentWhereInterface {
  id?: number;
  userId?: UserId;
  categoryId?: CategoryId;
  topicId?: TopicId;
}

@Entity()
export class Comment extends AbstractEntity {
  @ManyToOne(() => Topic, (topic) => topic.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'topicId' })
  public topic: Topic;

  @ManyToOne(() => Category, (category) => category.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  public category: Category;

  @Column({ type: 'integer' })
  public topicId: TopicId;

  @Column({ type: 'integer' })
  public categoryId: CategoryId;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  public user: User;

  @Column({ type: 'integer' })
  public userId: UserId;

  @Column({ type: 'varchar' })
  public description: string;

  @Column({ type: 'varchar' })
  public name: string;
}
