import { Category } from '~modules/category/category.entity';
import { CommentId } from '~modules/comment/comment.entity';
import { CommentDto } from '~modules/comment/dto/comment.dto';
import { TopicDto } from '~modules/topic/dto/topic.dto';
import { TopicId } from '~modules/topic/topic.entity';
import { AbstractDto } from '~utils/abstract.dto';

export class CategoryDto implements AbstractDto {
  public id: number;
  public name: string;
  public description: string;
  public createdAt: Date;
  public updatedAt: Date;
  public topicIds: TopicId[];
  public topics: TopicDto[];
  public protected: boolean;
  public numTopics: number;
  public numComments: number;
  public lastComment: CommentDto;
  public lastCommentId: CommentId;
  public lastTopic: TopicDto;
  public lastTopicId: TopicId;

  public static fromCategory(category: Category): CategoryDto {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      topics: (category.topics || []).map((s) => TopicDto.fromTopic(s)),
      topicIds: (category.topics || []).map((s) => s.id),
      protected: category.protected,
      numTopics: category.numTopics,
      numComments: category.numComments,
      lastComment: category.lastComment ? CommentDto.fromComment(category.lastComment) : null,
      lastCommentId: category.lastCommentId,
      lastTopic: category.lastTopic ? TopicDto.fromTopic(category.lastTopic) : null,
      lastTopicId: category.lastTopicId,
    };
  }
}
