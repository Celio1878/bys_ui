import { FC } from "react";
import { ToastAction } from "@/components/ui/toast";
import { ThumbsDown, ThumbsUp } from "lucide-react";

interface RemoveChapterToastProps {
  onRemove: VoidFunction;
}

export const RemoveChapterToast: FC<RemoveChapterToastProps> = ({
  onRemove,
}) => {
  return (
    <div className={"flex flex-row space-x-2"}>
      <ToastAction altText="No Remove">
        <ThumbsDown />
      </ToastAction>
      <ToastAction altText="Remove" onClick={onRemove}>
        <ThumbsUp className="text-red-500" />
      </ToastAction>
    </div>
  );
};
