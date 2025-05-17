import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FriendRequest } from 'src/database/entity/friendRequest.entity';
import { FriendItem } from 'src/database/entity/friendItem.entity';

import { FriendRequestDataDto } from './dto/createFriendRequest.dto';
import { QueryFriendRequestDto } from './dto/queryFriendRequest.dto';
import { EFriendRequestCollection } from './dto/queryFriendRequest.dto';
import { QueryFriendDto } from './dto/queryFriend.dto';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepo: Repository<FriendRequest>,
    @InjectRepository(FriendItem)
    private readonly friendItemRepo: Repository<FriendItem>,
    private readonly dataSource: DataSource,
  ) {}

  async createFriendRequest(data: FriendRequestDataDto) {
    const isBeFriend = await this.isBeFriend(data.senderId, data.receiverId);
    if (isBeFriend) {
      throw new BadRequestException('You are already friends');
    }
    const friendRequestReverse =
      await this.findFriendRequestBySenderIdAndReceiverId(
        data.receiverId,
        data.senderId,
      );
    if (friendRequestReverse) {
      throw new BadRequestException('This user has sent you a friend request');
    }
    const newFriendRequest = this.friendRequestRepo.create(data);
    await this.friendRequestRepo.save(newFriendRequest);
    return newFriendRequest;
  }

  async updateFriendRequest(friendRequest: FriendRequest) {
    return this.friendRequestRepo.save(friendRequest);
  }

  async findFriendRequest(senderId: string, receiverId: string) {
    return this.friendRequestRepo.findOne({
      where: { senderId, receiverId },
    });
  }

  async deleteFriendRequest(id: string) {
    return this.friendRequestRepo.delete(id);
  }

  private async isBeFriend(senderId: string, receiverId: string) {
    const friendItem = await this.friendItemRepo.findOneBy([
      { userId: senderId, friendId: receiverId },
      { userId: receiverId, friendId: senderId },
    ]);
    return friendItem ? true : false;
  }

  async findFriendRequestBySenderIdAndReceiverId(
    senderId: string,
    receiverId: string,
  ) {
    return this.friendRequestRepo.findOneBy({ senderId, receiverId });
  }

  async acceptFriendRequest(friendRequest: FriendRequest) {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      await queryRunner.manager.save(FriendItem, {
        userId: friendRequest.senderId,
        friendId: friendRequest.receiverId,
      });
      await queryRunner.manager.save(FriendItem, {
        userId: friendRequest.receiverId,
        friendId: friendRequest.senderId,
      });
      await queryRunner.manager.delete(FriendRequest, {
        id: friendRequest.id,
      });

      await queryRunner.commitTransaction();
      return { message: 'Accept  friend request successfully' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async rejectFriendRequest(friendRequest: FriendRequest) {
    await this.deleteFriendRequest(friendRequest.id);
    return {
      message: 'Friend request rejected',
    };
  }

  async getFriendRequest(userId: string, query: QueryFriendRequestDto) {
    const { page = 1, limit = 10, collection } = query;

    const queryBuilder = this.friendRequestRepo
      .createQueryBuilder('friendRequest')
      .orderBy('friendRequest.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (collection === EFriendRequestCollection.REQUESTRECEIVED) {
      queryBuilder
        .innerJoin('friendRequest.sender', 'sender')
        .leftJoin('sender.avatar', 'avatar')
        .andWhere('friendRequest.receiverId=:userId', { userId })
        .select([
          'friendRequest.id',
          'sender',
          'avatar.url',
          'friendRequest.createdAt',
        ]);
    } else if (collection === EFriendRequestCollection.REQUESTSENT) {
      queryBuilder
        .innerJoin('friendRequest.receiver', 'receiver')
        .leftJoin('receiver.avatar', 'avatar')
        .andWhere('friendRequest.senderId=:userId', { userId })
        .select([
          'friendRequest.id',
          'receiver',
          'avatar.url',
          'friendRequest.createdAt',
        ]);
    }

    const [data, count] = await queryBuilder.getManyAndCount();
    const numPage = Math.ceil(count / limit);
    if (page + 1 > numPage) {
      return { data, currentPage: page, nextPage: null, count };
    }
    return { data, currentPage: page, nextPage: page + 1, count };
  }

  async getMyFriend(userId: string, query: QueryFriendDto) {
    const { page = 1, limit = 10, keyword = '' } = query;
    const queryBuilder = this.friendItemRepo
      .createQueryBuilder('friendItem')
      .andWhere('friendItem.userId=:userId', { userId })
      .innerJoin('friendItem.friend', 'friend')
      .leftJoin('friend.avatar', 'avatar')
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('friend.username', 'ASC')
      .select([
        'friendItem.id',
        'friend.username',
        'friend.id',
        'avatar.url',
        'friend.email',
      ]);

    if (keyword) {
      queryBuilder.andWhere(
        '(friend.username ILIKE :keyword OR friend.email ILIKE :keyword)',
        {
          keyword: `%${keyword}%`,
        },
      );
    }

    const [data, count] = await queryBuilder.getManyAndCount();
    const numPage = Math.ceil(count / limit);
    if (page + 1 > numPage) {
      return { data, currentPage: page, nextPage: null, count };
    }
    return { data, currentPage: page, nextPage: page + 1, count };
  }

  public async getFriendByIdAndUserId(id: string, userId: string) {
    const friend = await this.friendRequestRepo.findOne({
      where: { id, receiverId: userId },
    });
    if (!friend) {
      throw new NotFoundException('Không tìm thấy lời mời kết bạn');
    }
    return friend;
  }
}
