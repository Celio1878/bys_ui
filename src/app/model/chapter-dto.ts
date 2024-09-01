import { Tag } from "@/app/model/tags";

export type CreateChapter = {
  id: string;
  bookId: string;
  title: string;
  content: string;
  author: Tag<string>;
  createdAt: number;
};

export type ChapterDto = {
  id: string;
  title: string;
  content: string;
  author: Tag<string>;
  bookId: string;
  createdAt: number;
  comments: CommentData[];
};

export type CommentData = {
  id: string;
  content: string;
  author: Tag<string>;
  createdAt: number;
};

export function addCommentToChapter(
  content: string,
  chapter: ChapterDto,
  user: any,
): ChapterDto {
  const createdAt = Date.now();

  const comment: CommentData = {
    id: String(createdAt),
    content,
    author: { id: user?.id, title: user?.name },
    createdAt,
  };

  const exists = chapter?.comments?.some((c) => c.id === comment.id);

  if (!exists) chapter?.comments?.push(comment);

  return chapter;
}

export function removeCommentToChapter(
  chapter: ChapterDto,
  commentId: string,
): ChapterDto {
  chapter.comments = chapter.comments.filter((c) => c.id !== commentId);

  return chapter;
}
