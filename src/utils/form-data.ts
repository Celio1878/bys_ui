import { Tag, Warning } from "@/app/model/story";

export type BookFormValues = {
  id?: string;
  title: string;
  description: string;
  genre: string;
  copyright: string;
  ageRange: string;
  tags: Tag<string>[];
  warnings: Tag<Warning>[];
  coauthors: Tag<string>[];
  author: Tag<string>;
};

export const initialValues: BookFormValues = {
  title: "",
  description: "",
  genre: "",
  copyright: "",
  ageRange: "",
  tags: [],
  warnings: [],
  coauthors: [],
  author: { id: "", title: "" },
};
