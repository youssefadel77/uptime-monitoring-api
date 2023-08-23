import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { UserService } from '../users/users.service';

@Injectable()
export class MailService {
  private transporter: {
    sendMail: (arg0: {
      from: string;
      to: string;
      subject: string;
      text: string;
    }) => any;
  };

  constructor(private readonly userService: UserService) {
    this.transporter = nodemailer.createTransport({
      service: 'your-email-service-provider', // e.g., 'Gmail'
      auth: {
        user: 'your-email@example.com',
        pass: 'your-email-password',
      },
    });
  }

  async sendEmail(userId: number, subject: string, text: string) {
    const user = await this.userService.findById(userId);
    const mailOptions = {
      from: 'your-email@example.com',
      to: user.email,
      subject: subject,
      text: text,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
