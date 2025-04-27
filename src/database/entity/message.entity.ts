import { BaseEntity } from 'src/common/baseEntity';
import { Column, CreateDateColumn, Entity } from 'typeorm';
import { Transform } from 'class-transformer';
import * as moment from 'moment-timezone';

@Entity()
export class Message extends BaseEntity {
  @Column()
  conversationId: string;

  @Column()
  senderId: string;

  @Column('text')
  content: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Transform(({ value }) =>
    value
      ? moment(value).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss')
      : null,
  )
  createdAt: Date;
}
