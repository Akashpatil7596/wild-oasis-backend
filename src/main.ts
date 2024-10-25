import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   app.useGlobalPipes(new ValidationPipe());

   app.enableCors({
       origin: 'https://courageous-tartufo-efcbe9.netlify.app/', // Specify your Netlify site
       methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
       credentials: true,
   });

   await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
