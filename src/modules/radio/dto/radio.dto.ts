import { Radio } from '~modules/radio/radio.entity';
import { UserDto } from '~modules/user/dto/user.dto';
import { UserId } from '~modules/user/user.entity';
import { AbstractDto } from '~utils/abstract.dto';
import { BoardTypeEnum } from '~utils/board-types.enum';

export class RadioDto implements AbstractDto {
  public id: number;
  public name: string;
  public location: string;
  public userId: UserId;
  public user: UserDto;
  public lastSeenAt: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public boardType: BoardTypeEnum;
  public config: string;

  public static fromRadio(radio: Radio): RadioDto {
    return {
      id: radio.id,
      name: radio.name,
      location: radio.location,
      userId: radio.userId,
      user: radio.user ? UserDto.fromUser(radio.user) : undefined,
      lastSeenAt: radio.lastSeenAt,
      createdAt: radio.createdAt,
      updatedAt: radio.updatedAt,
      boardType: radio.boardType,
      config: radio.config,
    };
  }
}
