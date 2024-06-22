import { FC } from "react";
import { LoaderCircle } from "lucide-react";

export const Loading: FC = () => {
  return (
    <LoaderCircle className="absolute top-1/2 left-[37rem] w-20 h-20 animate-spin text-violet-600 z-20" />
  );
};
