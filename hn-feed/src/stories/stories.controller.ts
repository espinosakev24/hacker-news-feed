import { Controller, Get, Put, Param } from '@nestjs/common';
import { IStory } from './interfaces/story.interface';
import { StoriesService } from './stories.service';

@Controller('stories')
export class StoriesController {
  constructor(private storyService: StoriesService) {}

  /**
   * Gets an array of stories from the database
   *
   * @returns {Promise<IStory[]>}
   */
  @Get('/')
  async getStories(): Promise<IStory[]> {
    return await this.storyService.getStories();
  }

  /**
   * Ignores story from the GET response based on storyId
   *
   * @param {string} storyId Id of the story to be ignored
   * @returns {Promise<Object>} Object with message member
   */
  @Put('/:id')
  async ignoreStory(
    @Param('id') storyId: string,
  ): Promise<{ message: string }> {
    await this.storyService.ignoreStory(storyId);
    return {
      message: `Story: ${storyId} will not appear again`,
    };
  }
}
