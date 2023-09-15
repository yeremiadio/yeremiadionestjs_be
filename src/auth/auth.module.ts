import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guard';
import { JwtStrategy } from './strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
    JwtService,
    JwtAuthGuard,
    JwtStrategy,
  ],
})
export class AuthModule {}
