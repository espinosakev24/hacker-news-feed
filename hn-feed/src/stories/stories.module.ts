import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StorySchema } from './schemas/story.schema';
import { Interval, ScheduleModule } from '@nestjs/schedule';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';

/**
 * @module StoriesModule creates db connection and starts cronjob
 *
 * @borrows storiesService.updateStories in order to update database
 * each hour with the stories/feed that comes from the algolia's api
 * {@link https://hn.algolia.com/api/v1/search_by_date?query=nodejs}
 *
 * @class
 * @classdesc Stories Module
 */
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
