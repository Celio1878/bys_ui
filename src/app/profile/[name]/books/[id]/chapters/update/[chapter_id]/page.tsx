"use client";

import { ChapterFormCard } from "@/components/chapter/chapter-form-card";
import { useState } from "react";
import { useParams } from "next/navigation";
import { chapter } from "@/utils/mocks";

export default function UpdateChapterPage() {
  const { id, chapter_id } = useParams();
  const [title, set_title] = useState(
    `${chapter.title} - ${chapter_id} do livro ${id}`,
  );
  const [content, set_content] = useState(chapter.content);

  return (
    <ChapterFormCard
      form_title="Atualizar capitulo"
      content={content}
      chapter_title={title}
      on_title_change={set_title}
      on_content_change={set_content}
      on_save={() => {}}
    />
  );
}
