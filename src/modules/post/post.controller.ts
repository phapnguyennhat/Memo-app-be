import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { DataSource } from 'typeorm';
import { CreatePostDto } from './dto/createPost.dto';
import { FileService } from '../file/file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import imageValidatorPipe from 'src/pipe/image-validatorPipe';
import RequestWithUser from 'src/common/requestWithUser.interface';
import JwtAuthGuard from '../auth/guard/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiConsumes } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';
import { ApiQuery } from '@nestjs/swagger';
import { QueryPostDto } from './dto/queryPost.dto';
import { PostResponse } from './response/post.response';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly dataSource: DataSource,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Create a new post' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        file: { type: 'string', format: 'binary' },
      },
      required: ['file'],
    },
  })
  async create(
    @Body() data: CreatePostDto,
    @UploadedFile(imageValidatorPipe) file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ) {
    let fileEntity = undefined;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      fileEntity = await this.fileService.create(file, 'memo/post');
      const post = await this.postService.create(
        { ...data, ownerId: req.user.id, fileAttachId: fileEntity.id },
        queryRunner,
      );

      await queryRunner.commitTransaction();
      return post;
    } catch (error) {
      if (fileEntity) {
        await this.fileService.deleteFile(fileEntity.id);
      }
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @Req() req: RequestWithUser) {
    const post = await this.postService.findById(id);
    if (post.ownerId !== req.user.id) {
      throw new ForbiddenException('You are not allowed to delete this post');
    }
    await this.postService.delete(id);
    await this.fileService.deleteFile(post.fileAttachId);
    return {
      message: 'Post deleted successfully',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiQuery({ type: QueryPostDto })
  @ApiResponse({
    status: 200,
    description: 'Get all posts successfully',
    type: [PostResponse],
  })
  async findAll(@Query() query: QueryPostDto) {
    return this.postService.findAll(query);
  }
}
