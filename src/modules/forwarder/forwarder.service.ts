import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { ForwarderCreateDto } from '~modules/forwarder/dto/forwarder.create.dto';
import { ForwarderUpdateDto } from '~modules/forwarder/dto/forwarder.update.dto';
import { ForwarderRequest } from '~modules/forwarder/forwarder.interfaces';
import { UserRequest } from '~modules/user/jwt.guard';
import { PaginationQueryDto } from '~utils/pagination.query.dto';
import {
  Forwarder,
  ForwarderId,
  ForwarderWhereInterface,
} from './forwarder.entity';

@Injectable()
export class ForwarderService {
  constructor(
    @InjectRepository(Forwarder)
    private forwarderRepository: Repository<Forwarder>,
  ) {}

  public async findAll(
    where: ForwarderWhereInterface,
    options: { relations?: string[] },
    pagination: PaginationQueryDto,
  ): Promise<Pagination<Forwarder>> {
    const results = await paginate<Forwarder>(
      this.forwarderRepository,
      {
        ...pagination,
        ...where,
      },
      {
        ...options,
      },
    );

    return results;
  }

  public async find(
    where: ForwarderWhereInterface,
    options?: { relations: string[] },
  ): Promise<Forwarder> {
    const forwarder = await this.forwarderRepository.findOne(where, options);

    if (!forwarder) {
      throw new NotFoundException();
    }

    return forwarder;
  }

  public async userFind(
    request: UserRequest,
    where: ForwarderWhereInterface,
    options?: { relations: string[] },
  ): Promise<Forwarder> {
    const forwarder = await this.find(where, options);

    if (forwarder.userId !== request.user?.id) {
      throw new ForbiddenException();
    }

    return forwarder;
  }

  public async create(
    request: UserRequest,
    data: ForwarderCreateDto,
  ): Promise<Forwarder> {
    const forwarder = new Forwarder();
    forwarder.location = data.location;
    forwarder.userId = request.user?.id;
    forwarder.user = request.user;
    forwarder.name = data.name;

    await Forwarder.save(forwarder);

    return forwarder;
  }

  public async update(
    request: UserRequest,
    id: ForwarderId,
    data: ForwarderUpdateDto,
  ): Promise<Forwarder> {
    const forwarder = await this.forwarderRepository.findOneOrFail({ id });

    if (forwarder.userId !== request.user?.id) {
      throw new ForbiddenException();
    }
    if (data.location) {
      forwarder.location = data.location;
    }
    if (data.name) {
      forwarder.name = data.name;
    }

    await Forwarder.save(forwarder);

    return forwarder;
  }

  public async delete(
    request: UserRequest,
    where: ForwarderWhereInterface,
  ): Promise<boolean> {
    const forwarder = await this.find(where);

    if (forwarder.userId !== request.user?.id) {
      throw new ForbiddenException();
    }

    await Forwarder.remove(forwarder);

    return true;
  }

  public async registerPing(request: ForwarderRequest): Promise<boolean> {
    request.forwarder.lastSeenAt = new Date();
    Forwarder.save(request.forwarder);

    return true;
  }
}
