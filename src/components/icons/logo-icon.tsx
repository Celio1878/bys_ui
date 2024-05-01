import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  width: number;
  height: number;
}

export const LogoIcon: FC<LogoProps> = ({ width, height }) => {
  return (
    <Link href="/public">
      <Image
        {...{ src: "/logo.png", alt: "logo", title: "BYS", width, height }}
      />
    </Link>
  );
};
