import { Test, TestingModule } from '@nestjs/testing';
import { BlockchainTransactionService } from './blockchain_transaction.service';

describe('BlockchainTransactionService', () => {
  let service: BlockchainTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlockchainTransactionService],
    }).compile();

    service = module.get<BlockchainTransactionService>(BlockchainTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
