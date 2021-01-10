import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import validator from 'validator';
import { DisplayRequest } from '~modules/display/display.interfaces';
import { DisplayService } from '~modules/display/display.service';

@Injectable()
export class DisplayGuard implements CanActivate {
  constructor(
    @Inject(DisplayService)
    readonly displayService: DisplayService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: DisplayRequest = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!validator.isUUID(authorization)) {
      return false;
    }

    request.display = await this.displayService.find(
      {
        accessToken: authorization,
      },
      { relations: ['sensors'] },
    );

    return true;
  }
}
