import { Tag } from "@/app/model/story";

export type CreateProfileDto = {
  email: string;
  name: string;
  urlImage: string;
};

export type ProfileDto = {
  id: string;
  email: string;
  name: string;
  urlImage: string;
  createdAt: EpochTimeStamp;
  myReadList: Tag<string>[];
  myStories: Tag<string>[];
  following: Tag<string>[];
  followers: Tag<string>[];
};
