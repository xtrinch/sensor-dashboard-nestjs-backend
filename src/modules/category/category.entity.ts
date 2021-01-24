import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Comment, CommentId } from '~modules/comment/comment.entity';
import { Topic, TopicId } from '~modules/topic/topic.entity';
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

  @Column({ type: 'integer', nullable: true })
  public lastCommentId: CommentId;

  @ManyToOne(() => Comment, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'lastCommentId' })
  public lastComment: Comment;

  @Column({ type: 'integer', nullable: true })
  public lastTopicId: TopicId;

  @ManyToOne(() => Topic, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'lastTopicId' })
  public lastTopic: Topic;
}
