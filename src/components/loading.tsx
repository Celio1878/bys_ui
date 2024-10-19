import { FC } from "react";
import { LoaderCircle } from "lucide-react";

export const Loading: FC = () => {
  return (
    <LoaderCircle className="relative top-1/2 left-1/2 w-16 h-auto animate-spin text-violet-600 z-20" />
  );
};
