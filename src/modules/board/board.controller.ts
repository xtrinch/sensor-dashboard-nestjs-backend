import { Body, Controller, Get, Put, Request } from '@nestjs/common';
import { BoardService } from '~/modules/board/board.service';
import { BoardDetailsDto } from '~modules/board/dto/board.details.dto';
import { BoardUpdateDto } from '~modules/board/dto/board.update.dto';
import AuthGuard from '~modules/user/auth.decorator';
import { UserRequest } from '~modules/user/jwt.guard';
import { PaginationDto } from '~utils/pagination.dto';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @AuthGuard()
  @Get('my')
  public async getMyBoard(
    @Request() request: UserRequest,
  ): Promise<PaginationDto<BoardDetailsDto>> {
    const board = await this.boardService.getBoard(
      {
        id: request.user?.boardId,
      },
      { relations: ['sensors'] },
    );

    return BoardDetailsDto.fromBoard(board);
  }

  @AuthGuard()
  @Put('my')
  public async updateMyBoard(
    @Body() data: BoardUpdateDto,
    @Request() request: UserRequest,
  ): Promise<BoardDetailsDto> {
    let board = await this.boardService.update(request.user.boardId, data);
    // refetch with relations
    board = await this.boardService.getBoard(
      {
        id: request.user?.boardId,
      },
      { relations: ['sensors'] },
    );
    return BoardDetailsDto.fromBoard(board);
  }
}
