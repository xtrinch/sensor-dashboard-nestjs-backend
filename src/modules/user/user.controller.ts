import { Body, Controller, Delete, Get, Param, Put, Query, Request } from '@nestjs/common';
import AuthGuard from '~modules/user/auth.decorator';
import { UserDto } from '~modules/user/dto/user.dto';
import { UserUpdateDto } from '~modules/user/dto/user.update.dto';
import { PermissionsEnum } from '~modules/user/enum/permissions.enum';
import { UserRequest } from '~modules/user/jwt.guard';
import { User, UserId } from '~modules/user/user.entity';
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

  @AuthGuard({
    permissions: [PermissionsEnum.User__update]
  })
  @Put('/:id')
  public async update(
    @Body() data: UserUpdateDto,
    @Param('id') id: UserId,
    @Request() request: UserRequest,
  ): Promise<UserDto> {
    const user = await this.userService.update(id, data);
    return UserDto.fromUser(user);
  }

  @AuthGuard({
    permissions: [PermissionsEnum.User__delete]
  })
  @Delete('/:id')
  public async delete(
    @Param('id') id: UserId,
    @Request() request: UserRequest,
  ): Promise<{ status: string }> {
    await this.userService.delete({ id });

    return {
      status: '200'
    };
  }
}
