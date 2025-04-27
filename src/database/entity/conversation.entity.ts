import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/common/baseEntity';

export enum ConversationType {
  GROUP = 'group',
  PRIVATE = 'private',
}

@Entity()
export class Conversation extends BaseEntity {
  @Column()
  name: string;

  @Column()
  type: ConversationType;
}
