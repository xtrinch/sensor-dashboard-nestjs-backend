import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { SensorCreateDto } from '~modules/sensor/dto/sensor.create.dto';
import { SensorUpdateDto } from '~modules/sensor/dto/sensor.update.dto';
import { UserRequest } from '~modules/user/user.guard';
import { PaginationQueryDto } from '~utils/pagination.query.dto';
import { Sensor, SensorId, SensorWhereInterface } from './sensor.entity';

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

  public async create(
    request: UserRequest,
    data: SensorCreateDto,
  ): Promise<Sensor> {
    const sensor = new Sensor();
    sensor.boardType = data.boardType;
    sensor.location = data.location;
    sensor.name = data.name;
    sensor.measurementTypes = data.measurementTypes;
    sensor.timezone = data.timezone;
    sensor.userId = request.user?.id;

    await Sensor.save(sensor);

    return sensor;
  }

  public async update(
    request: UserRequest,
    id: SensorId,
    data: SensorUpdateDto,
  ): Promise<Sensor> {
    const sensor = await this.sensorRepository.findOneOrFail({ id });

    if (sensor.userId !== request.user?.id) {
      throw new ForbiddenException();
    }
    if (data.location) {
      sensor.location = data.location;
    }
    if (data.measurementTypes) {
      sensor.measurementTypes = data.measurementTypes;
    }
    if (data.name) {
      sensor.name = data.name;
    }
    if (data.timezone) {
      sensor.timezone = data.timezone;
    }

    await Sensor.save(sensor);

    return sensor;
  }
}
