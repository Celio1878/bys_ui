import { FC } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ChapterTitleFormFieldProps {
  title: string;
  onChange: (value: string) => void;
}

export const ChapterTitleFormField: FC<ChapterTitleFormFieldProps> = ({
  title,
  onChange,
}) => {
  return (
    <div className="flex flex-col w-full items-start gap-y-1">
      <Label>Titulo</Label>
      <Input
        type="text"
        id="chapter-title"
        value={title}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};
