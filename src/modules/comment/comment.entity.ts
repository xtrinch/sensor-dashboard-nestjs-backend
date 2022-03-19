import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Category, CategoryId } from '~modules/category/category.entity';
import { Topic, TopicId } from '~modules/topic/topic.entity';
import { User, UserId } from '~modules/user/user.entity';
import { AbstractEntity } from '~utils/abstract.entity';

export type CommentId = string;

export interface CommentWhereInterface {
  id?: string;
  userId?: UserId;
  categoryId?: CategoryId;
  topicId?: TopicId;
}

@Entity()
export class Comment extends AbstractEntity {
  @ManyToOne(() => Topic, (topic) => topic.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'topicId' })
  public topic: Topic;

  @Column({ type: 'uuid' })
  public topicId: TopicId;
  
  @ManyToOne(() => Category, (category) => category.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  public category: Category;

  @Column({ type: 'uuid' })
  public categoryId: CategoryId;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  public user: User;

  @Column({ type: 'uuid' })
  public userId: UserId;

  @Column({ type: 'varchar' })
  public description: string;

  @Column({ type: 'varchar' })
  public name: string;
}
