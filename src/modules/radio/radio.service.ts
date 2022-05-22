import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { RadioCreateDto } from '~modules/radio/dto/radio.create.dto';
import { RadioUpdateDto } from '~modules/radio/dto/radio.update.dto';
import { UserRequest } from '~modules/user/jwt.guard';
import { PaginationQueryDto } from '~utils/pagination.query.dto';
import { Radio, RadioId, RadioWhereInterface } from './radio.entity';

@Injectable()
export class RadioService {
  constructor(
    @InjectRepository(Radio)
    private radioRepository: Repository<Radio>,
    @Inject('MQTT_CLIENT') private mqttClient: ClientProxy,
  ) {}

  public async findAll(
    where: RadioWhereInterface,
    options: { relations?: string[] },
    pagination: PaginationQueryDto,
  ): Promise<Pagination<Radio>> {
    const results = await paginate<Radio>(this.radioRepository, pagination, {
      ...options,
      where,
    });

    return results;
  }

  public async find(
    where: RadioWhereInterface,
    options?: { relations: string[] },
  ): Promise<Radio> {
    const radio = await this.radioRepository.findOne(where, options);

    if (!radio) {
      throw new NotFoundException();
    }

    return radio;
  }

  public async userFind(
    request: UserRequest,
    where: RadioWhereInterface,
    options?: { relations: string[] },
  ): Promise<Radio> {
    const radio = await this.find(where, options);

    if (radio.userId !== request.user?.id) {
      throw new ForbiddenException();
    }

    return radio;
  }

  public async create(
    request: UserRequest,
    data: RadioCreateDto,
  ): Promise<Radio> {
    const radio = new Radio();
    radio.location = data.location;
    radio.userId = request.user?.id;
    radio.user = request.user;
    radio.name = data.name;
    radio.boardType = data.boardType;
    radio.config = data.config;

    await Radio.save(radio);

    return radio;
  }

  public async patch(
    radio: Radio,
    data: Partial<RadioUpdateDto>,
  ): Promise<Radio> {
    if (data.location) {
      radio.location = data.location;
    }
    if (data.name) {
      radio.name = data.name;
    }
    if (data.boardType) {
      radio.boardType = data.boardType;
    }
    if (data.config) {
      radio.config = data.config;
    }

    await Radio.save(radio);

    return radio;
  }

  public async update(radio: Radio, data: RadioUpdateDto): Promise<Radio> {
    radio.location = data.location;
    radio.name = data.name;
    radio.boardType = data.boardType;
    radio.config = data.config;

    await Radio.save(radio);

    return radio;
  }

  public async delete(
    request: UserRequest,
    where: RadioWhereInterface,
  ): Promise<boolean> {
    const radio = await this.find(where);

    if (radio.userId !== request.user?.id) {
      throw new ForbiddenException();
    }

    await Radio.remove(radio);

    return true;
  }

  public async registerPing(radio: Radio): Promise<boolean> {
    radio.lastSeenAt = new Date();
    Radio.save(radio);

    return true;
  }

  public async sendConfigToRadio(id: RadioId): Promise<void> {
    const radio = await this.radioRepository.findOne(id);

    this.mqttClient.emit(
      `radios/downstream/${radio.accessToken}`,
      JSON.stringify({ type: 'config', payload: radio.config }),
    );
  }

  public async requestConfigFromRadio(id: RadioId): Promise<void> {
    const radio = await this.radioRepository.findOne(id);

    this.mqttClient.emit(
      `radios/downstream/${radio.accessToken}`,
      JSON.stringify({ type: 'config-request' }),
    );
  }
}
