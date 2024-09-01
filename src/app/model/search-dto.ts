import { ProfileDto } from "./profile-dto";
import { BookDto } from "@/app/model/book-dto";

export type SearchDto = {
  profiles: ProfileDto[];
  books: BookDto[];
  totalPages: number;
};
