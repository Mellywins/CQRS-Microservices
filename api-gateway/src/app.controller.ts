import {
  Controller,
  Get,
  ClassSerializerInterceptor,
  UseInterceptors,
  Inject,
  Post,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('WRITE_USER_SERVICE') private writeUserService: ClientProxy,
  ) {}

  @Post('create')
  async createUser(@Body() createUserPayload: CreateUserDto) {
    return this.writeUserService.emit('create_user', createUserPayload);
  }
  @Post('update')
  async updateUser(@Body() updateUserPayload: UpdateUserDto) {
    return this.writeUserService.emit('update_user', updateUserPayload);
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
