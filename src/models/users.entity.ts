import { Document, Schema } from "mongoose";

const UserSchema = new Schema({
   userName: String,
   email: String,
   password: String,
   country: String,
   city: String,
   state: String,
   otp: Number,
});

interface Users extends Document {
   userName: string;
   email: string;
   password: string;
   country: string;
   city: string;
   state: string;
   otp: number;
}

export { UserSchema, Users };
