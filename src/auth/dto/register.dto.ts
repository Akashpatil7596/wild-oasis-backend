import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
   @IsNotEmpty()
   @IsString()
   userName: string;

   @IsEmail()
   @IsString()
   email: string;

   @IsNotEmpty()
   @MinLength(4)
   @MaxLength(8)
   @IsString()
   password: string;

   @IsNotEmpty()
   @IsString()
   country: string;

   @IsNotEmpty()
   @IsString()
   state: string;

   @IsNotEmpty()
   @IsString()
   city: string;

   otp?: number;

   userProfile: any;
}
