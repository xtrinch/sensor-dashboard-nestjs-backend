import { Controller, Get, Query } from '@nestjs/common';
import { SensorService } from '~/modules/sensor/sensor.service';
import Sensor from '~/modules/sensor/sensor.entity';
import { PaginationQueryDto } from '~modules/utils/pagination.query.dto';
import { PaginationDto } from '~modules/utils/pagination.dto';
import { SensorDto } from '~modules/sensor/dto/sensor.dto';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('sensors')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get()
  public async findAll(
    @Query() pagination: PaginationQueryDto,
  ): Promise<Pagination<SensorDto>> {
    const items = await this.sensorService.findAll(pagination);

    return PaginationDto.fromPagination<Sensor, SensorDto>(
      items,
      SensorDto.fromSensor,
    );
  }
}
