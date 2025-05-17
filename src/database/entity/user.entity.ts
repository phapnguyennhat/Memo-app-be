import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/baseEntity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { File } from './file.entity';
import { FriendItem } from './friendItem.entity';
import { FriendRequest } from './friendRequest.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true, nullable: true })
  phoneNumber: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  avatarId: string;

  @OneToOne(() => File, { onDelete: 'SET NULL' })
  @JoinColumn()
  avatar: File;

  @OneToMany(() => FriendItem, (friendItem) => friendItem.user)
  friendItems: FriendItem[];

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.sender)
  requestSent: FriendRequest[];

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.receiver)
  requestReceived: FriendRequest[];
}

export interface IAuthPayload {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
