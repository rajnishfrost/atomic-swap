import { Controller, Post, Body, Req , Res, Get, Param, BadRequestException, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserCredentialService } from './user_credential.service';
import { CreateUserCredentialDto, loginUserDto } from './dto/create-user_credential.dto';
import { Response, Express, Request } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailSender } from 'src/utils/MailSender';
import email_verification from 'src/utils/email_templates/email_verification';
import { UserGuard } from 'src/utils/gaurds/user_auth.gaurd';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
    @Body() loginUserDto,
  ) {
    try {
      const user = await this.userCredentialService.find({ email: loginUserDto.email });
      const check: boolean = await bcrypt.compare(loginUserDto.password, user[0].password);
      user[0].password = "";
      if (check)
        return res.status(200).send({ message: 'Login Succesfully', token: this.jwtService.sign({ email: user[0].email, firstname: user[0].firstname , profileImageURL : user[0].profileImageUrl }, { expiresIn: process.env.LOGIN_TOKEN_TIME }) });
      return res.status(401).send({ message: "Password Not Match" });
    } catch (error) {
      console.log(error);
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

  @UseGuards(UserGuard)
  @Get('/verify-token')
  verifyToken(
    @Res() res: Response,
    @Req() req : any
  ) {
    res.status(200).send({ msg: "token verified" })
  }

  @UseGuards(UserGuard)
  @Post('/profile-image')
  @UseInterceptors(FileInterceptor('profileImage', {
    storage: diskStorage({
      destination: './uploads/profile-image',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
    limits: {
      fileSize: 1024 * 1024 * 1 // 1 MB file size limit
    },
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Only JPG, JPEG, and PNG files are allowed!'), false);
      }
      cb(null, true);
    },
  }))
  async profileImage(
    @UploadedFile() image: Express.Multer.File,
    @Res() res: Response,
    @Req() req : any
  ) {
    try {
      const profileURL =`${process.env.PROFILE_IMAGE_BASE_URL}${image.filename}`
      this.userCredentialService.findOneAndUpdate({email : req.user.email} , {profileImageUrl : profileURL})
      res.status(200).send({ msg: "profile image uploaded"})
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
      });
    }
  }

  @Post('/image-upload-link')
  async imageUploadLink(
    @Res() res: Response,
    @Body() body: { image: string[] },
  ) {
    try {
      const existingDocuments = await this.userCredentialService.findImage({});
      let document;
      if (existingDocuments.length > 0) {
        document = existingDocuments[0];
        document.image.push(...body.image);
      } else {
        // If no document exists, create a new one
        document = { image: body.image };
      }
      
      await this.userCredentialService.saveImage(document);
      return res.status(200).send({ msg: 'Data saved successfully' });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Oops, something went wrong', {
        cause: new Error(),
      });
    }
  }

  @Get('/image-upload-link')
  async getImageUploadLink(
    @Res() res: Response,
  ) {
    try {
      const existingDocuments = await this.userCredentialService.findImage({});
      const generatedNumber = Math.floor(Math.random() * 22);      
      return res.status(200).send(existingDocuments[0].image[generatedNumber]);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Oops, something went wrong', {
        cause: new Error(),
      });
    }
  }
}
