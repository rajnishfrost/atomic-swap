import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlockchainTransactionService } from './blockchain_transaction.service';
import { CreateBlockchainTransactionDto } from './dto/create-blockchain_transaction.dto';
import { UpdateBlockchainTransactionDto } from './dto/update-blockchain_transaction.dto';

@Controller('blockchain-transaction')
export class BlockchainTransactionController {
  constructor(private readonly blockchainTransactionService: BlockchainTransactionService) {}

  @Post()
  create(@Body() createBlockchainTransactionDto: CreateBlockchainTransactionDto) {
    return this.blockchainTransactionService.create(createBlockchainTransactionDto);
  }

  @Get()
  findAll() {
    return this.blockchainTransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blockchainTransactionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlockchainTransactionDto: UpdateBlockchainTransactionDto) {
    return this.blockchainTransactionService.update(+id, updateBlockchainTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blockchainTransactionService.remove(+id);
  }
}
