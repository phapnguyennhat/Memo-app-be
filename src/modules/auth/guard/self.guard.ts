// Kiểm tra xem người dùng có phải là chính mình không

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class SelfGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.userService.findById(request.user.id);

    if (!user) {
      throw new UnauthorizedException(
        'Bạn không có quyền truy cập vào tài nguyên này',
      );
    }

    return true;
  }
}

export default SelfGuard;
