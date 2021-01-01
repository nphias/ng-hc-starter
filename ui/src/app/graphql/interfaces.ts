
export type Dictionary<T> = { [key: string]: T };

export interface Profile {
  username: string
  fields: Dictionary<string>
}

export interface Agent {
  id: string;
  profile: Profile;
  avatar: string
}