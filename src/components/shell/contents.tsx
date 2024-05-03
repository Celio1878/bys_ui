import { FC } from "react";
import { Books } from "@/components/books";

export const Contents: FC = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-32 py-20">
      <Books />
      <Books />
      <Books />
      <Books />
      <Books />
    </section>
  );
};
