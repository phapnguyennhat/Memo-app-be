import {
  Check,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Transform } from 'class-transformer';
import * as moment from 'moment-timezone';

@Entity()
@Check(`"senderId" != "receiverId"`)
export class FriendRequest {
  @PrimaryColumn()
  senderId: string;

  @PrimaryColumn()
  receiverId: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Transform(({ value }) =>
    value
      ? moment(value).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss')
      : null,
  )
  createdAt: Date;

  @ManyToOne(() => User)
  sender: User;

  @ManyToOne(() => User)
  receiver: User;
}
