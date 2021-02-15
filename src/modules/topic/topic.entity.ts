import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category, CategoryId } from '~modules/category/category.entity';
import { Comment, CommentId } from '~modules/comment/comment.entity';
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

  @ManyToOne(() => User, (user) => user.topics, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  public user: User;

  @Column('integer')
  public userId: UserId;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar' })
  public description?: string;

  @Column({ type: 'varchar', nullable: true })
  public tag: string;

  @Column({ type: 'integer', nullable: true })
  public lastCommentId: CommentId;

  @ManyToOne(() => Comment, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'lastCommentId' })
  public lastComment: Comment;

  public numComments: number;
}
