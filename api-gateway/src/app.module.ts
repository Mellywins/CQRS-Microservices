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
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            url: 'redis://redis:6379',
          },
        }),
    },
    {
      provide: 'READ_USER_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            url: 'redis://redis:6379',
          },
        }),
    },
    {
      provide: 'SYNC_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            url: 'redis://redis:6379',
          },
        }),
    },
  ],
})
export class AppModule {}
