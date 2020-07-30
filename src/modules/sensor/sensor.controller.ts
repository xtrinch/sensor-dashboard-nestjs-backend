import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  UseGuards,
  Put,
  Param,
} from '@nestjs/common';
import { SensorService } from '~/modules/sensor/sensor.service';
import Sensor, { SensorId } from '~/modules/sensor/sensor.entity';
import { PaginationQueryDto } from '~utils/pagination.query.dto';
import { PaginationDto } from '~utils/pagination.dto';
import { SensorDto } from '~modules/sensor/dto/sensor.dto';
import { SensorCreateDto } from '~modules/sensor/dto/sensor.create.dto';
import { SensorDetailsDto } from '~modules/sensor/dto/sensor.details.dto';
import { AdminGuard } from '~utils/admin.guard';
import { SensorUpdateDto } from '~modules/sensor/dto/sensor.update.dto';

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
  public async create(
    @Body() data: SensorCreateDto,
  ): Promise<SensorDetailsDto> {
    const sensor = await this.sensorService.create(data);
    return SensorDetailsDto.fromSensor(sensor);
  }

  @UseGuards(AdminGuard)
  @Put('/:id')
  public async update(
    @Body() data: SensorUpdateDto,
    @Param('id') id: SensorId,
  ): Promise<SensorDetailsDto> {
    const sensor = await this.sensorService.update(id, data);
    return SensorDetailsDto.fromSensor(sensor);
  }
}
