import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/baseEntity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { File } from './file.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  avatarId: string;

  @OneToOne(() => File)
  @JoinColumn()
  avatar: File;
}

export interface IAuthPayload {
  userId: string;
  username: string;
  email: string;
}
