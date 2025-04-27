import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { CreateFriendRequestDto } from './dto/createFriendRequest.dto';
import JwtAuthGuard from '../auth/guard/jwt-auth.guard';
import { ActionFriendRequestDto } from './dto/actionFriendRequest.dto';
import { ActionRequestFriend } from 'src/enum/actionRequestFriend.enum';
import RequestWithUser from 'src/common/requestWithUser.interface';
import { ApiParam } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post('request')
  @UseGuards(JwtAuthGuard)
  async createFriendRequest(
    @Body() data: CreateFriendRequestDto,
    @Req() req: RequestWithUser,
  ) {
    return this.friendService.createFriendRequest({
      ...data,
      senderId: req.user.id,
    });
  }

  @Post('request/:senderId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Action friend request' })
  @ApiParam({ name: 'senderId', type: String })
  @ApiBody({ type: ActionFriendRequestDto })
  @ApiResponse({ status: 200, description: 'Friend request accepted' })
  @ApiResponse({ status: 200, description: 'Friend request rejected' })
  @ApiResponse({ status: 404, description: 'Friend request not found' })
  @ApiResponse({ status: 400, description: 'Friend request already exists' })
  async actionFriendRequest(
    @Param('senderId') senderId: string,
    @Body() data: ActionFriendRequestDto,
    @Req() req: RequestWithUser,
  ) {
    // req.user is receiver
    const friendRequest = await this.friendService.findFriendRequest(
      senderId,
      req.user.id,
    );

    if (!friendRequest) {
      throw new NotFoundException('Friend request not found');
    }
    const { action } = data;
    if (action === ActionRequestFriend.ACCEPT) {
      return this.friendService.acceptFriendRequest(senderId, req.user.id);
    } else if (action === ActionRequestFriend.REJECT) {
      return this.friendService.rejectFriendRequest(senderId, req.user.id);
    }
  }
}
