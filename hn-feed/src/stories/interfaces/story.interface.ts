import { Document } from 'mongoose';

export interface IStory extends Document {
  storyId: string;
  title: string;
  comment: string;
  author: string;
  ignore: boolean;
  storyUrl: string;
  createdDate: string;
}
