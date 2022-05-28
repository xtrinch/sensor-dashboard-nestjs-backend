import { Http2ServerRequest } from 'http2';
import { Display } from '~modules/display/display.entity';

export interface DisplayAuthInterface {
  accessToken1: string;
  accessToken2: string;
}

export interface DisplayRequest extends Http2ServerRequest {
  display: Display;
}

export interface BoardState {
  objects: BoardObjectInterface[];
  snapAngle: number;
  version: string;
  hoverCursor: 'string';
}

export interface BoardObjectInterface {
  height: number;
  width: number;
  left: number;
  top: number;
  type: 'rect' | 'i-text' | 'group';
  subType: 'temperature' | 'humidity';
  angle: number;
}

export interface BoardObjectDto {
  height: number;
  width: number;
  left: number;
  top: number;
  type: 'rect' | 'i-text' | 'group';
  subType: 'temperature' | 'humidity';
  angle: number;
}
