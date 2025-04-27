import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import RequestWithUser from 'src/common/requestWithUser.interface';
import JwtAuthGuard from '../auth/guard/jwt-auth.guard';
import SelfGuard from '../auth/guard/self.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard, SelfGuard)
  async profile(@Req() req: RequestWithUser) {
    return req.user;
  }
}
