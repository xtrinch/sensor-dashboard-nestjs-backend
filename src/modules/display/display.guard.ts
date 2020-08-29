import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable
} from '@nestjs/common';
import { Http2ServerRequest } from 'http2';
import validator from 'validator';
import { Display } from '~modules/display/display.entity';
import { DisplayService } from '~modules/display/display.service';

export interface DisplayRequest extends Http2ServerRequest {
  display: Display;
}

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

    request.display = await this.displayService.find({
      displayAccessToken: authorization,
    });

    return true;
  }
}
