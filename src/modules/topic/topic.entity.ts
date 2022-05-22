import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category, CategoryId } from '~modules/category/category.entity';
import { Comment, CommentId } from '~modules/comment/comment.entity';
import { User, UserId } from '~modules/user/user.entity';
import { AbstractEntity } from '~utils/abstract.entity';

export type TopicId = string;

export interface TopicWhereInterface {
  id?: string;
  userId?: UserId;
  categoryId?: CategoryId;
  tag?: string;
}

@Entity()
export class Topic extends AbstractEntity {
  @ManyToOne(() => Category, (category) => category.topics, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  public category: Category;

  @Column({ type: 'uuid' })
  public categoryId: CategoryId;

  @OneToMany(() => Comment, (comment) => comment.topic)
  public comments: Comment[];

  @ManyToOne(() => User, (user) => user.topics, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  public user: User;

  @Column({ type: 'uuid' })
  public userId: UserId;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar' })
  public description?: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  public tag: string;

  @Column({ type: 'uuid', nullable: true })
  public lastCommentId: CommentId;

  @ManyToOne(() => Comment, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'lastCommentId' })
  public lastComment: Comment;

  public numComments: number;
}
