import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import RequestWithUser from 'src/common/requestWithUser.interface';
import JwtAuthGuard from '../auth/guard/jwt-auth.guard';
import SelfGuard from '../auth/guard/self.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import imageValidatorPipe from 'src/pipe/image-validatorPipe';
import { ApiBody, ApiConsumes, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { UserResponse } from './response/user.response';
import { FileService } from '../file/file.service';
import { QueryUserDto } from './dto/query-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService,
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({
    status: 200,
    description: 'Get current user successfully',
    type: UserResponse,
  })
  async profile(@Req() req: RequestWithUser) {
    return this.userService.getMe(req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get User by keyword' })
  @ApiResponse({
    status: 200,
    description: 'Find User by keyword successfully',
    type: UserResponse,
  })
  @ApiQuery({
    name: 'keyword',
    type: String,
    required: false,
    description: 'Keyword to search for',
  })
  async findUser(@Req() req: RequestWithUser, @Query() query: QueryUserDto) {
    return this.userService.findUser(req.user.id, query);
  }

  @Post('avatar')
  @UseGuards(JwtAuthGuard, SelfGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload avatar' })
  @ApiResponse({
    status: 200,
    description: 'Upload avatar successfully',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload avatar file',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Avatar image file',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Avatar uploaded successfully',
  })
  async uploadAvatar(
    @UploadedFile(imageValidatorPipe) file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ) {
    const user = await this.userService.getMe(req.user.id);

    if (user.avatarId) {
      await this.fileService.deleteFile(user.avatarId);
    }

    const fileEntity = await this.fileService.create(file, 'memo/user');
    user.avatarId = fileEntity.id;
    await this.userService.update(user.id, { avatarId: fileEntity.id });

    return {
      message: 'Avatar uploaded successfully',
    };
  }

  @Put('me')
  @UseGuards(JwtAuthGuard, SelfGuard)
  @ApiOperation({ summary: 'Update current user' })
  @ApiResponse({
    status: 200,
    description: 'Update current user successfully',
  })
  async updateUser(
    @Req() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (updateUserDto.email) {
      const user = await this.userService.findByEmail(updateUserDto.email);
      if (user) {
        throw new BadRequestException('Email đã có người sử dụng');
      }
    }
    if (updateUserDto.phoneNumber) {
      const user = await this.userService.findByPhoneNumber(
        updateUserDto.phoneNumber,
      );
      if (user) {
        throw new BadRequestException('Số điện thoại đã có người sử dụng');
      }
    }
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return this.userService.update(req.user.id, updateUserDto);
  }
}
