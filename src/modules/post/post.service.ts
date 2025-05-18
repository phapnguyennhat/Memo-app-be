import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Post } from 'src/database/entity/post.entity';
import { PostDataDto } from './dto/createPost.dto';
import { QueryPostDto } from './dto/queryPost.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
  ) {}

  async create(data: PostDataDto, queryRunner: QueryRunner) {
    const post = this.postRepo.create(data);
    await queryRunner.manager.save(post);
    return post;
  }

  async findById(id: string) {
    const post = await this.postRepo.findOneBy({ id });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async findAll(userId: string, query: QueryPostDto) {
    const { page, limit, sortOrder } = query;
    const queryBuilder = this.postRepo
      .createQueryBuilder('post')
      .select([
        'post.id',
        'post.title',
        'post.createdAt',
        'fileAttach.url',
        'owner',
        'avatar.url',
      ])
      .innerJoin('post.owner', 'owner')
      .innerJoin('owner.friendItems', 'friendItems')
      .leftJoin('owner.avatar', 'avatar')
      .innerJoin('post.fileAttach', 'fileAttach')
      .where('friendItems.friendId = :userId OR owner.id = :userId', { userId })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('post.createdAt', sortOrder);

    const [posts, total] = await queryBuilder.getManyAndCount();
    const numPage = Math.ceil(total / limit);

    if (page + 1 > numPage) {
      return { data: posts, currentPage: page, nextPage: null, total };
    }
    return { data: posts, currentPage: page, nextPage: page + 1, total };
  }

  async delete(id: string) {
    return this.postRepo.delete(id);
  }
}
