import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "src/models/users.entity";
import { RegisterDto } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
   constructor(
      @InjectModel("Users") private readonly usersModel: Model<Users>,
      private readonly jwtService: JwtService,
   ) {}

   async create(registerDto: RegisterDto) {
      return await new this.usersModel(registerDto).save();
   }

   async findAll() {
      return await this.usersModel.find();
   }

   async findOne(query) {
      return await this.usersModel.findOne(query);
   }

   async findById(id: number) {
      return await this.usersModel.findById(id);
   }

   update(id: number, updateAuthDto: any) {
      return `This action updates a #${id} auth`;
   }

   remove(id: number) {
      return `This action removes a #${id} auth`;
   }

   createJwtToken(payload) {
      return this.jwtService.sign({ id: payload._id.toString() });
   }

   async verifyJwtToken(token) {
      return await this.jwtService.verify(token);
   }
}
