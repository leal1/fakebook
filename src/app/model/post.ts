import {User}  from './user';
import { Comment } from './comment';
export class Post {
  _id: string;
  author: string;
  message: string;
  likes: string[];
  addDate: Date;
  comments: Comment[];
  likeCount: number;
}