import { FC, ReactNode } from "react";

interface ContentsProps {
  children: ReactNode;
}

export const Contents: FC<ContentsProps> = ({ children }) => {
  return (
    <section className="flex flex-col items-center justify-center gap-20 pt-1 pb-20">
      {children}
    </section>
  );
};
