import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Image, ImageDocument, User, UserDocument } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserCredentialService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
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

  saveImage(data) {
    return new this.imageModel(data).save();
  }

  findImage(data){
    return this.imageModel.find(data)
  }

  async findOneAndUpdateImage(key, data) {
    return this.imageModel.findOneAndUpdate(key, data, { new: true });
  }
}
