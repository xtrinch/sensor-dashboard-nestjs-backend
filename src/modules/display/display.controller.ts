import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Display, DisplayId } from '~/modules/display/display.entity';
import { DisplayService } from '~/modules/display/display.service';
import { DisplayCreateDto } from '~modules/display/dto/display.create.dto';
import { DisplayDetailsDto } from '~modules/display/dto/display.details.dto';
import { DisplayDto } from '~modules/display/dto/display.dto';
import { DisplayUpdateDto } from '~modules/display/dto/display.update.dto';
import { JwtGuard, UserRequest } from '~modules/user/jwt.guard';
import { PaginationDto } from '~utils/pagination.dto';
import { PaginationQueryDto } from '~utils/pagination.query.dto';

@Controller('displays')
export class DisplayController {
  constructor(private readonly displayService: DisplayService) {}

  @Get()
  public async findAll(
    @Query() pagination: PaginationQueryDto,
  ): Promise<PaginationDto<DisplayDto>> {
    const items = await this.displayService.findAll({}, {}, pagination);

    return PaginationDto.fromPagination<Display, DisplayDto>(
      items,
      DisplayDto.fromDisplay,
    );
  }

  @UseGuards(JwtGuard)
  @Get('/my')
  public async findMyDisplays(
    @Query() pagination: PaginationQueryDto,
    @Request() request: UserRequest,
  ): Promise<PaginationDto<DisplayDetailsDto>> {
    const items = await this.displayService.findAll(
      {
        userId: request.user?.id,
      },
      { relations: ['sensors'] },
      pagination,
    );

    return PaginationDto.fromPagination<Display, DisplayDetailsDto>(
      items,
      DisplayDetailsDto.fromDisplay,
    );
  }

  @UseGuards(JwtGuard)
  @Post()
  public async create(
    @Body() data: DisplayCreateDto,
    @Request() request: UserRequest,
  ): Promise<DisplayDetailsDto> {
    const display = await this.displayService.create(request, data);
    return DisplayDetailsDto.fromDisplay(display);
  }

  @UseGuards(JwtGuard)
  @Put('/:id')
  public async update(
    @Body() data: DisplayUpdateDto,
    @Param('id') id: DisplayId,
    @Request() request: UserRequest,
  ): Promise<DisplayDetailsDto> {
    const display = await this.displayService.update(request, id, data);
    return DisplayDetailsDto.fromDisplay(display);
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  public async get(
    @Param('id') id: DisplayId,
    @Request() request: UserRequest,
  ): Promise<DisplayDetailsDto> {
    const display = await this.displayService.userFind(
      request,
      { id },
      { relations: ['sensors'] },
    );

    return DisplayDetailsDto.fromDisplay(display);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  public async delete(
    @Param('id') id: DisplayId,
    @Request() request: UserRequest,
  ): Promise<{ status: string }> {
    await this.displayService.delete(request, { id });

    return {
      status: '200',
    };
  }
}
