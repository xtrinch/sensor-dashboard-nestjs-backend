import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { SensorCreateDto } from '~modules/sensor/dto/sensor.create.dto';
import { SensorUpdateDto } from '~modules/sensor/dto/sensor.update.dto';
import { UserRequest } from '~modules/user/jwt.guard';
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
    const results = await paginate<Sensor>(this.sensorRepository, pagination, where);

    return results;
  }

  public async find(where: SensorWhereInterface): Promise<Sensor> {
    const sensor = await this.sensorRepository.findOne(where);

    if (!sensor) {
      throw new NotFoundException();
    }
    
    return sensor;
  }

  public async userFind(
    request: UserRequest,
    where: SensorWhereInterface,
  ): Promise<Sensor> {
    const sensor = await this.find(where);

    if (sensor.userId !== request.user?.id) {
      throw new ForbiddenException();
    }

    return sensor;
  }

  public async create(
    request: UserRequest,
    data: SensorCreateDto,
  ): Promise<Sensor> {
    const sensor = new Sensor();
    sensor.boardType = data.boardType;
    sensor.location = data.location;
    sensor.name = data.name;
    sensor.displayName = data.displayName;
    sensor.measurementTypes = Object.values(MeasurementTypeEnum);
    sensor.timezone = data.timezone;
    sensor.userId = request.user?.id;
    sensor.user = request.user;
    sensor.private = data.private;

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
    if (data.displayName) {
      sensor.displayName = data.displayName;
    }
    if (data.timezone) {
      sensor.timezone = data.timezone;
    }
    if ('private' in data) {
      sensor.private = data.private;
    }

    await Sensor.save(sensor);

    return sensor;
  }

  public async delete(
    request: UserRequest,
    where: SensorWhereInterface,
  ): Promise<boolean> {
    const sensor = await this.find(where);

    if (sensor.userId !== request.user?.id) {
      throw new ForbiddenException();
    }

    await Sensor.remove(sensor);

    return true;
  }
}
