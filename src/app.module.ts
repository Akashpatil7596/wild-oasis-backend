import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { EmailModule } from "./email/email.module";
import { ConfigModule } from "@nestjs/config";

@Module({
   imports: [
      AuthModule,
      MongooseModule.forRoot(
         "mongodb+srv://root:root@cluster-demo.gf2e23g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-Demo",
         { dbName: "the-wild-oasis-database" },
      ),
      ConfigModule.forRoot({ isGlobal: true }),
      EmailModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
