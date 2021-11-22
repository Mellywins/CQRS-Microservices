import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @EventPattern('create_user')
  create(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @EventPattern('update_user')
  update(updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }
}
