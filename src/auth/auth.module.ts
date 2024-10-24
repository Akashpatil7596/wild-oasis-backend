import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/models/users.entity";
import { EmailModule } from "src/email/email.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
   imports: [
      MongooseModule.forFeature([{ name: "Users", schema: UserSchema }]),
      JwtModule.register({
         global: true,
         secret: "I_AM_BATMAN",
         signOptions: { expiresIn: "60s" },
      }),
      EmailModule,
   ],
   controllers: [AuthController],
   providers: [AuthService],
})
export class AuthModule {}
