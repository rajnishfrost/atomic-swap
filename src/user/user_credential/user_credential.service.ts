import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserCredentialService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

   save(data) {
    return new this.userModel(data).save();
  }

  find(data){
    return this.userModel.find(data)
  }

  async findOneAndUpdate(key, data) {
    return this.userModel.findOneAndUpdate(key, data, { new: true });
  }
}
