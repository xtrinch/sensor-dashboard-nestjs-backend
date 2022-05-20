import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '~utils/abstract.entity';

export type BoardId = string;

export interface BoardWhereInterface {
  id?: string;
}

export interface BoardState {
  objects: any[];
  snapAngle: number;
  version: string;
  hoverCursor: 'string';
}

@Entity()
export class Board extends AbstractEntity {
  @Column({ type: 'jsonb', default: '{}' })
  state: BoardState;
}
