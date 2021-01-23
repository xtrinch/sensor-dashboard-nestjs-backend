import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import AclGuard from '~modules/user/acl.guard';
import { PermissionsEnum } from '~modules/user/enum/permissions.enum';
import { JwtGuard } from '~modules/user/jwt.guard';

const AuthGuard = (params?: { permissions: PermissionsEnum[] }) => {
  return applyDecorators(
    SetMetadata('permissions', params?.permissions),
    UseGuards(JwtGuard, AclGuard),
  );
};

export default AuthGuard;
