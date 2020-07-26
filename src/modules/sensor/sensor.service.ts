import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Sensor, SensorWhereInterface } from './sensor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from '~utils/pagination.query.dto';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(Sensor)
    private sensorRepository: Repository<Sensor>,
  ) {}

  async findAll(
    where: SensorWhereInterface,
    pagination: PaginationQueryDto,
  ): Promise<Pagination<Sensor>> {
    const results = await paginate<Sensor>(this.sensorRepository, {
      ...pagination,
      ...where,
    });

    return results;
  }

  async find(where: SensorWhereInterface): Promise<Sensor> {
    const result = await this.sensorRepository.findOne(where);

    if (!result) {
      throw new NotFoundException('Sensor not found');
    }

    return result;
  }
}
