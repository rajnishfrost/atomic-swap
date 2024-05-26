import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop()
    firstname: string;

    @Prop()
    lastname: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ type: Boolean, default: false })
    email_verified: boolean

    @Prop({ type: String, default: '' })
    profileImageUrl?: string;
}

export const userSchema = SchemaFactory.createForClass(User);


export type ImageDocument = Image & Document;

@Schema({ timestamps: true })
export class Image {
    @Prop({ type: [String] })
    image: string[];
}

export const imageSchema = SchemaFactory.createForClass(Image);