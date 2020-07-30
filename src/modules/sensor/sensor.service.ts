import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Sensor, SensorWhereInterface, SensorId } from './sensor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from '~utils/pagination.query.dto';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SensorCreateDto } from '~modules/sensor/dto/sensor.create.dto';
import { SensorUpdateDto } from '~modules/sensor/dto/sensor.update.dto';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(Sensor)
    private sensorRepository: Repository<Sensor>,
  ) {}

  public async findAll(
    where: SensorWhereInterface,
    pagination: PaginationQueryDto,
  ): Promise<Pagination<Sensor>> {
    const results = await paginate<Sensor>(this.sensorRepository, {
      ...pagination,
      ...where,
    });

    return results;
  }

  public async find(where: SensorWhereInterface): Promise<Sensor> {
    const result = await this.sensorRepository.findOne(where);

    if (!result) {
      throw new NotFoundException('Sensor not found');
    }

    return result;
  }

  public async create(data: SensorCreateDto): Promise<Sensor> {
    const sensor = new Sensor();
    sensor.boardType = data.boardType;
    sensor.location = data.location;
    sensor.name = data.name;

    await Sensor.save(sensor);

    return sensor;
  }

  public async update(id: SensorId, data: SensorUpdateDto): Promise<Sensor> {
    const sensor = await this.sensorRepository.findOneOrFail({ id });

    if (data.location) {
      sensor.location = data.location;
    }
    if (data.measurementTypes) {
      sensor.measurementTypes = data.measurementTypes;
    }
    if (data.name) {
      sensor.name = data.name;
    }

    await Sensor.save(sensor);

    return sensor;
  }
}
