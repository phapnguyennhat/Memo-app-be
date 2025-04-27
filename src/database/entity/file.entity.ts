import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/common/baseEntity';

export enum FileFormat {
  VIDEO = 'video',
  IMAGE = 'image',
}

@Entity()
export class File extends BaseEntity {
  @Column()
  url: string;

  @Column()
  name: string;

  @Column()
  key: string;

  @Column({ type: 'enum', enum: FileFormat })
  format: FileFormat;
}
