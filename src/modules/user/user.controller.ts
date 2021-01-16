import { Controller, Get, Query } from '@nestjs/common';
import { UserDto } from '~modules/user/dto/user.dto';
import { User } from '~modules/user/user.entity';
import { UserService } from '~modules/user/user.service';
import { PaginationDto } from '~utils/pagination.dto';
import { PaginationQueryDto } from '~utils/pagination.query.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async findAll(
    @Query() pagination: PaginationQueryDto,
  ): Promise<PaginationDto<UserDto>> {
    const items = await this.userService.findAll({}, pagination);

    return PaginationDto.fromPagination<User, UserDto>(items, UserDto.fromUser);
  }
}
