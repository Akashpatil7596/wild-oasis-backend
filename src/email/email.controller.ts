import { Body, Controller, Post, Res } from "@nestjs/common";
import { EmailService } from "./email.service";

@Controller("email")
export class EmailController {
   constructor(private readonly emailService: EmailService) {}

   @Post("send")
   async sendMail(@Body() body: any, @Res() res) {}
}
