import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { SensorService } from '~modules/sensor/sensor.service';
import Sensor from '~modules/sensor/sensor.entity';
import { Http2ServerRequest } from 'http2';
import validator from 'validator';

export interface SensorRequest extends Http2ServerRequest {
  sensor: Sensor;
}

@Injectable()
export class SensorGuard implements CanActivate {
  constructor(
    @Inject(SensorService)
    readonly sensorService: SensorService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: SensorRequest = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!validator.isUUID(authorization)) {
      return false;
    }

    request.sensor = await this.sensorService.find({
      sensorAccessToken: authorization,
    });

    return true;
  }
}
