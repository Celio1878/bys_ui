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
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";

interface ChapterContentFormFieldProps {
  content: string;
  on_change: (content: string) => void;
}

export const ChapterContentFormField: FC<ChapterContentFormFieldProps> = ({
  content,
  on_change,
}) => {
  const [text_color, set_text_color] = useState("#000000");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Typography,
      Color,
      TextStyle,
      HorizontalRule,
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
    content: content,
    editable: true,
    autofocus: false,
    injectCSS: false,
    onUpdate: ({ editor }) => {
      const editor_content = editor.getHTML();
      on_change(editor_content);
    },
  });

  useLayoutEffect(() => {
    editor?.commands.setColor(text_color);
  }, [text_color]);

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
            set_text_color={set_text_color}
            text_color={text_color}
          />
          <Separator />
          <EditorContent {...{ editor }} />
        </CardContent>
      </Card>
    </div>
  );
};
