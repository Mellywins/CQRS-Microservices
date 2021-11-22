import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'WRITE_USER_SERVICE',
      useFactory: () => {
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'write_ms',
            port: 3000,
          },
        });
      },
    },
  ],
})
export class AppModule {}
