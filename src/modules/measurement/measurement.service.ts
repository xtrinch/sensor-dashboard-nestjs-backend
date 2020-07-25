import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Measurement } from './measurement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { PaginationQueryDto } from '~modules/utils/pagination.query.dto';
import { MeasurementCreateDto } from '~modules/measurement/dto/measurement.create.dto';

@Injectable()
export class MeasurementService {
  constructor(
    @InjectRepository(Measurement)
    private measurementRepository: Repository<Measurement>,
  ) {}

  public async findAll(
    pagination: PaginationQueryDto,
  ): Promise<Pagination<Measurement>> {
    const results = await paginate<Measurement>(
      this.measurementRepository,
      pagination,
    );

    return results;
  }

  public async create(data: MeasurementCreateDto): Promise<Measurement> {
    const measurement = new Measurement();
    measurement.measurement = data.measurement;
    measurement.measurementType = data.measurementType;
    await Measurement.save(measurement);
    return measurement;
  }
}
