import {
  Controller,
  Get,
  ClassSerializerInterceptor,
  UseInterceptors,
  Inject,
  Post,
  Body,
  Res,
  HttpStatus,
  BadRequestException,
  Logger,
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
  async createUser(@Body() createUserPayload: CreateUserDto, @Res() response) {
    let err: Error;
    this.writeUserService.emit('create_user', createUserPayload).subscribe({
      error: (e) => {
        err = e;
      },
      complete: () => {
        Logger.log(
          `Successfully pushed a create_user event for user: ${createUserPayload.username} `,
          'User Creation',
        );
      },
    });
    if (!err) {
      response.status(HttpStatus.CREATED).send('Entity Created!');
      return;
    } else throw new BadRequestException('Bad Request');
  }
  @Post('update')
  async updateUser(@Body() updateUserPayload: UpdateUserDto, @Res() response) {
    let err: Error;
    this.writeUserService.emit('update_user', updateUserPayload).subscribe({
      error: (e) => {
        err = e;
      },
      complete: () => {
        Logger.log(
          `Successfully pushed an update_user event for user: ${updateUserPayload.username} `,
          'User Update',
        );
      },
    });
    if (!err) {
      response.status(HttpStatus.ACCEPTED).send('Entity updated!');
      return;
    } else throw new BadRequestException('Bad Request');
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
