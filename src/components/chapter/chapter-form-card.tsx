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
import { useRouter } from "next/navigation";

interface ChapterFormCardProps {
  formTitle: string;
  chapterTitle: string;
  content: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onSave: VoidFunction;
}

export const ChapterFormCard: FC<ChapterFormCardProps> = ({
  formTitle,
  onContentChange,
  onTitleChange,
  content,
  chapterTitle,
  onSave,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full">
      <Card className="flex flex-col sm:p-4 bg-slate-50">
        <CardHeader>
          <CardTitle>{formTitle}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-8">
          <ChapterTitleFormField
            title={chapterTitle}
            onChange={onTitleChange}
          />
          <ChapterContentFormField
            content={content}
            onChange={onContentChange}
          />
        </CardContent>
        <CardFooter className="flex flex-row justify-end gap-4">
          <Button onClick={router.back} variant={"destructive"}>
            Cancelar
          </Button>
          <Button
            onClick={onSave}
            disabled={!chapterTitle || content.length < 10}
          >
            Salvar Capitulo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
