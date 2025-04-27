import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from 'src/database/entity/friendRequest.entity';
import { PairFriend } from 'src/database/entity/pairFriend.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequest, PairFriend])],
  controllers: [FriendController],
  providers: [FriendService],
})
export class FriendModule {}
