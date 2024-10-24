import { Module } from "@nestjs/common";
import { EmailService } from "./email.service";
import { EmailController } from "./email.controller";
import { MailerModule } from "@nestjs-modules/mailer";
import { join } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Module({
   imports: [
      MailerModule.forRoot({
         transport: {
            service: "gmail",
            auth: {
               user: "dummyforaltair@gmail.com",
               pass: "ybwd pkkz thfb qpqc",
            },
         },
         defaults: {
            from: "dummyforaltair@gmail.com",
         },
         template: {
            dir: join(__dirname, "../../views/mail-templates"),
            adapter: new HandlebarsAdapter(),
            options: {
               strict: true,
            },
         },
      }),
   ],
   controllers: [EmailController],
   providers: [EmailService],
   exports: [EmailService],
})
export class EmailModule {}
