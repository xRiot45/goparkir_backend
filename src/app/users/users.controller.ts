import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async registerController(@Body() req: any) {
    return this.usersService.register(req);
  }

  @Post('/login')
  async loginController(@Body() req: any) {
    return this.usersService.login(req);
  }

  @Get('/all')
  async findAllUsersController() {
    return this.usersService.findAllUsers();
  }
}
