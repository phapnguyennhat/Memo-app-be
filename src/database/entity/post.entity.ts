import { BaseEntity } from 'src/common/baseEntity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { File } from './file.entity';

@Entity()
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column()
  ownerId: string;

  @Column()
  fileAttachId: string;

  @OneToOne(() => User)
  @JoinColumn()
  owner: User;

  @OneToOne(() => File)
  @JoinColumn()
  fileAttach: File;
}
