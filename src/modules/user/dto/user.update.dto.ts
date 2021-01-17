import { IsEnum, IsOptional } from 'class-validator';
import { GroupEnum } from '~modules/user/enum/group.enum';

export class UserUpdateDto {
  @IsEnum(GroupEnum)
  @IsOptional()
  public group: GroupEnum;
}
