import { IsNumber, IsObject, IsOptional } from 'class-validator';
import { BoardState } from '../board.entity';

export class BoardCreateDto {
  @IsOptional()
  @IsObject()
  state: BoardState;

  @IsOptional()
  @IsNumber()
  scale: number;

  @IsOptional()
  @IsNumber()
  boardX: number; // top left

  @IsOptional()
  @IsNumber()
  boardY: number; // top left
}
