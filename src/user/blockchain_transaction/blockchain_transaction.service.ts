import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Network, NetworkDocument } from './network.model';
import { Model } from 'mongoose';

@Injectable()
export class BlockchainTransactionService {

  constructor(
    @InjectModel(Network.name) private networkModel : Model<NetworkDocument>,
  ){}

  save(data) {
    return new this.networkModel(data).save();
  }

  find(data){
    return this.networkModel.find(data)
  }

  async findOneAndUpdate(key, data) {
    return this.networkModel.findOneAndUpdate(key, data, { new: true });
  }

}
