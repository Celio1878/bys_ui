import { FC, useLayoutEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import { Toolbar } from "@/components/chapter/toolbar";

interface ChapterContentFormFieldProps {
  content: string;
  onChange: (content: string) => void;
}

export const ChapterContentFormField: FC<ChapterContentFormFieldProps> = ({
  content,
  onChange,
}) => {
  const [textColor, setTextColor] = useState("#000000");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Typography,
      Color,
      TextStyle,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
      }),
    ],
    editorProps: {
      attributes: {
        class: "outline-none min-h-[15rem] overflow-y-auto",
      },
    },
    content,
    editable: true,
    autofocus: false,
    injectCSS: false,
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      onChange(htmlContent);
    },
    immediatelyRender: false,
  });

  useLayoutEffect(() => {
    editor?.commands.setColor(textColor);
  }, [editor, textColor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col w-full items-start gap-y-1">
      <Label>Conteudo</Label>
      <Card className="w-full py-6 sm:py-0 sm:p-8">
        <CardContent className="flex flex-col gap-y-4">
          <Toolbar
            editor={editor}
            setTextColor={setTextColor}
            textColor={textColor}
          />
          <Separator />
          <EditorContent {...{ editor }} />
        </CardContent>
      </Card>
    </div>
  );
};
