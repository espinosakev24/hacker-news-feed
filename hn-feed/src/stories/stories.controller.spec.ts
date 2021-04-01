import { Test, TestingModule } from '@nestjs/testing';
import { StorySchema } from './schemas/story.schema';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';

// class Story {
//   storyId: string;
//   title: string;
//   comment: string;
//   author: string;
//   ignore: boolean;
//   storyUrl: string;
//   createdDate: string;
// }

describe('StoriesController', () => {
  let controller: StoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoriesController],
      providers: [
        StoriesService,
        {
          provide: 'Story',
          useValue: StorySchema,
        },
      ],
    }).compile();

    controller = module.get<StoriesController>(StoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
