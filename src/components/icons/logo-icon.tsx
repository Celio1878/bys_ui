import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  width: number;
  height: number;
}

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export const LogoIcon: FC<LogoProps> = ({ width, height }) => {
  return (
    <Link href="/">
      <Image
        {...{
          src: `${BUCKET_URL}/other_images/logo.png`,
          alt: "logo",
          title: "BYS",
          width,
          height,
          priority: true,
        }}
      />
    </Link>
  );
};
