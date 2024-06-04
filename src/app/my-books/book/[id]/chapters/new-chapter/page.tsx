"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { ChapterTitleFormField } from "@/components/form/fields/chapter-title-form-field";
import { ChapterContentFormField } from "@/components/form/fields/chapter-content-form-field";
import { Button } from "@/components/ui/button";

export default function NewChapterPage() {
  const [title, set_title] = useState("");
  const [content, set_content] = useState("");

  return (
    <div className="flex flex-col w-full">
      <Card className="flex flex-col sm:p-8">
        <CardHeader>
          <CardTitle>Novo Capitulo</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-8">
          <ChapterTitleFormField title={title} on_change={set_title} />
          <ChapterContentFormField content={content} on_change={set_content} />
        </CardContent>
        <CardFooter className="justify-end">
          <Button onClick={() => console.log(title, content)}>
            Salvar Capitulo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
