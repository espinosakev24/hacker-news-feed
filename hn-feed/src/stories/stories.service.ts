import { HttpService, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { IStory } from './interfaces/story.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class StoriesService {
  private readonly logger = new Logger(StoriesService.name);
  constructor(
    @InjectModel('Story') private storyModel: Model<IStory>,
    private httpService: HttpService,
  ) {}

  async getStories(): Promise<IStory[]> {
    return await this.storyModel
      .find({ ignore: false })
      .sort({ createdDate: -1 });
  }
  async getStoryByStoryId(id: string): Promise<IStory> {
    return await this.storyModel.findOne({ storyId: id });
  }
  async updateStories() {
    const storiesArray: IStory[] = [];

    this.logger.debug('Updating the stories...');
    this.findStories().subscribe(async (res: AxiosResponse) => {
      for (const story of res.data.hits) {
        const {
          objectID,
          title,
          story_title,
          comment_text,
          author,
          story_url,
          created_at,
        } = story;

        const dbStory = await this.getStoryByStoryId(objectID);
        const existsTitle =
          typeof title === 'string' || typeof story_title === 'string';

        if (existsTitle && !dbStory) {
          storiesArray.push(
            new this.storyModel({
              storyId: objectID,
              title: title || story_title,
              comment: comment_text,
              author: author,
              ignore: false,
              storyUrl: story_url,
              createdDate: created_at,
            }),
          );
        }
      }
      await this.storyModel.insertMany(storiesArray);
    });
  }
  findStories(): Observable<AxiosResponse> {
    return this.httpService.get(
      'https://hn.algolia.com/api/v1/search_by_date?query=nodejs',
    );
  }
  async ignoreStory(id: string) {
    await this.storyModel.updateOne({ storyId: id }, { ignore: true });
  }
}
