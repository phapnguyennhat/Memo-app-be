import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
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
import { QueryFriendRequestDto } from './dto/queryFriendRequest.dto';
import { QueryFriendDto } from './dto/queryFriend.dto';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post('request')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create friend request' })
  @ApiBody({ type: CreateFriendRequestDto })
  @ApiResponse({ status: 200, description: 'Friend request created' })
  @ApiResponse({ status: 400, description: 'You are already friends' })
  async createFriendRequest(
    @Body() data: CreateFriendRequestDto,
    @Req() req: RequestWithUser,
  ) {
    const friendRequest = await this.friendService.findFriendRequest(
      req.user.id,
      data.receiverId,
    );
    if (friendRequest) {
      return this.friendService.updateFriendRequest(friendRequest);
    }
    return this.friendService.createFriendRequest({
      ...data,
      senderId: req.user.id,
    });
  }

  @Post('request/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Action friend request' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: ActionFriendRequestDto })
  @ApiResponse({ status: 200, description: 'Friend request accepted' })
  @ApiResponse({ status: 200, description: 'Friend request rejected' })
  @ApiResponse({ status: 404, description: 'Friend request not found' })
  @ApiResponse({ status: 400, description: 'Friend request already exists' })
  async actionFriendRequest(
    @Param('id') id: string,
    @Body() data: ActionFriendRequestDto,
    @Req() req: RequestWithUser,
  ) {
    // req.user is receiver
    const friendRequest = await this.friendService.getFriendByIdAndUserId(
      id,
      req.user.id,
    );

    const { action } = data;
    if (action === ActionRequestFriend.ACCEPT) {
      return this.friendService.acceptFriendRequest(friendRequest);
    } else if (action === ActionRequestFriend.REJECT) {
      return this.friendService.rejectFriendRequest(friendRequest);
    }
  }

  @Get('request')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get friend request received or sent' })
  async getFriendRequest(
    @Req() req: RequestWithUser,
    @Query() query: QueryFriendRequestDto,
  ) {
    return this.friendService.getFriendRequest(req.user.id, query);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get friend list' })
  @ApiResponse({ status: 200, description: 'Friend list retrieved' })
  @ApiResponse({ status: 400, description: 'Invalid query parameters' })
  async getFriendList(
    @Req() req: RequestWithUser,
    @Query() query: QueryFriendDto,
  ) {
    return this.friendService.getMyFriend(req.user.id, query);
  }
}
