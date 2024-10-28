import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/models/users.entity";
import { EmailModule } from "src/email/email.module";
import { JwtModule } from "@nestjs/jwt";
import { S3Service } from "helper/s3.config";

@Module({
   imports: [
      MongooseModule.forFeature([{ name: "Users", schema: UserSchema }]),
      JwtModule.register({
         global: true,
         secret: "I_AM_BATMAN",
         signOptions: { expiresIn: "3d" },
      }),
      EmailModule,
   ],
   controllers: [AuthController],
   providers: [AuthService, S3Service],
})
export class AuthModule {}
