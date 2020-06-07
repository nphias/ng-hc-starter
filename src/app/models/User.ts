import { Post } from "./Post";

export class User {
  hash: string;
  handle: string;
  avatarURL: string;
  posts: Post[];
  followersNumber: number;
  followingsNumber: number;
}
