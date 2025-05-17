import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from 'src/database/entity/friendRequest.entity';
import { FriendItem } from 'src/database/entity/friendItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequest, FriendItem])],
  controllers: [FriendController],
  providers: [FriendService],
})
export class FriendModule {}
