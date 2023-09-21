// src/seeder/user-seeder.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities';
import { Repository } from 'typeorm';
import * as dotenv from 'dotenv';
import { USER_ROLE } from 'src/common/type';

dotenv.config();

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seedUsers(): Promise<void> {
    // Replace this with your dummy user data
    const usersData = [
      {
        username: process.env.USER_SEEDER_USERNAME,
        email: process.env.USER_SEEDER_EMAIL,
        password: process.env.USER_SEEDER_PASSWORD,
        role: USER_ROLE.SUPERADMIN,
      },
      // Add more user data as needed
    ];

    for (const userData of usersData) {
      const user = this.userRepository.create(userData);
      await this.userRepository.save(user);
    }
  }
}
