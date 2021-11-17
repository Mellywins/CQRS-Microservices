import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo/cqrs')],
  controllers: [AppController],
  providers: [UserService],
})
export class AppModule {}
