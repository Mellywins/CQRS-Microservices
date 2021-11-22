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
          transport: Transport.TCP,
          options: {
            host: 'write_ms',
            port: 3000,
          },
        }),
    },
    {
      provide: 'READ_USER_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'read_ms',
            port: 3001,
          },
        }),
    },
    {
      provide: 'SYNC_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'sync_pipeline',
            port: 3002,
          },
        }),
    },
  ],
})
export class AppModule {}
