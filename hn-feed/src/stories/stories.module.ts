import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StorySchema } from './schemas/story.schema';
import { Interval, ScheduleModule } from '@nestjs/schedule';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Story', schema: StorySchema }]),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  controllers: [StoriesController],
  providers: [StoriesService],
})
export class StoriesModule {
  constructor(private storiesService: StoriesService) {
    storiesService.updateStories();
  }
  @Interval(3600000)
  updateStories() {
    this.storiesService.updateStories();
  }
}
