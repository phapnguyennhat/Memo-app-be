import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/database/entity/post.entity';
import { FileModule } from '../file/file.module';
@Module({
  imports: [TypeOrmModule.forFeature([Post]), FileModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
