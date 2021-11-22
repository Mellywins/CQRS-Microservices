import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('create_user')
  create(createUserDto: CreateUserDto) {
    return this.appService.create(createUserDto);
  }

  @EventPattern('update_user')
  update(updateUserDto: UpdateUserDto) {
    return this.appService.update(updateUserDto);
  }
}
