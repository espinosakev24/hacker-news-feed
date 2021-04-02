import { Test, TestingModule } from '@nestjs/testing';
import { StoriesService } from './stories.service';
import { getModelToken } from '@nestjs/mongoose';
import { IStory } from './interfaces/story.interface';
import { Model } from 'mongoose';
import { HttpModule } from '@nestjs/common';

const mockStory = (
  storyId: string,
  title: string,
  comment: string,
  author: string,
  ignore: boolean,
  storyUrl: string,
  createdDate: string,
) => {
  return { storyId, title, comment, author, ignore, storyUrl, createdDate };
};

describe('StoriesService', () => {
  let service: StoriesService;
  let model: Model<IStory>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoriesService,
        {
          provide: getModelToken('Story'),
          useValue: {
            // constructor: jest.fn().mockResolvedValue()
          },
        },
      ],
      imports: [HttpModule],
    }).compile();

    service = module.get<StoriesService>(StoriesService);
    model = module.get<Model<IStory>>(getModelToken('Story'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
