import { Board, BoardState } from '../board.entity';

export class BoardDetailsDto {
  state: BoardState;

  public static fromBoard(board: Board): BoardDetailsDto {
    return {
      state: board.state,
    };
  }
}
