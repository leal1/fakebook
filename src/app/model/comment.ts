import {User}  from './user';
export class Comment {
  constructor(author: string, message: string) {
    this.author = author;
    this.message = message;
  }
  _id: string;
  author: string;
  message: string;
  likes: User[];
  addDate: Date;
}