import { Injectable } from '@nestjs/common';
import { CreateBlockchainTransactionDto } from './dto/create-blockchain_transaction.dto';
import { UpdateBlockchainTransactionDto } from './dto/update-blockchain_transaction.dto';

@Injectable()
export class BlockchainTransactionService {
  create(createBlockchainTransactionDto: CreateBlockchainTransactionDto) {
    return 'This action adds a new blockchainTransaction';
  }

  findAll() {
    return `This action returns all blockchainTransaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blockchainTransaction`;
  }

  update(id: number, updateBlockchainTransactionDto: UpdateBlockchainTransactionDto) {
    return `This action updates a #${id} blockchainTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} blockchainTransaction`;
  }
}
