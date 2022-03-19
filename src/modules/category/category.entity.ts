import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Comment, CommentId } from '~modules/comment/comment.entity';
import { Topic, TopicId } from '~modules/topic/topic.entity';
import { AbstractEntity } from '~utils/abstract.entity';

export type CategoryId = string;

export interface CategoryWhereInterface {
  id?: string;
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

  @Column({ type: 'uuid', nullable: true })
  public lastCommentId: CommentId;

  @ManyToOne(() => Comment, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'lastCommentId' })
  public lastComment: Comment;

  @Column({ type: 'uuid', nullable: true })
  public lastTopicId: TopicId;

  @ManyToOne(() => Topic, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'lastTopicId' })
  public lastTopic: Topic;

  @Column({ type: 'integer', default: 0 })
  public sequenceNo: number;
}
