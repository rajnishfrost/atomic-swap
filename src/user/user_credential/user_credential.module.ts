import { Module } from '@nestjs/common';
import { UserCredentialService } from './user_credential.service';
import { UserCredentialController } from './user_credential.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './user.model';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ] ,
  controllers: [UserCredentialController],
  providers: [UserCredentialService],
})
export class UserCredentialModule {}
