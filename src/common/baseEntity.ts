import { Transform } from "class-transformer";
import {  CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as moment from 'moment-timezone';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  @Transform(({ value }) => moment(value).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss'))
  createAt: Date;
  
  @UpdateDateColumn()
  @Transform(({ value }) => moment(value).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss'))
  updateAt: Date;
}
