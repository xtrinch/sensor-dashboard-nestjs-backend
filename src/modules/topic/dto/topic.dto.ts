import { CategoryId } from '~modules/category/category.entity';
import { Comment, CommentId } from '~modules/comment/comment.entity';
import { CommentDto } from '~modules/comment/dto/comment.dto';
import { Topic } from '~modules/topic/topic.entity';
import { UserDto } from '~modules/user/dto/user.dto';
import { UserId } from '~modules/user/user.entity';
import { AbstractDto } from '~utils/abstract.dto';

export class TopicDto implements AbstractDto {
  public id: string;
  public name: string;
  public userId: UserId;
  public user: UserDto;
  public createdAt: Date;
  public updatedAt: Date;
  public commentIds: CommentId[];
  public comments: CommentDto[];
  public description: string;
  public categoryId: CategoryId;
  public tag: string;
  public lastCommentId: CommentId;
  public lastComment: CommentDto;
  public numComments: number;

  public static fromTopic(topic: Topic): TopicDto {
    return {
      id: topic.id,
      name: topic.name,
      userId: topic.userId,
      user: topic.user ? UserDto.fromUser(topic.user) : undefined,
      createdAt: topic.createdAt,
      updatedAt: topic.updatedAt,
      comments: (topic.comments || []).map((s) => CommentDto.fromComment(s)),
      commentIds: (topic.comments || []).map((s: Comment) => s.id),
      description: topic.description,
      categoryId: topic.categoryId,
      tag: topic.tag,
      lastCommentId: topic.lastCommentId,
      lastComment: topic.lastComment
        ? CommentDto.fromComment(topic.lastComment)
        : null,
      numComments: topic.numComments,
    };
  }
}
