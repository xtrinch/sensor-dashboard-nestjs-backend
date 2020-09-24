import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Http2ServerRequest } from 'http2';
import validator from 'validator';
import { Forwarder } from '~modules/forwarder/forwarder.entity';
import { ForwarderService } from '~modules/forwarder/forwarder.service';
import { Sensor } from '~modules/sensor/sensor.entity';
import { SensorService } from '~modules/sensor/sensor.service';

export interface SensorRequest extends Http2ServerRequest {
  sensor: Sensor;
  forwarder?: Forwarder;
}

@Injectable()
export class SensorGuard implements CanActivate {
  constructor(
    @Inject(SensorService)
    readonly sensorService: SensorService,
    @Inject(ForwarderService)
    readonly forwarderService: ForwarderService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: SensorRequest = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const forwarder = request.headers.forwarder as string;

    if (!validator.isUUID(authorization)) {
      return false;
    }

    request.sensor = await this.sensorService.find({
      accessToken: authorization,
    });

    try {
      request.forwarder = await this.forwarderService.find({
        accessToken: forwarder,
      });
    } catch (e) {
      if (!(e instanceof NotFoundException)) {
        throw e;
      }
    }

    return true;
  }
}
