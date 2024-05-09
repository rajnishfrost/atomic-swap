import { Module } from '@nestjs/common';
import { BlockchainTransactionService } from './blockchain_transaction.service';
import { BlockchainTransactionController } from './blockchain_transaction.controller';

@Module({
  controllers: [BlockchainTransactionController],
  providers: [BlockchainTransactionService],
})
export class BlockchainTransactionModule {}
