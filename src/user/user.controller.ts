import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard';
import { TransformResponseInterceptor } from 'src/interceptors';
import { USER_MESSAGE_RESPONSE } from './constants/user.constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UserFilterDto } from './dto/filter-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(TransformResponseInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create User (Authenticated)',
    description: 'Create User',
  })
  async createUser(@Body() user: CreateUserDto) {
    await this.userService.createUser(user);
    return {
      message: 'User created successfully',
    };
  }
  @Get('')
  @UseInterceptors(TransformResponseInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get Users (Authenticated)',
    description: 'get all user',
  })
  @ApiBearerAuth()
  async getUsers(@Query() userFilterQuery: UserFilterDto) {
    const result = await this.userService.getUsers(userFilterQuery);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return {
      message: USER_MESSAGE_RESPONSE.USER_READ_ALL_SUCCESSFULLY,
      data: result,
    };
  }
  @Get(':id')
  @UseInterceptors(TransformResponseInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'User by ID (Authenticated)',
    description: 'get user by id',
  })
  @ApiBearerAuth()
  async getUserById(@Param('id') id: number) {
    const result = await this.userService.getUserById(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return {
      message: USER_MESSAGE_RESPONSE.USER_READ_ONE_SUCCESSFULLY,
      data: result,
    };
  }
}
