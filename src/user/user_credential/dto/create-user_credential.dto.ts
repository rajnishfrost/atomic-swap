import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateUserCredentialDto {
    @IsNotEmpty()
    @IsString()
    @Matches(/^[^\s]+$/, { message: 'Spaces are not allowed firstname' })
    firstname: string;
  
    @IsNotEmpty()
    @IsString()
    @Matches(/^[^\s]+$/, { message: 'Spaces are not allowed lastname' })
    lastname: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/,
      {
        message:
          'Password must contain at least one lowercase letter, one uppercase letter, one digit or symbol, and be at least 8 characters long',
      },
    )
    password: string;
}

export class loginUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
