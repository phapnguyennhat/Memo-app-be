import { BaseEntity } from 'src/common/baseEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { File } from './file.entity';

@Entity()
export class Post extends BaseEntity {
  @Column({ nullable: true })
  title: string;

  @Column()
  ownerId: string;

  @Column()
  fileAttachId: string;

  @ManyToOne(() => User)
  @JoinColumn()
  owner: User;

  @OneToOne(() => File, { onDelete: 'SET NULL' })
  @JoinColumn()
  fileAttach: File;
}
