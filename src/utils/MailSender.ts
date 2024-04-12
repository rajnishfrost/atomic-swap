import * as nodemailer from 'nodemailer';
export class MailSender {
  

  private mailTranspoter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.PASSWORD,
    },
  });

  public EmailSend = async (email, subject, template) => {
    console.log(process.env.EMAIL_SENDER , process.env.PASSWORD);

    const details = {
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: subject,
      text: 'OTP',
      html: template,
    };
    await this.mailTranspoter.sendMail(details);
  };
}
