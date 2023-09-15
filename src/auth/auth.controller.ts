import {
  Controller,
  Post,
  Body,
  NotFoundException,
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { TransformResponseInterceptor } from 'src/interceptors';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly _userService: UserService,
    private readonly _authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'No Auth',
    description: 'Login user with email and password to get jwt token',
  })
  @UseInterceptors(TransformResponseInterceptor)
  async register(@Body() user: CreateUserDto) {
    await this._userService.createUser(user);
    return {
      message: 'User registered successfully',
    };
  }
  @Post('login')
  @ApiOperation({
    summary: 'No Auth',
    description: 'Login user with email and password to get jwt token',
  })
  @UseInterceptors(TransformResponseInterceptor)
  async login(@Body() userLogin: CreateAuthDto) {
    const user = await this._userService.getUserByEmail(userLogin.email);
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }
    if (!bcrypt.compareSync(userLogin.password, user.password)) {
      throw new BadRequestException('invalid credentials');
    }
    const token = await this._authService.generateJwt(user);
    const decode = await this._authService.decodeUser(token);
    decode['token'] = token;
    return {
      message: 'User Login Successfully',
      data: {
        user: decode,
      },
    };
  }
}
