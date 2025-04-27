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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard, SelfGuard)
  async profile(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Post('avatar')
  @UseGuards(JwtAuthGuard, SelfGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile(imageValidatorPipe) file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ) {}
}
