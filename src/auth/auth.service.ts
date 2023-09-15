import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User as UserEntity } from 'src/user/entities';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async generateJwt(user: UserEntity) {
    const userData: Pick<UserEntity, 'email' | 'id' | 'username'> = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    return await this.jwtService.signAsync(userData, {
      secret: this.configService.get('SECRET_KEY'),
    });
  }
  async decodeUser(jwttoken: string): Promise<string | jwt.JwtPayload> {
    return await jwt.verify(jwttoken, this.configService.get('SECRET_KEY'));
  }
}
