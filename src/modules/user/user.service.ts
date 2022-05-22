import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { BoardService } from '~modules/board/board.service';
import { UserCreateDto } from '~modules/user/dto/user.create.dto';
import { UserUpdateDto } from '~modules/user/dto/user.update.dto';
import { User, UserId, UserWhereInterface } from '~modules/user/user.entity';
import { PaginationQueryDto } from '~utils/pagination.query.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => BoardService))
    private boardService: BoardService,
  ) {}

  public async findAll(
    where: UserWhereInterface,
    pagination: PaginationQueryDto,
  ): Promise<Pagination<User>> {
    const results = await paginate<User>(this.userRepository, pagination, {
      where,
      order: {
        createdAt: 'DESC',
      },
    });

    return results;
  }

  async find(where: UserWhereInterface): Promise<User> {
    const user = await this.userRepository.findOne(where);
    if (user) {
      return user;
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  async create(data: UserCreateDto): Promise<User> {
    let hashedPassword: string;
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, 10);
    }

    const board = await this.boardService.createBoard();

    const user = new User();
    user.username = data.username;
    user.password = hashedPassword;
    user.email = data.email;
    user.name = data.name;
    user.surname = data.surname;
    user.isGoogle = data.isGoogle;
    user.boardId = board.id;

    await this.userRepository.save(user);

    return user;
  }

  async update(id: UserId, data: UserUpdateDto): Promise<User> {
    const user = await this.userRepository.findOne({ id });

    user.group = data.group;

    await User.save(user);

    return user;
  }

  public async delete(where: UserWhereInterface): Promise<boolean> {
    const display = await this.find(where);
    await User.remove(display);

    return true;
  }
}
