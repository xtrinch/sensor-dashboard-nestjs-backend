import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { DisplayCreateDto } from '~modules/display/dto/display.create.dto';
import { DisplayUpdateDto } from '~modules/display/dto/display.update.dto';
import { UserRequest } from '~modules/user/jwt.guard';
import { PaginationQueryDto } from '~utils/pagination.query.dto';
import { Display, DisplayId, DisplayWhereInterface } from './display.entity';

@Injectable()
export class DisplayService {
  constructor(
    @InjectRepository(Display)
    private displayRepository: Repository<Display>,
  ) {}

  public async findAll(
    where: DisplayWhereInterface,
    pagination: PaginationQueryDto,
  ): Promise<Pagination<Display>> {
    const results = await paginate<Display>(this.displayRepository, {
      ...pagination,
      ...where,
    });

    return results;
  }

  public async find(where: DisplayWhereInterface): Promise<Display> {
    const display = await this.displayRepository.findOneOrFail(where);
    return display;
  }

  public async userFind(
    request: UserRequest,
    where: DisplayWhereInterface,
  ): Promise<Display> {
    const display = await this.find(where);

    if (display.userId !== request.user?.id) {
      throw new ForbiddenException();
    }

    return display;
  }

  public async create(
    request: UserRequest,
    data: DisplayCreateDto,
  ): Promise<Display> {
    const display = new Display();
    display.location = data.location;
    display.userId = request.user?.id;
    display.user = request.user;
    display.name = data.name;
    display.boardType = data.boardType;
    
    await Display.save(display);

    return display;
  }

  public async update(
    request: UserRequest,
    id: DisplayId,
    data: DisplayUpdateDto,
  ): Promise<Display> {
    const display = await this.displayRepository.findOneOrFail({ id });

    if (display.userId !== request.user?.id) {
      throw new ForbiddenException();
    }
    if (data.location) {
      display.location = data.location;
    }
    if (data.name) {
      display.name = data.name;
    }
    if (data.boardType) {
      display.boardType = data.boardType;
    }

    await Display.save(display);

    return display;
  }
}
