import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { loginUserDto } from "./dto/create-user_credential.dto";
import { validate } from "class-validator";

export class loginPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
      const userClass = plainToInstance(loginUserDto, value);
      const error = await validate(userClass);
      if (error.length > 0) {
        throw new BadRequestException(
          'validation failed' + JSON.stringify(error),
        );
      }
      return value;
    }
  }