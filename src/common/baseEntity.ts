import { Transform } from 'class-transformer';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as moment from 'moment-timezone';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Transform(({ value }) =>
    value
      ? moment(value).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss')
      : null,
  )
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Transform(({ value }) =>
    value
      ? moment(value).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss')
      : null,
  )
  updatedAt: Date;
}
