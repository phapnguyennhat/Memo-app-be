import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
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

  async getMe(userId: string) {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
        avatar: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
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
    let user = undefined;
    const { email, phoneNumber } = createUserDto;

    user = await this.userRepo.findOneBy([{ email }, { phoneNumber }]);

    console.log(user);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    return this.userRepo.save(createUserDto);
  }
}
