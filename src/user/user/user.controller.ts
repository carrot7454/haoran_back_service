import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('list')
  getUserList(@Body() body: { page: number; size: number }) {
    const { page, size } = body;
    return this.userService.getUserList(page, size);
  }
}
