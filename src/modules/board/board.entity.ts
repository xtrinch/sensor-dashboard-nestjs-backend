import { Column, Entity } from 'typeorm';
import { Sensor, SensorId } from '~modules/sensor/sensor.entity';
import { AbstractEntity } from '~utils/abstract.entity';

export type BoardId = string;

export interface BoardWhereInterface {
  id?: string;
}

export interface BoardState {
  [id: string]: {
    id: SensorId;
    sensor?: Sensor;
    boardX: number;
    boardY: number;
    isPinned: boolean;
  };
}

@Entity()
export class Board extends AbstractEntity {
  @Column({ type: 'jsonb', default: '{}' })
  state: BoardState;

  @Column({ type: 'float4', default: 1.0 })
  scale: number;

  @Column({ type: 'integer', default: 0 })
  boardX: number; // top left

  @Column({ type: 'integer', default: 0 })
  boardY: number; // top left
}
