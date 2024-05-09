import { Test, TestingModule } from '@nestjs/testing';
import { BlockchainTransactionController } from './blockchain_transaction.controller';
import { BlockchainTransactionService } from './blockchain_transaction.service';

describe('BlockchainTransactionController', () => {
  let controller: BlockchainTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockchainTransactionController],
      providers: [BlockchainTransactionService],
    }).compile();

    controller = module.get<BlockchainTransactionController>(BlockchainTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
