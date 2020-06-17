
export class User {
  hash: string;
  handle: string;
  avatarURL: string;
  constructor(id:string,username:string){
    this.hash = id
    this.handle = username  
  }
}
