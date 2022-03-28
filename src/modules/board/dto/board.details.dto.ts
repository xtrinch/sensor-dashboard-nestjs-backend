import { SensorDetailsDto } from '~modules/sensor/dto/sensor.details.dto';
import { Sensor, SensorId } from '~modules/sensor/sensor.entity';
import { Board } from '../board.entity';

class BoardStateDto {
  [id: string]: {
    id: SensorId;
    sensor?: SensorDetailsDto;
    boardX: number;
    boardY: number;
    isPinned: boolean;
  };
}
export class BoardDetailsDto {
  state: BoardStateDto;
  scale: number;
  boardX: number; // top left
  boardY: number; // top left

  public static fromBoard(board: Board): BoardDetailsDto {
    const dtoState = board.state as unknown as BoardStateDto;
    Object.values(dtoState).forEach((i) => {
      i.sensor = SensorDetailsDto.fromSensor(i.sensor as unknown as Sensor);
    });
    return {
      state: dtoState,
      scale: board.scale,
      boardX: board.boardX,
      boardY: board.boardY,
    };
  }
}
