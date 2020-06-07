import { Comment } from "./Comment";
import { User } from "./User";
import { Vote } from "./Vote";

export class Post {
  hash: string;
  content: string;
  creator: User;
  timeStamp: number;
  comments: Comment[];
  dateTimeString: string;
  value;
  votes: Vote[];
  public constructor(
    content: string,
    timeStamp: number,
    creator: User,
    hash: string
  ) {
    this.content = content;
    this.timeStamp = timeStamp;
    this.hash = hash;
    this.creator = creator;
    this.dateTimeString = new Date(this.timeStamp * 1000).toLocaleString();
    this.comments = [];
    this.votes = [];
    this.value = 0;
  }
}
