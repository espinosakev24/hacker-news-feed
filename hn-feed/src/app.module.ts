import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StoriesModule } from './stories/stories.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://database/hndb'), StoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
