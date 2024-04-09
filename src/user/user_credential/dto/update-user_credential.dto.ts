import { PartialType } from '@nestjs/mapped-types';
import { CreateUserCredentialDto } from './create-user_credential.dto';

export class UpdateUserCredentialDto extends PartialType(CreateUserCredentialDto) {}
