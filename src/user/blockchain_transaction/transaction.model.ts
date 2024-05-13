import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;


@Schema({timestamps: true})
export class Transaction {
    @Prop()
    email: string;

    @Prop({ type: Object })
    transaction: object;
}

export const transactionSchema = SchemaFactory.createForClass(Transaction);