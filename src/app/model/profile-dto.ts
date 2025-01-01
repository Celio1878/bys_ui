import { Tag } from "@/app/model/tags";
import { BookFormValues } from "@/utils/form-data";

export type CreateProfileDto = {
  id: string;
  email: string;
  name: string;
  bio: string;
  urlImage: string;
};

export type ProfileDto = {
  id: string;
  email: string;
  name: string;
  username: string;
  bio: string;
  urlImage: string;
  createdAt: EpochTimeStamp;
  readList: Tag<string>[];
  authorship: Tag<string>[];
  following: Tag<string>[];
  followers: Tag<string>[];
};

export function upsertAuthorship(
  author: ProfileDto,
  book: BookFormValues,
  bookId: string,
): ProfileDto {
  const bookTag: Tag<string> = {
    id: bookId,
    title: book.title,
  };

  const exists = author.authorship.some((tag) => tag.id === bookId);

  if (exists) {
    return author;
  }

  return {
    ...author,
    authorship: [...author.authorship, bookTag],
  };
}

export function removeAuthorship(author: ProfileDto, id: string): ProfileDto {
  author.authorship = author.authorship.filter((t) => t.id !== id);

  return author;
}
