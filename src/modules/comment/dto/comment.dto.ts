import { CategoryId } from '~modules/category/category.entity';
import { Comment } from '~modules/comment/comment.entity';
import { Description } from '~modules/comment/comment.interfaces';
import { TopicId } from '~modules/topic/topic.entity';
import { UserDto } from '~modules/user/dto/user.dto';
import { UserId } from '~modules/user/user.entity';
import { AbstractDto } from '~utils/abstract.dto';

export class CommentDto implements AbstractDto {
  public id: number;
  public description: Description;
  public userId: UserId;
  public user: UserDto;
  public createdAt: Date;
  public updatedAt: Date;
  public topicId: TopicId;
  public categoryId: CategoryId;
  public name: string;

  public static fromComment(comment: Comment): CommentDto {
    return {
      id: comment.id,
      description: comment.description,
      userId: comment.userId,
      user: comment.user ? UserDto.fromUser(comment.user) : undefined,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      topicId: comment.topicId,
      categoryId: comment.categoryId,
      name: comment.name,
    };
  }
}
