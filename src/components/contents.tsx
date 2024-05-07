import { FC, ReactNode } from "react";

interface ContentsProps {
  children: ReactNode;
}

export const Contents: FC<ContentsProps> = ({ children }) => {
  return (
    <section className="flex flex-col items-center justify-center pb-12 container">
      {children}
    </section>
  );
};
