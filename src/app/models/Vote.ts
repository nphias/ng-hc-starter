export class Vote {
  value: number;
  creatorHash: string;
  constructor(value: number, creatorHash: string) {
    this.value = value;
    this.creatorHash = creatorHash;
  }
}
