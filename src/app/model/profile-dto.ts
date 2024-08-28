import { Tag } from "@/app/model/tags";

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
  readList: Tag<string>[];
  authorship: Tag<string>[];
  following: Tag<string>[];
  followers: Tag<string>[];
};
