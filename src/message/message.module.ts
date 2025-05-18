import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/database/entity/message.entity';
import { AuthModule } from 'src/modules/auth/auth.module';
import { MessageController } from './message.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Message]), AuthModule],
  controllers: [MessageController],
  providers: [MessageGateway, MessageService],
})
export class MessageModule {}
