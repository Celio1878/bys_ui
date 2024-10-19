import { Tag } from "@/app/model/tags";
import { CommentData } from "@/app/model/chapter-dto";

export type ReportDto = {
  title: string;
  content: string;
  aboutWho?: Tag<string>[];
  aboutComment?: CommentData;
  userData: {
    id?: string;
    email: string;
    name: string;
  };
};
