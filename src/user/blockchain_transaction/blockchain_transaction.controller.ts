import { Controller, Get, Post, Body, UseGuards, Res, BadRequestException , Req} from '@nestjs/common';
import { BlockchainTransactionService } from './blockchain_transaction.service';
import { Response } from 'express';
import { newContract, withdrawal, refund, getEvents, getEventsByBlockNumber, getContract } from "../../../Blockchain/Polygon/web3.js"
import { AddNetwork } from './dto/network.dto';
import { UserGuard } from '../user_credential/user_auth.gaurd';

@Controller('blockchain-transaction')
export class BlockchainTransactionController {
  constructor(private readonly blockchainTransactionService: BlockchainTransactionService) { }

  @UseGuards(UserGuard)
  @Post('/new-contract')
  async newContract(
    @Res() res: Response,
    @Body() body,
    @Req() req : any
  ) {
    try {
      const { from, to, pass, time, pk, rpc, chainID, coins, email } = body;
      const contract_data = await newContract(from, to, pass, time, pk, rpc, chainID, coins);
      this.blockchainTransactionService.saveTransaction({email , transaction : contract_data});
      const transaction = await getEventsByBlockNumber(contract_data.blockNumber, chainID, rpc);
      return res.status(200).send(transaction);
    } catch (error) {
      if (error instanceof Error && error.message.includes("revert")) {
        console.log(error);
        return res.status(400).send(error);
      } else {
        console.log(error);
        throw new BadRequestException('Oops, something went wrong', {
          cause: new Error(),
        });
      }
    }
  }

  @Post('/withdraw')
  async withdraw(
    @Res() res: Response,
    @Body() body,
  ) {
    try {
      const { contractID, secret, from, pk, chainID , rpc} = body;
      const transaction = await withdrawal(contractID, secret, from, pk, chainID)
      return res.status(200).send(transaction);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Oops, something went wrong', {
        cause: new Error(),
      });
    }
  }

  @Post('/refund')
  async refund(
    @Res() res: Response,
    @Body() body,
  ) {
    try {
      const { contractID, from, pk, chainID } = body;
      const log = await refund(contractID, from, pk, chainID)
      const transaction = await getEvents(chainID);
      return res.status(200).send(transaction);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Oops, something went wrong', {
        cause: new Error(),
      });
    }
  }

  @Post('/get-event-by-Block')
  async getEvent(
    @Res() res: Response,
    @Body() body,
  ) {
    try {
      const { bn, chainID, rpc } = body;
      const transaction = await getEventsByBlockNumber(bn, chainID, rpc);
      return res.status(200).send(transaction);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Oops, something went wrong', {
        cause: new Error(),
      });
    }
  }

  @Post('/get-contract')
  async getContract(
    @Res() res: Response,
    @Body() body,
  ) {
    try {
      const { chainID, contract_address, from } = body;
      const transaction = await getContract(chainID, contract_address, from);
      return res.status(200).send(transaction);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Oops, something went wrong', {
        cause: new Error(),
      });
    }
  }

  @Post('/network')
  async addNetwork(
    @Res() res: Response,
    @Body() addNetwork: AddNetwork,
  ) {
    try {
      const network = await this.blockchainTransactionService.find({ name: { $regex: new RegExp(addNetwork.name, 'i') } });
      if (network.length > 0)
        return res.status(401).send({ message: "network already exist" });
      this.blockchainTransactionService.save(addNetwork);
      return res.status(200).send({ data: "network add successfully" });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Oops, something went wrong', {
        cause: new Error(),
      });
    }
  }

  @Get('/network')
  async getAllNetwork(
    @Res() res: Response,
  ) {
    try {
      const network = await this.blockchainTransactionService.find({});
      return res.status(200).send({ message: 'fetch successfully', data: network });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Oops, something went wrong', {
        cause: new Error(),
      });
    }
  }
}
