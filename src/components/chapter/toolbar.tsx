import { FC, memo } from "react";
import { ToggleButton } from "@/components/buttons/toggle-button";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  BoldIcon,
  HighlighterIcon,
  ItalicIcon,
  SquareSplitVertical,
  UnderlineIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/color-picker";
import { PasteTextButton } from "@/components/buttons/paste-text-button";
import { Editor } from "@tiptap/core";

interface ToolbarProps {
  editor: Editor;
  textColor: string;
  setTextColor: (color: string) => void;
}

export const Toolbar: FC<ToolbarProps> = memo(
  ({ setTextColor, textColor, editor }) => {
    return (
      <div className="flex flex-wrap gap-1.5">
        <ToggleButton
          title="Negrito"
          ariaLabel="Toggle bold"
          dataActive={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          icon={<BoldIcon size={20} />}
        />
        <ToggleButton
          title="Italico"
          ariaLabel="Toggle italic"
          dataActive={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          icon={<ItalicIcon size={20} />}
        />
        <ToggleButton
          title="Sublinhado"
          ariaLabel="Toggle underline"
          dataActive={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          icon={<UnderlineIcon size={20} />}
        />
        <ToggleButton
          title="Destaque"
          ariaLabel="Toggle highlight"
          dataActive={editor.isActive("highlight")}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          icon={<HighlighterIcon size={20} />}
        />

        <Button
          title="Linha Horizontal"
          variant="outline"
          aria-label="Toggle horizontal rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <SquareSplitVertical size={20} />
        </Button>

        <ColorPicker color={textColor} setColor={setTextColor} />

        <ToggleButton
          title="Alinhar Esquerda"
          ariaLabel="Text left"
          dataActive={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          icon={<AlignLeft size={20} />}
        />
        <ToggleButton
          title="Alinhar Centro"
          ariaLabel="Text center"
          dataActive={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          icon={<AlignCenter size={20} />}
        />
        <ToggleButton
          title="Alinhar Direita"
          ariaLabel="Text right"
          dataActive={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          icon={<AlignRight size={20} />}
        />

        <PasteTextButton
          on_click={(text) => editor.commands.insertContent(text)}
        />
      </div>
    );
  },
);

Toolbar.displayName = "Toolbar";
