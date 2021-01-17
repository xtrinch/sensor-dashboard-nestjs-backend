import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { intersection } from 'lodash';
import { PermissionsEnum } from '~modules/user/enum/permissions.enum';
import { UserRequest } from '~modules/user/jwt.guard';
import { GroupPermissions } from './enum/group.enum';

@Injectable()
export default class AclGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<PermissionsEnum[]>(
      'permissions',
      context.getHandler(),
    );
    if (!permissions?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<UserRequest>();
    const userPermissions = GroupPermissions[request.user?.group];
    const allow = intersection(userPermissions, permissions).length > 0;

    if (!allow) {
      throw new ForbiddenException();
    }

    return true;
  }
}