import { Module } from '@nestjs/common';
import { UserCredentialService } from './user_credential.service';
import { UserCredentialController } from './user_credential.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './user.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: {
          expiresIn: process.env.TIME,
        },
      }),
    })
  ] ,
  controllers: [UserCredentialController],
  providers: [UserCredentialService],
})
export class UserCredentialModule {

}
