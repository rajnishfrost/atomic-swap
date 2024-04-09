import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { UserCredentialService } from './user_credential.service';
import { CreateUserCredentialDto, loginUserDto } from './dto/create-user_credential.dto';
import { Request, Response } from 'express';
import { loginPipe } from './user_credential.pipe';
import * as bcrypt from 'bcrypt';

@Controller('/user')
export class UserCredentialController {
  constructor(
    private readonly userCredentialService: UserCredentialService,
  ) { }

  @Post('/signup')
  signUp(
    @Res() res: Response,
    @Body() createUserCredentialDto: CreateUserCredentialDto,
  ) {
    const salt = bcrypt.genSaltSync(1);
    const hash = bcrypt.hashSync(createUserCredentialDto.password, salt);
    createUserCredentialDto.password = hash;
    this.userCredentialService.save(createUserCredentialDto)
    return res.status(200).send({ data: "data saved successfully" })
  }

  @Post('/login')
  async logIn(
    @Res() res: Response,
    @Body(new loginPipe()) loginUserDto: loginUserDto,
  ) {
    const user = await this.userCredentialService.find({ email: loginUserDto.email });
    const check: boolean = await bcrypt.compare(loginUserDto.password, user[0].password);
    if (check)
      return res.status(200).send({ message: 'Login Succesfully' });
    return res.status(200).send({message : "Password Not Match"  });
  }

}
