import { BaseEntity } from 'src/common/baseEntity';
import { Check, Column, Entity, ManyToOne, Unique } from 'typeorm';
import { User } from './user.entity';

@Entity()
@Unique(['userId', 'friendId'])
@Check(`"userId" != "friendId"`)
export class FriendItem extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  friendId: string;

  @ManyToOne(() => User)
  friend: User;
}
