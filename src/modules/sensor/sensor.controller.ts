import { Controller, Get, Query, Post, Body, UseGuards } from '@nestjs/common';
import { SensorService } from '~/modules/sensor/sensor.service';
import Sensor from '~/modules/sensor/sensor.entity';
import { PaginationQueryDto } from '~utils/pagination.query.dto';
import { PaginationDto } from '~utils/pagination.dto';
import { SensorDto } from '~modules/sensor/dto/sensor.dto';
import { SensorCreateDto } from '~modules/sensor/dto/sensor.create.dto';
import { AdminGuard } from '~utils/admin.guard';

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

  @UseGuards(AdminGuard)
  @Post()
  public async create(@Body() data: SensorCreateDto): Promise<SensorDto> {
    const sensor = await this.sensorService.create(data);
    return SensorDto.fromSensor(sensor);
  }
}
