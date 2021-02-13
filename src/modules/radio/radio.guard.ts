import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable
} from '@nestjs/common';
import validator from 'validator';
import { RadioRequest } from '~modules/radio/radio.interfaces';
import { RadioService } from '~modules/radio/radio.service';

@Injectable()
export class RadioGuard implements CanActivate {
  constructor(
    @Inject(RadioService)
    readonly radioService: RadioService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RadioRequest = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!validator.isUUID(authorization)) {
      return false;
    }

    request.radio = await this.radioService.find(
      {
        accessToken: authorization,
      },
      { relations: [] },
    );

    return true;
  }
}
