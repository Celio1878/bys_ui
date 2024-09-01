import { FC } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";

interface PasteTextButtonProps {
  onClick: (text: string) => void;
}

export const PasteTextButton: FC<PasteTextButtonProps> = ({ onClick }) => {
  async function handlePaste() {
    const text = await navigator.clipboard.readText();
    onClick(text);
  }

  return (
    <Button
      title="Colar"
      variant="outline"
      aria-label="Toggle paste"
      onClick={handlePaste}
    >
      <ClipboardCopy size={20} />
    </Button>
  );
};
