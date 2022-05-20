import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Board,
  BoardId,
  BoardWhereInterface,
} from '~modules/board/board.entity';
import { BoardCreateDto } from '~modules/board/dto/board.create.dto';
import { BoardUpdateDto } from '~modules/board/dto/board.update.dto';
import { SensorService } from '~modules/sensor/sensor.service';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    private sensorService: SensorService,
  ) {}

  async getBoard(
    where: BoardWhereInterface,
    options?: { relations?: string[] },
  ): Promise<Board> {
    const board = await this.boardRepository.findOne(where);
    if (board) {
      // if (options?.relations?.includes('sensors')) {
      //   const sensorIds = Object.keys(board.state);
      //   const sensors = await this.sensorService.findAll(
      //     {
      //       id: Any(sensorIds),
      //     },
      //     {
      //       fetchLatestMeasurements: true,
      //     },
      //   );

      //   Object.values(board.state).forEach((s) => {
      //     s.sensor = sensors.items.find((ss) => ss.id === s.id);
      //   });
      // }
      return board;
    }

    if (!board) {
      throw new NotFoundException('Board not found');
    }
  }

  async createBoard(data?: BoardCreateDto): Promise<Board> {
    let board = new Board();

    board = await this.boardRepository.save(board);

    return board;
  }

  async update(id: BoardId, data: BoardUpdateDto): Promise<Board> {
    const board = await this.boardRepository.findOne({ id });

    board.state = data.state ?? board.state;
    await this.boardRepository.save(board);

    return board;
  }
}
