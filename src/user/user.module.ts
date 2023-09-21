import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { UserSeederService } from 'src/seeder/user-seeder.service';

@Module({
  // controllers: [UserController],
  // providers: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserSeederService],
  exports: [UserService],
})
export class UserModule {}
