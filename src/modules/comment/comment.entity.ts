import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Description } from '~modules/comment/comment.interfaces';
import { Topic, TopicId } from '~modules/topic/topic.entity';
import { User, UserId } from '~modules/user/user.entity';
import { AbstractEntity } from '~utils/abstract.entity';

export type CommentId = number;

export interface CommentWhereInterface {
  id?: number;
  userId?: UserId;
}

@Entity()
export class Comment extends AbstractEntity {
  @ManyToOne(() => Topic, (topic) => topic.comments)
  @JoinColumn({ name: 'topicId' })
  public topic: Topic;

  @Column('integer')
  public topicId: TopicId;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  public user: User;

  @Column('integer')
  public userId: UserId;

  @Column({ type: 'jsonb' })
  public description: Description;
}
