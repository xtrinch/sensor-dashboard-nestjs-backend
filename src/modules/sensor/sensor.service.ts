import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Sensor } from './sensor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from '~modules/utils/pagination.query.dto';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(Sensor)
    private sensorRepository: Repository<Sensor>,
  ) {}

  async findAll(pagination: PaginationQueryDto): Promise<Pagination<Sensor>> {
    const results = await paginate<Sensor>(this.sensorRepository, pagination);

    return results;
  }
}
