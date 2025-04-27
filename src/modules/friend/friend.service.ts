import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendRequest } from 'src/database/entity/friendRequest.entity';
import { PairFriend } from 'src/database/entity/pairFriend.entity';
import { FriendRequestDataDto } from './dto/createFriendRequest.dto';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepo: Repository<FriendRequest>,
    @InjectRepository(PairFriend)
    private readonly pairFriendRepo: Repository<PairFriend>,
  ) {}

  async createFriendRequest(data: FriendRequestDataDto) {
    const friendRequest = await this.findFriendRequest(
      data.senderId,
      data.receiverId,
    );

    if (friendRequest) {
      throw new BadRequestException('Friend request already exists');
    }

    const newFriendRequest = this.friendRequestRepo.create(data);
    await this.friendRequestRepo.save(newFriendRequest);
    return newFriendRequest;
  }

  async findFriendRequest(senderId: string, receiverId: string) {
    return this.friendRequestRepo.findOne({
      where: { senderId, receiverId },
    });
  }

  async deleteFriendRequest(senderId: string, receiverId: string) {
    return this.friendRequestRepo.delete({ senderId, receiverId });
  }

  async isBeFriend(senderId: string, receiverId: string) {
    const pairFriend = await this.pairFriendRepo.findOneBy([
      { user1Id: senderId, user2Id: receiverId },
      { user1Id: receiverId, user2Id: senderId },
    ]);
    return pairFriend ? true : false;
  }

  async acceptFriendRequest(senderId: string, receiverId: string) {
    const isBeFriend = await this.isBeFriend(senderId, receiverId);
    if (isBeFriend) {
      throw new BadRequestException('Friend request already exists');
    }
    await this.deleteFriendRequest(senderId, receiverId);
    const pairFriend = this.pairFriendRepo.create({
      user1Id: senderId,
      user2Id: receiverId,
    });
    await this.pairFriendRepo.save(pairFriend);
    return {
      message: 'Friend request accepted',
    };
  }

  async rejectFriendRequest(senderId: string, receiverId: string) {
    await this.deleteFriendRequest(senderId, receiverId);
    return {
      message: 'Friend request rejected',
    };
  }
}
