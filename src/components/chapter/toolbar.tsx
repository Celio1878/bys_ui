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

interface ToolbarProps {
  editor: any;
  textColor: string;
  setTextColor: (color: string) => void;
}

export const Toolbar: FC<ToolbarProps> = memo(
  ({ setTextColor, textColor, editor }) => {
    return (
      <div className="flex flex-wrap gap-1.5">
        <ToggleButton
          title="Negrito"
          aria_label="Toggle bold"
          data_active={editor.isActive("bold")}
          on_click={() => editor.chain().focus().toggleBold().run()}
          icon={<BoldIcon size={20} />}
        />
        <ToggleButton
          title="Italico"
          aria_label="Toggle italic"
          data_active={editor.isActive("italic")}
          on_click={() => editor.chain().focus().toggleItalic().run()}
          icon={<ItalicIcon size={20} />}
        />
        <ToggleButton
          title="Sublinhado"
          aria_label="Toggle underline"
          data_active={editor.isActive("underline")}
          on_click={() => editor.chain().focus().toggleUnderline().run()}
          icon={<UnderlineIcon size={20} />}
        />
        <ToggleButton
          title="Destaque"
          aria_label="Toggle highlight"
          data_active={editor.isActive("highlight")}
          on_click={() => editor.chain().focus().toggleHighlight().run()}
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

        <ColorPicker color={textColor} set_color={setTextColor} />

        <ToggleButton
          title="Alinhar Esquerda"
          aria_label="Text left"
          data_active={editor.isActive({ textAlign: "left" })}
          on_click={() => editor.chain().focus().setTextAlign("left").run()}
          icon={<AlignLeft size={20} />}
        />
        <ToggleButton
          title="Alinhar Centro"
          aria_label="Text center"
          data_active={editor.isActive({ textAlign: "center" })}
          on_click={() => editor.chain().focus().setTextAlign("center").run()}
          icon={<AlignCenter size={20} />}
        />
        <ToggleButton
          title="Alinhar Direita"
          aria_label="Text right"
          data_active={editor.isActive({ textAlign: "right" })}
          on_click={() => editor.chain().focus().setTextAlign("right").run()}
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
