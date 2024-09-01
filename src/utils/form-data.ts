import { Tag, Warning } from "@/app/model/tags";

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
  cover: string;
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
  cover: "",
};
