import { PartialType } from '@nestjs/mapped-types';
import { CreateBlockchainTransactionDto } from './create-blockchain_transaction.dto';

export class UpdateBlockchainTransactionDto extends PartialType(CreateBlockchainTransactionDto) {}
