import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable
} from '@nestjs/common';
import { MqttContext } from '@nestjs/microservices';
import validator from 'validator';
import { Radio } from '~modules/radio/radio.entity';
import { RadioService } from '~modules/radio/radio.service';

export interface RadioMqttContext extends MqttContext {
  radio: Radio;
  payload: any;
}

@Injectable()
export class RadioMqttGuard implements CanActivate {
  constructor(
    @Inject(RadioService)
    readonly radioService: RadioService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const mqttContext: RadioMqttContext = context.getArgs()[1];
    const topic = mqttContext.getTopic();
    const authorization = topic.split('/').pop();

    if (!validator.isUUID(authorization)) {
      return false;
    }

    mqttContext.radio = await this.radioService.find({
      accessToken: authorization,
    });

    try {
      mqttContext.payload = JSON.parse(
        mqttContext.getPacket().payload.toString(),
      );
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
    return true;
  }
}
