import { Schema } from 'mongoose';

export const StorySchema = new Schema({
  storyId: String,
  title: String,
  comment: String,
  author: String,
  ignore: Boolean,
  storyUrl: String,
  createdDate: String,
});
