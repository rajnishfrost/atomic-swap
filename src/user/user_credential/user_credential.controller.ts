import { Controller, Post, Body, Res, Req, Get, Param, BadRequestException } from '@nestjs/common';
import { UserCredentialService } from './user_credential.service';
import { CreateUserCredentialDto, loginUserDto } from './dto/create-user_credential.dto';
import { Request, Response } from 'express';
import { loginPipe } from './user_credential.pipe';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailSender } from 'src/utils/MailSender';
import email_verification from 'src/utils/email_templates/email_verification';

@Controller('/user')
export class UserCredentialController {
  constructor(
    private readonly userCredentialService: UserCredentialService,
    private jwtService: JwtService,
  ) { }
  private mailSender = new MailSender();

  @Post('/signup')
  async signUp(
    @Res() res: Response,
    @Body() createUserCredentialDto: CreateUserCredentialDto,
  ) {
    try {
      const user = await this.userCredentialService.find({ email: createUserCredentialDto.email });
      if (user.length > 0)
        return res.status(401).send({ message: "email already exist" })
      const salt = bcrypt.genSaltSync(1);
      const hash = bcrypt.hashSync(createUserCredentialDto.password, salt);
      createUserCredentialDto.password = hash;
      this.userCredentialService.save(createUserCredentialDto);
      this.mailSender.EmailSend(createUserCredentialDto.email, `verify your email id`, email_verification(`${process.env.CURRENT_BASE_URL}user/verify-email/${this.jwtService.sign({ email: createUserCredentialDto.email })}`).replace('{RESPONSE}', 'Email Verification'));
      return res.status(200).send({ data: "data saved successfully and verify email" });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Oops, something went wrong', {
        cause: new Error(),
      });
    }
  }

  @Post('/login')
  async logIn(
    @Res() res: Response,
    @Body(new loginPipe()) loginUserDto: loginUserDto,
  ) {
    try {
      const user = await this.userCredentialService.find({ email: loginUserDto.email });
      const check: boolean = await bcrypt.compare(loginUserDto.password, user[0].password);
      user[0].password = "";

      if (check)
        return res.status(200).send({ message: 'Login Succesfully', token: this.jwtService.sign({ email: user[0].email, firstname: user[0].firstname }) });
      return res.status(401).send({ message: "Password Not Match" });
    } catch (error) {
      throw new BadRequestException('Oops, something went wrong', {
        cause: new Error(),
      });
    }
  }

  @Get('/verify-email/:id')
  async verify_email(@Param('id') id: string, @Res() res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(id, { secret: process.env.JWT_SECRET_KEY });
      const user = await this.userCredentialService.find({ email: payload.email });
      if (user.length === 0)
        return res.write(email_verification("").replace('{RESPONSE}', 'Invalid User'));
      if (user[0].email_verified)
        return res.write(email_verification("").replace('{RESPONSE}', 'Link Expired'));
      await this.userCredentialService.findOneAndUpdate({ email: payload.email }, { email_verified: true });
      const emailRes = email_verification("").replace('{RESPONSE}', 'Email Verified')
      return res.write(emailRes)
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

}
