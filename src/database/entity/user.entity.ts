import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/baseEntity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { File } from './file.entity';

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
}

export interface IAuthPayload {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
