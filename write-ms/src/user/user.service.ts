import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
// const mongoose = require('mongoose');
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    // console.log('ho ho ho');
    // this.create({
    //   username: 'Ahmed',
    //   password: 'pass123',
    //   email: 'zouaghi@test.com',
    // })
    //   .then((e) => console.log)
    //   .catch((err) => console.error);
    // this.update(mongoose.Types.ObjectId('619bbdd5c93e64228b092262'), {
    //   password: 'pass456',
    // }).then((e) => console.log);
  }
  create(createUserDto: CreateUserDto) {
    return new this.userModel(createUserDto).save();
  }

  async update(updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate(
      { email: updateUserDto.email },
      updateUserDto,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
