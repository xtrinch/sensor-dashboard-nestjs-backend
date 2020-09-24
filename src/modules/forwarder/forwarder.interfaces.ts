import { Http2ServerRequest } from 'http2';
import { Forwarder } from '~modules/forwarder/forwarder.entity';
import { SensorRequest } from '~modules/sensor/sensor.guard';

export interface ForwarderAuthInterface {
  accessToken: string;
}

export interface ForwarderRequest extends Http2ServerRequest, SensorRequest {
  forwarder: Forwarder;
}
