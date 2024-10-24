import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { EmailService } from "src/email/email.service";
import { Users } from "src/models/users.entity";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
   constructor(
      private readonly authService: AuthService,
      private readonly emailService: EmailService,
   ) {}

   @Post("verify-otp")
   async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
      const isUser: Partial<Users> = await this.authService.findOne({
         email: verifyOtpDto.email,
         otp: verifyOtpDto.otp,
      });

      if (isUser) {
         return {
            success: true,
            message: "Verified successfully!",
         };
      }
   }

   @Post("login")
   async login(@Body() loginDto: LoginDto) {
      let isUserExist: Partial<Users> = await this.authService.findOne({
         email: loginDto.email,
         password: loginDto.password,
      });

      const createToken = this.authService.createJwtToken(isUserExist);

      isUserExist = JSON.parse(JSON.stringify(isUserExist));

      isUserExist["token"] = createToken;

      if (!isUserExist) {
         return {
            success: false,
            message: "User not exists",
         };
      }

      return {
         success: true,
         message: "Login successfully",
         data: isUserExist,
      };
   }

   @Post()
   async create(@Body() registerDto: RegisterDto) {
      registerDto.otp = this.generateRandomOTP();

      const newUser = await this.authService.create(registerDto);

      this.emailService.sendMail({
         to: newUser.email,
         from: "ap3135198@gmail.com",
         subject: "Welcome to our app!",
         template: "register.hbs",
         context: { name: newUser.userName, otp: newUser.otp },
      });

      return newUser;
   }

   @Get()
   findAll() {
      return this.authService.findAll();
   }

   @Get(":id")
   findOne(@Param("id") id: string) {
      return this.authService.findOne(+id);
   }

   @Patch(":id")
   update(@Param("id") id: string, @Body() updateAuthDto: any) {
      return this.authService.update(+id, updateAuthDto);
   }

   @Delete(":id")
   remove(@Param("id") id: string) {
      return this.authService.remove(+id);
   }

   private generateRandomOTP() {
      let otp = "";
      for (let i = 0; i < 4; i++) {
         otp += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
      }
      console.log("OTP", Number(otp));

      return Number(otp);
   }
}
