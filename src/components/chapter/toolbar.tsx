import { FC, memo, useState } from "react";
import { ToggleButton } from "@/components/buttons/toggle-button";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  BoldIcon,
  HighlighterIcon,
  ItalicIcon,
  Pilcrow,
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
    const [boldActive, setBoldActive] = useState(false);
    const [italicActive, setItalicActive] = useState(false);
    const [underlineActive, setUnderlineActive] = useState(false);
    const [highlightActive, setHighlightActive] = useState(false);
    const [alignCenterActive, setAlignCenterActive] = useState(false);
    const [alignLeftActive, setAlignLeftActive] = useState(false);
    const [alignRightActive, setAlignRightActive] = useState(false);

    return (
      <div className="flex flex-wrap gap-1.5">
        <ToggleButton
          active={boldActive}
          title="Negrito"
          ariaLabel="Toggle bold"
          dataActive={editor.isActive("bold")}
          onClick={() => {
            editor.chain().focus().toggleBold().run();
            setBoldActive(!boldActive);
          }}
          icon={<BoldIcon size={20} />}
        />

        <ToggleButton
          active={italicActive}
          title="Italico"
          ariaLabel="Toggle italic"
          dataActive={editor.isActive("italic")}
          onClick={() => {
            editor.chain().focus().toggleItalic().run();
            setItalicActive(!italicActive);
          }}
          icon={<ItalicIcon size={20} />}
        />
        <ToggleButton
          active={underlineActive}
          title="Sublinhado"
          ariaLabel="Toggle underline"
          dataActive={editor.isActive("underline")}
          onClick={() => {
            editor.chain().focus().toggleUnderline().run();
            setUnderlineActive(!underlineActive);
          }}
          icon={<UnderlineIcon size={20} />}
        />
        <ToggleButton
          active={highlightActive}
          title="Destaque"
          ariaLabel="Toggle highlight"
          dataActive={editor.isActive("highlight")}
          onClick={() => {
            editor.chain().focus().toggleHighlight().run();
            setHighlightActive(!highlightActive);
          }}
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

        <Button
          title="Parágrafo"
          variant="outline"
          aria-label="Paragraph"
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <Pilcrow size={20} />
        </Button>

        <ColorPicker color={textColor} setColor={setTextColor} />

        <ToggleButton
          active={alignLeftActive}
          title="Alinhar Esquerda"
          ariaLabel="Text left"
          dataActive={editor.isActive({ textAlign: "left" })}
          onClick={() => {
            editor.chain().focus().setTextAlign("left").run();
            setAlignLeftActive(!alignLeftActive);
            setAlignCenterActive(false);
            setAlignRightActive(false);
          }}
          icon={<AlignLeft size={20} />}
        />
        <ToggleButton
          active={alignCenterActive}
          title="Alinhar Centro"
          ariaLabel="Text center"
          dataActive={editor.isActive({ textAlign: "center" })}
          onClick={() => {
            editor.chain().focus().setTextAlign("center").run();
            setAlignCenterActive(!alignCenterActive);
            setAlignLeftActive(false);
            setAlignRightActive(false);
          }}
          icon={<AlignCenter size={20} />}
        />
        <ToggleButton
          active={alignRightActive}
          title="Alinhar Direita"
          ariaLabel="Text right"
          dataActive={editor.isActive({ textAlign: "right" })}
          onClick={() => {
            editor.chain().focus().setTextAlign("right").run();
            setAlignRightActive(!alignRightActive);
            setAlignLeftActive(false);
            setAlignCenterActive(false);
          }}
          icon={<AlignRight size={20} />}
        />

        <PasteTextButton
          onClick={(text) => editor.commands.insertContent(text)}
        />
      </div>
    );
  },
);

Toolbar.displayName = "Toolbar";
