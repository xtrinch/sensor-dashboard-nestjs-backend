import { GroupEnum, GroupPermissions } from '~modules/user/enum/group.enum';
import { PermissionsEnum } from '~modules/user/enum/permissions.enum';
import { User } from '~modules/user/user.entity';

export class UserDto {
  public id: number;
  public username: string;
  public email: string;
  public name: string;
  public surname: string;
  public createdAt: Date;
  public lastSeenAt: Date;
  public group: GroupEnum;
  public permissions: PermissionsEnum[];

  public static fromUser(user: User): UserDto {
    return {
      username: user.username,
      email: user.email,
      name: user.name,
      surname: user.surname,
      id: user.id,
      createdAt: user.createdAt,
      lastSeenAt: user.lastSeenAt,
      group: user.group,
      permissions: GroupPermissions[user.group],
    };
  }
}
