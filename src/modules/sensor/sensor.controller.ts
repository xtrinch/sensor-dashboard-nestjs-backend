import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Sensor, SensorId } from '~/modules/sensor/sensor.entity';
import { SensorService } from '~/modules/sensor/sensor.service';
import { SensorCreateDto } from '~modules/sensor/dto/sensor.create.dto';
import { SensorDetailsDto } from '~modules/sensor/dto/sensor.details.dto';
import { SensorDto } from '~modules/sensor/dto/sensor.dto';
import { SensorUpdateDto } from '~modules/sensor/dto/sensor.update.dto';
import { UserGuard, UserRequest } from '~modules/user/user.guard';
import { PaginationDto } from '~utils/pagination.dto';
import { PaginationQueryDto } from '~utils/pagination.query.dto';

@Controller('sensors')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get()
  public async findAll(
    @Query() pagination: PaginationQueryDto,
  ): Promise<PaginationDto<SensorDto>> {
    const items = await this.sensorService.findAll({}, pagination);

    return PaginationDto.fromPagination<Sensor, SensorDto>(
      items,
      SensorDto.fromSensor,
    );
  }

  @UseGuards(UserGuard)
  @Post()
  public async create(
    @Body() data: SensorCreateDto,
    @Request() request: UserRequest,
  ): Promise<SensorDetailsDto> {
    const sensor = await this.sensorService.create(request, data);
    return SensorDetailsDto.fromSensor(sensor);
  }

  @UseGuards(UserGuard)
  @Put('/:id')
  public async update(
    @Body() data: SensorUpdateDto,
    @Param('id') id: SensorId,
    @Request() request: UserRequest,
  ): Promise<SensorDetailsDto> {
    const sensor = await this.sensorService.update(request, id, data);
    return SensorDetailsDto.fromSensor(sensor);
  }
}
