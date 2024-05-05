"use client";

import { FC } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface UserImageProps {
  width: number;
  height: number;
}

export const UserImage: FC<UserImageProps> = ({ width, height }) => {
  const { data: session } = useSession() as any;

  return (
    <Image
      className="rounded-full"
      {...{
        src: session ? session?.picture : "/user.png",
        alt: session ? session?.name : "User",
        width,
        height,
        priority: true,
      }}
    />
  );
};
