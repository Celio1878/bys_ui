"use client";

import { useState } from "react";
import { ChapterFormCard } from "@/components/chapter/chapter-form-card";

export default function NewChapterPage() {
  const [title, set_title] = useState("");
  const [content, set_content] = useState("");

  return (
    <ChapterFormCard
      form_title="Novo Capitulo"
      content={content}
      chapter_title={title}
      on_title_change={set_title}
      on_content_change={set_content}
      on_save={() => {}}
    />
  );
}
