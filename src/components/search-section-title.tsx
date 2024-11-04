import { FC } from "react";

interface SearchSectionTitleProps {
  title: string;
}

export const SearchSectionTitle: FC<SearchSectionTitleProps> = ({ title }) => {
  return (
    <div className="flex flex-row text-center items-center justify-start gap-2">
      <span className="text-slate-400">Busca por: </span>
      <h1 className="text-xl font-medium">{title}</h1>
    </div>
  );
};
