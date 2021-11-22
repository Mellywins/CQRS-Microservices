import { Body, Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { User } from './entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    // this.appService.fakeUsers();
  }

  @MessagePattern('read_all_users')
  async getAllUsers(): Promise<User[]> {
    return this.appService.findAll();
  }
  @MessagePattern('read_user_by_email')
  async getUserByEmail(email: string): Promise<User> {
    return this.appService.findUserByEmail(email);
  }
}
