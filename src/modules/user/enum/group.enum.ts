import { PermissionsEnum } from './permissions.enum';

export enum GroupEnum {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

export const GroupPermissions: { [key: string]: PermissionsEnum[] } = {
  admin: [
    PermissionsEnum.User__delete,
    PermissionsEnum.User__update,
    PermissionsEnum.Category__create,
    PermissionsEnum.Category__delete,
    PermissionsEnum.Category__update,
    PermissionsEnum.Topic__create,
    PermissionsEnum.Topic__delete,
    PermissionsEnum.Topic__update,
    PermissionsEnum.Comment__create,
    PermissionsEnum.Comment__delete,
    PermissionsEnum.Comment__update,
  ],
  moderator: [] as PermissionsEnum[],
};
