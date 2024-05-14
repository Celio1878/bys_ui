import { FC } from "react";
import { LoaderCircle } from "lucide-react";

export const Loading: FC = () => {
  return (
    <LoaderCircle className="fixed top-1/2 w-20 h-20 animate-spin text-violet-600 z-20" />
  );
};
