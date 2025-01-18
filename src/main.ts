// import { NestFactory, Reflector } from '@nestjs/core';
// import { AppModule } from './app.module';
// import {
//   initializeTransactionalContext,
//   StorageDriver,
// } from 'typeorm-transactional';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { ClassSerializerInterceptor } from '@nestjs/common';

// async function bootstrap() {
//   initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

//   const app = await NestFactory.create<NestExpressApplication>(AppModule);
//   app.setGlobalPrefix('api/');

//   app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

//   app.enableCors();

//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Handler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add global prefix if necessary
  app.setGlobalPrefix('api'); // Optional

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  server = serverlessExpress({ app: expressApp });
}

bootstrap();

export const handler: Handler = async (event, context) => {
  if (!server) {
    await bootstrap();
  }
  return server(event, context, (error, result) => {
    if (error) {
      throw error;
    }
    return result;
  });
};
