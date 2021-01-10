import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import validator from 'validator';
import { ForwarderRequest } from '~modules/forwarder/forwarder.interfaces';
import { ForwarderService } from '~modules/forwarder/forwarder.service';

@Injectable()
export class ForwarderGuard implements CanActivate {
  constructor(
    @Inject(ForwarderService)
    readonly forwarderService: ForwarderService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ForwarderRequest = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!validator.isUUID(authorization)) {
      return false;
    }

    request.forwarder = await this.forwarderService.find(
      {
        accessToken: authorization,
      },
      { relations: [] },
    );

    return true;
  }
}
