import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/database/entity/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/createMessage.dto';
import { QueryMessageDto } from './dto/queryMessage.dto';

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

  public async getMessage(
    senderId: string,
    receiverId: string,
    query: QueryMessageDto,
  ) {
    const { page, limit } = query;
    const [messages, total] = await this.messageRepo.findAndCount({
      where: [
        {
          senderId,
          receiverId,
        },
        {
          senderId: receiverId,
          receiverId: senderId,
        },
      ],
      relations: {
        sender: {
          avatar: true,
        },
        receiver: {
          avatar: true,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    const numPage = Math.ceil(total / limit);

    if (page + 1 > numPage) {
      return { data: messages, currentPage: page, nextPage: null, total };
    }
    return { data: messages, currentPage: page, nextPage: page + 1, total };
  }
}
