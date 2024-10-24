import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { SendMailData } from "./email.interface";

@Injectable()
export class EmailService {
   constructor(private mailerService: MailerService) {}

   async sendMail(data: SendMailData) {
      return await this.mailerService.sendMail({
         to: data?.to,
         from: data?.from,
         subject: data?.subject,
         template: data?.template,
         context: data?.context,
      });
   }
}
