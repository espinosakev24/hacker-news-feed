import { Test, TestingModule } from '@nestjs/testing';
import { StoriesService } from './stories.service';
import { getModelToken } from '@nestjs/mongoose';
import { IStory } from './interfaces/story.interface';
import { Model, Query } from 'mongoose';
import { HttpModule } from '@nestjs/common';
import { createMock } from '@golevelup/nestjs-testing';
import { Observable } from 'rxjs';

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
            find: jest.fn(),
            insertMany: jest.fn(),
            updateOne: jest.fn(),
          },
        },
      ],
      imports: [HttpModule],
    }).compile();

    service = module.get<StoriesService>(StoriesService);
    model = module.get<Model<IStory>>(getModelToken('Story'));

    jest.spyOn(model, 'find').mockReturnValueOnce(
      createMock<Query<IStory[], IStory>>({
        sort: jest.fn().mockResolvedValueOnce([
          {
            storyId: 'uuid id',
            title: 'Node news',
            comment: 'node is fun',
            author: 'anonym',
            ignore: false,
            storyUrl: 'https://url.com',
            createdDate: '1/4/2021',
          },
        ]),
      }),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('storiesService.getStories', () => {
    it('should call StoryModel.find', async () => {
      await service.getStories();
      expect(model.find).toBeCalled();
    });

    it('should return obj of type array', async () => {
      const stories = await service.getStories();
      expect(Array.isArray(stories)).toBe(true);
    });

    it('should return array of stories', async () => {
      const stories = await service.getStories();
      expect(stories).toEqual([
        {
          storyId: 'uuid id',
          title: 'Node news',
          comment: 'node is fun',
          author: 'anonym',
          ignore: false,
          storyUrl: 'https://url.com',
          createdDate: '1/4/2021',
        },
      ]);
    });
  });

  describe('storiesService.ignoreStory', () => {
    it('should call model.updateOne', async () => {
      await service.ignoreStory('uuid id');
      expect(model.updateOne).toBeCalled();
    });
  });
});
