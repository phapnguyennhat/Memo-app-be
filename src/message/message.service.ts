import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/database/entity/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/createMessage.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  public async createMessage(data: CreateMessageDto) {
    return this.messageRepo.save(data);
  }

  public async getDetailMessage(id: string) {
    return this.messageRepo.findOne({
      where: { id },
      relations: {
        sender: {
          avatar: true,
        },
        receiver: true,
      },
    });
  }
}
