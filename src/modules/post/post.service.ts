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

  async findAll(query: QueryPostDto) {
    const { page, limit, sortOrder } = query;
    const [posts, total] = await this.postRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: sortOrder },
      relations: ['fileAttach', 'owner'],
    });
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
