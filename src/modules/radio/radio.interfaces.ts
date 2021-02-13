import { Http2ServerRequest } from 'http2';
import { Radio } from '~modules/radio/radio.entity';
import { SensorRequest } from '~modules/sensor/sensor.guard';

export interface RadioAuthInterface {
  accessToken: string;
}

export interface RadioRequest extends Http2ServerRequest, SensorRequest {
  radio: Radio;
}
