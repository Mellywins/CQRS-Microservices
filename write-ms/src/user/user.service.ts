import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
// const mongoose = require('mongoose');
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  create(createUserDto: CreateUserDto) {
    return new this.userModel(createUserDto).save();
  }

  async update(updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate(
      { email: updateUserDto.email },
      updateUserDto,
    );
  }
}
