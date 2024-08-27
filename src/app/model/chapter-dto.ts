import { Tag } from "@/app/model/tags";

export type CreateChapter = {
  bookId: string;
  title: string;
  content: string;
  author: Tag<string>;
};

export type ChapterDto = {
  id: string;
  title: string;
  content: string;
  author: Tag<string>;
  bookId: string;
  createdAt: number;
  comments: any[];
};
