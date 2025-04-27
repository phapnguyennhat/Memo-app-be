import {
  Controller,
  Get,
  Post,
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
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { UserResponse } from './response/user.response';
import { FileService } from '../file/file.service';
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

    const fileEntity = await this.fileService.create(file, 'memo/user/avatar');
    user.avatarId = fileEntity.id;
    await this.userService.update(user.id, user);

    return {
      message: 'Avatar uploaded successfully',
    };
  }
}
