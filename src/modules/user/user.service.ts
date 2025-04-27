import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entity/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findById(id: string) {
    return this.userRepo.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  async findByUsername(username: string) {
    return this.userRepo.findOneBy({ username });
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(userId, updateUserDto);
  }

  async create(createUserDto: CreateUserDto) {
    return this.userRepo.save(createUserDto);
  }
}
