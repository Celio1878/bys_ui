import { FC } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";

interface PasteTextButtonProps {
  on_click: (text: string) => void;
}

export const PasteTextButton: FC<PasteTextButtonProps> = ({ on_click }) => {
  async function handle_paste() {
    const text = await navigator.clipboard.readText();
    on_click(text);
  }

  return (
    <Button
      title="Colar"
      variant="outline"
      aria-label="Toggle paste"
      onClick={handle_paste}
    >
      <ClipboardCopy size={20} />
    </Button>
  );
};
