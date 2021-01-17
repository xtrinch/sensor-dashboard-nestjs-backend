import { IsEnum } from 'class-validator';
import { GroupEnum } from '~modules/user/enum/group.enum';

export class UserUpdateDto {
  @IsEnum(GroupEnum)
  public group: GroupEnum;
}
