import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CategoryId } from '~modules/category/category.entity';
import { Description } from '~modules/comment/comment.interfaces';
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

  @Column({ type: 'integer' })
  public topicId: TopicId;

  @Column({ type: 'integer' })
  public categoryId: CategoryId;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  public user: User;

  @Column({ type: 'integer' })
  public userId: UserId;

  @Column({ type: 'jsonb' })
  public description: Description;

  @Column({ type: 'varchar' })
  public name: string;
}
