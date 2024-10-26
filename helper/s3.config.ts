import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";

@Injectable()
export class S3Service {
   private readonly s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
         secretAccessKey: process.env.AWS_SECRET_KEY_ID,
      },
   });

   async upload(fileName: string, file: Buffer) {
      await this.s3Client.send(
         new PutObjectCommand({
            Bucket: process.env.AWS_SE_BUCKET,
            Key: "users" + "/" + fileName,
            Body: file,
         }),
      );
   }

   async getFile(filename: string) {
      const command = new GetObjectCommand({
         Bucket: process.env.AWS_SE_BUCKET,
         Key: filename,
      });

      const url = await getSignedUrl(this.s3Client, command);

      return url;
   }
}
