import { PermissionsEnum } from './permissions.enum';

export enum GroupEnum {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

export const GroupPermissions = {
  admin: [
    PermissionsEnum.User__delete,
    PermissionsEnum.User__update,
  ],
  moderator: {},
}