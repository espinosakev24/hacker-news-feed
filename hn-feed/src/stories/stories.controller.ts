import {
  Controller,
  Get,
  Delete,
  Res,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { StoriesService } from './stories.service';

@Controller('stories')
export class StoriesController {
  constructor(private storyService: StoriesService) {}

  @Get('/')
  async getStories(@Res() res) {
    const stories = await this.storyService.getStories();
    return res.status(HttpStatus.OK).json({
      stories: stories,
    });
  }
  @Delete('/:id')
  async ignoreStory(@Res() res, @Param('id') storyId: string) {
    await this.storyService.ignoreStory(storyId);
    return res.status(HttpStatus.OK).json({
      message: 'Story will not appear again',
    });
  }
}
