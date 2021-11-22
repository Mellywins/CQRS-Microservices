import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3000,
      },
    },
  );
  app.listen().then((e) => {
    Logger.log('Microservice listening on port 3000');
  });
  // const app = await NestFactory.create(AppModule);
  // app.listen(3000,()=>console.log('App is listening on port 3000'))
}
bootstrap();
