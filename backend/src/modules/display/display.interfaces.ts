import { Http2ServerRequest } from 'http2';
import { Display } from '~modules/display/display.entity';

export interface DisplayAuthInterface {
  accessToken: string;
}

export interface DisplayRequest extends Http2ServerRequest {
  display: Display;
}
