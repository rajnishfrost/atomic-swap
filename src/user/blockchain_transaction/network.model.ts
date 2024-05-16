import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type NetworkDocument = Network & Document;

@Schema({timestamps: true})
export class Network {
    @Prop()
    name: string;
    
    @Prop()
    explorer: string;

    @Prop()
    chainID: number;

    @Prop()
    rpc: string;
}

export const networkSchema = SchemaFactory.createForClass(Network);