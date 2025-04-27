import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PairFriend {
  @PrimaryColumn()
  user1Id: string;

  @PrimaryColumn()
  user2Id: string;

  @ManyToOne(() => User)
  user1: User;

  @ManyToOne(() => User)
  user2: User;
}
