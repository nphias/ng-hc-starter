import { Vote } from "./Vote";

export class Comment {
  content: string;
  timeStamp: number;
  creatorHash: string;
  hash: string;
  votes: Vote[];
  value: number;
  constructor(
    content: string,
    timestamp: number,
    creatorHash: string,
    hash: string
  ) {
    this.content = content;
    this.timeStamp = timestamp;
    this.hash = hash;
    this.creatorHash = creatorHash;
    this.votes = [];
  }
}
