import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable
} from '@nestjs/common';
import { MqttContext } from '@nestjs/microservices';
import validator from 'validator';
import { ForwarderService } from '~modules/forwarder/forwarder.service';
import { Sensor } from '~modules/sensor/sensor.entity';
import { SensorService } from '~modules/sensor/sensor.service';

export interface SensorMqttContext extends MqttContext {
  sensor: Sensor;
  payload: any;
}

@Injectable()
export class SensorMqttGuard implements CanActivate {
  constructor(
    @Inject(SensorService)
    readonly sensorService: SensorService,
    @Inject(ForwarderService)
    readonly forwarderService: ForwarderService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const mqttContext: SensorMqttContext = context.getArgs()[1];
    const topic = mqttContext.getTopic();
    const authorization = topic.split('/').pop();

    if (!validator.isUUID(authorization)) {
      return false;
    }

    mqttContext.sensor = await this.sensorService.find({
      accessToken: authorization,
    });

    try {
      mqttContext.payload = JSON.parse(mqttContext.getPacket().payload.toString());
    } catch(e) {
      console.log(e);
      throw new BadRequestException("Invalid format");
    }
    return true;
  }
}
