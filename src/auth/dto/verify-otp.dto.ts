import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VerifyOtpDto {
   @IsEmail()
   @IsString()
   email: string;

   @IsNotEmpty()
   otp: number;
}
