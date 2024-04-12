import { Module } from '@nestjs/common';
import { UserCredentialModule } from './user/user_credential/user_credential.module';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from "@nestjs/config"
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: process.env.MONGO_URI,
        monitorCommands: true,
      }),
      inject: [ConfigService],
    }),
    UserCredentialModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  
}
