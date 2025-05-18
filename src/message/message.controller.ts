import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import JwtAuthGuard from 'src/modules/auth/guard/jwt-auth.guard';
import RequestWithUser from 'src/common/requestWithUser.interface';
import { QueryMessageDto } from './dto/queryMessage.dto';
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  async getMessage(
    @Param('userId') userId: string,
    @Req() req: RequestWithUser,
    @Query() query: QueryMessageDto,
  ) {
    return this.messageService.getMessage(userId, req.user.id, query);
  }
}
