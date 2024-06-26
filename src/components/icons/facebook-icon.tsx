import { FC } from "react";
import Link from "next/link";

export const FacebookIcon: FC = () => {
  const icon_props = {
    width: 25,
    height: 25,
    className:
      "fill-current text-blue-500 hover:text-blue-400 transition-all duration-300",
  };
  return (
    <Link
      href="https://www.facebook.com/beyoustoriesbr"
      target="_blank"
      rel="noreferrer"
    >
      <svg
        viewBox="0 0 90 90"
        xmlns="http://www.w3.org/2000/svg"
        {...icon_props}
      >
        <title>Facebook</title>
        <path d="M90 15c0-7.9-7.1-15-15-15H15C7.1 0 0 7.1 0 15v60c0 7.9 7.1 15 15 15h30V56H34V41h11v-5.8C45 25.1 52.6 16 61.9 16H74v15H61.9c-1.3 0-2.9 1.6-2.9 4v6h15v15H59v34h16c7.9 0 15-7.1 15-15V15z" />
      </svg>
    </Link>
  );
};
