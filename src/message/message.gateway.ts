import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject, UsePipes, ValidationPipe } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AuthService } from 'src/modules/auth/auth.service';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/createMessage.dto';
import { IAuthPayload } from 'src/database/entity/user.entity';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
  namespace: 'message',
})
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async handleConnection(socket: Socket) {
    return this.authService.handleConnection(socket);
  }

  async handleDisconnect(socket: Socket) {
    return this.authService.handleDisconnect(socket);
  }

  @SubscribeMessage('send-message')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,

      forbidUnknownValues: true,
    }),
  )
  async sendMessage(
    @MessageBody() data: CreateMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const payload: IAuthPayload = this.authService.getUserBySocket(socket);
    const message = await this.messageService.createMessage({
      ...data,
      senderId: payload.id,
    });

    const messageDetail = await this.messageService.getDetailMessage(
      message.id,
    );
    const receiverSocketId: string = await this.cacheManager.get(
      `socket:${data.receiverId}`,
    );
    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('receive-message', messageDetail);
    }
  }
}
