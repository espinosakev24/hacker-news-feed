import { Test, TestingModule } from '@nestjs/testing';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';

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

describe('StoriesController', () => {
  let controller: StoriesController;
  let service: StoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoriesController],
      providers: [
        {
          provide: StoriesService,
          useValue: {
            getStories: jest
              .fn()
              .mockResolvedValue([
                mockStory(
                  'test id 1',
                  'test story 1',
                  'test comment 1',
                  'test author 1',
                  false,
                  'test url 1',
                  'test date 1',
                ),
                mockStory(
                  'test id 2',
                  'test story 2',
                  'test comment 2',
                  'test author 2',
                  false,
                  'test url 2',
                  'test date 2',
                ),
              ]),
            ignoreStory: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StoriesController>(StoriesController);
    service = module.get<StoriesService>(StoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('storiesController.getStories', () => {
    it('should get an object containing array of stories', () => {
      expect(controller.getStories()).resolves.toEqual([
        {
          storyId: 'test id 1',
          title: 'test story 1',
          comment: 'test comment 1',
          author: 'test author 1',
          ignore: false,
          storyUrl: 'test url 1',
          createdDate: 'test date 1',
        },
        {
          storyId: 'test id 2',
          title: 'test story 2',
          comment: 'test comment 2',
          author: 'test author 2',
          ignore: false,
          storyUrl: 'test url 2',
          createdDate: 'test date 2',
        },
      ]);
    });

    it('should call StoriesService.getStories', () => {
      controller.getStories();
      expect(service.getStories).toBeCalled();
    });
  });

  describe('storiesController.ignoreStory', () => {
    it('should call service.ignoreStory', () => {
      controller.ignoreStory('uuid');
      expect(service.ignoreStory).toBeCalled();
    });

    it('should return object with defined message', () => {
      const storyId = 'uuid id';
      expect(controller.ignoreStory(storyId)).resolves.toEqual({
        message: `Story: ${storyId} will not appear again`,
      });
    });
  });
});
