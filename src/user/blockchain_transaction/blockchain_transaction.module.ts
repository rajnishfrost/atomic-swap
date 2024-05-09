import { Module } from '@nestjs/common';
import { BlockchainTransactionService } from './blockchain_transaction.service';
import { BlockchainTransactionController } from './blockchain_transaction.controller';
import { Network, networkSchema } from './network.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Network.name, schema: networkSchema }]),
  ],
  controllers: [BlockchainTransactionController],
  providers: [BlockchainTransactionService],
})
export class BlockchainTransactionModule { }
