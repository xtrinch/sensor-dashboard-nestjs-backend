import { Display } from '~modules/display/display.entity';
import { UserDto } from '~modules/user/dto/user.dto';
import { UserId } from '~modules/user/user.entity';

export class DisplayDto {
  public id: number;
  public name: string;
  public location: string;
  public userId: UserId;
  public user: UserDto;
  public lastSeenAt: Date;

  public static fromDisplay(display: Display): DisplayDto {
    return {
      id: display.id,
      name: display.name,
      location: display.location,
      userId: display.userId,
      user: display.user ? UserDto.fromUser(display.user) : undefined,
      lastSeenAt: display.lastSeenAt,
    };
  }
}
