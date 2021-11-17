import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
  ) {}

  public async searchUser(params: { email: string }): Promise<IUser[]> {
    return this.userModel.find(params).exec();
  }

  public async searchUserById(id: string): Promise<IUser> {
    return this.userModel.findById(id).exec();
  }

  public async updateUserById(
    id: string,
    userParams: { is_confirmed: boolean },
  ): Promise<any> {        
    return this.userModel.updateOne({ _id: id }, userParams).exec();
  }

  public async createUser(user: IUser): Promise<IUser> {
    const userModel = new this.userModel(user);
    return await userModel.save();
  }

}