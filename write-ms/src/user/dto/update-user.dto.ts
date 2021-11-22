import { PartialType } from '@nestjs/mapped-types';
import { ObjectId } from 'mongoose';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  _id?: ObjectId;
}
