import { Module } from '@nestjs/common';
import { BlockchainTransactionService } from './blockchain_transaction.service';
import { BlockchainTransactionController } from './blockchain_transaction.controller';
import { Network, networkSchema } from './network.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, transactionSchema } from './transaction.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Network.name, schema: networkSchema }]),
    MongooseModule.forFeature([{ name: Transaction.name, schema: transactionSchema }]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: {
          expiresIn: process.env.TIME,
        },
      }),
    }),
  ],
  controllers: [BlockchainTransactionController],
  providers: [BlockchainTransactionService],
})
export class BlockchainTransactionModule { }
