import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import {
  InjectDataSource,
  InjectEntityManager,
  InjectRepository,
} from '@nestjs/typeorm';
import { User as UserEntity } from './entities';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectEntityManager() private postManager: EntityManager,
    @InjectDataSource() private dataSource: DataSource,
  ) {}
  async createUser(user: CreateUserDto): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    const newUser = this.userRepository.create(user);
    // Check if a user with the same email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    await this.userRepository.save(newUser);
  }
  async getUserByEmail(email: string): Promise<UserEntity> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.where('user.email = :email', { email });
    const result = await queryBuilder.getMany();
    return result[0];
  }
  async getUsers(): Promise<UserEntity[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.select([
      'user.id',
      'user.email',
      'user.username',
      'user.createdAt',
      'user.updatedAt',
    ]);
    const result = await queryBuilder.getMany();
    return result;
  }
  async getUserById(id: number): Promise<UserEntity> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.select([
      'user.id',
      'user.email',
      'user.username',
      'user.createdAt',
      'user.updatedAt',
    ]);
    queryBuilder.where('user.id = :id', { id });
    const result = await queryBuilder.getMany();
    return result[0];
  }
}
