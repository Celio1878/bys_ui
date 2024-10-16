import { FC, ReactNode } from "react";

interface ContentsProps {
  children: ReactNode;
}

export const Contents: FC<ContentsProps> = ({ children }) => {
  return (
    <section className="flex-grow flex-col items-center justify-center py-12 container">
      {children}
    </section>
  );
};
