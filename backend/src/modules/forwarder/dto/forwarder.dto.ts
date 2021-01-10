import { Forwarder } from '~modules/forwarder/forwarder.entity';
import { UserDto } from '~modules/user/dto/user.dto';
import { UserId } from '~modules/user/user.entity';
import { AbstractDto } from '~utils/abstract.dto';
import { BoardTypeEnum } from '~utils/board-types.enum';

export class ForwarderDto implements AbstractDto {
  public id: number;
  public name: string;
  public location: string;
  public userId: UserId;
  public user: UserDto;
  public lastSeenAt: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public numForwarded: number;
  public boardType: BoardTypeEnum;

  public static fromForwarder(forwarder: Forwarder): ForwarderDto {
    return {
      id: forwarder.id,
      name: forwarder.name,
      location: forwarder.location,
      userId: forwarder.userId,
      user: forwarder.user ? UserDto.fromUser(forwarder.user) : undefined,
      lastSeenAt: forwarder.lastSeenAt,
      createdAt: forwarder.createdAt,
      updatedAt: forwarder.updatedAt,
      numForwarded: forwarder.numForwarded,
      boardType: forwarder.boardType,
    };
  }
}
