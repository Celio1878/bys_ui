import { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChapterTitleFormField } from "@/components/form/fields/chapter-title-form-field";
import { ChapterContentFormField } from "@/components/form/fields/chapter-content-form-field";
import { Button } from "@/components/ui/button";

interface ChapterFormCardProps {
  form_title: string;
  chapter_title: string;
  content: string;
  on_title_change: (title: string) => void;
  on_content_change: (content: string) => void;
  on_save: (title: string, content: string) => void;
}

export const ChapterFormCard: FC<ChapterFormCardProps> = ({
  form_title,
  on_content_change,
  on_title_change,
  content,
  chapter_title,
  on_save,
}) => {
  return (
    <div className="flex flex-col w-full">
      <Card className="flex flex-col sm:p-4">
        <CardHeader>
          <CardTitle>{form_title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-8">
          <ChapterTitleFormField
            title={chapter_title}
            on_change={on_title_change}
          />
          <ChapterContentFormField
            content={content}
            on_change={on_content_change}
          />
        </CardContent>
        <CardFooter className="justify-end">
          <Button onClick={() => on_save(chapter_title, content)}>
            Salvar Capitulo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
