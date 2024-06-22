import { Tag } from "@/app/model/story";

export type CreateProfileDto = {
  email: string;
  name: string;
  image: string;
  created_at: EpochTimeStamp;
  my_read_list: Tag<string>[] | [];
  my_stories: Tag<string>[] | [];
  following: Tag<string>[] | [];
  followers: Tag<string>[] | [];
};

export type ProfileDto = CreateProfileDto;
