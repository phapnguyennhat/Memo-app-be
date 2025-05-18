import { BaseEntity } from 'src/common/baseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Message extends BaseEntity {
  @Column()
  senderId: string;

  @Column()
  receiverId: string;

  @Column('text')
  content: string;

  @ManyToOne(() => User)
  sender: User;

  @ManyToOne(() => User)
  receiver: User;
}
