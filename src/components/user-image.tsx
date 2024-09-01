"use client";

import { FC } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface UserImageProps {
  width: number;
  height: number;
}

export const UserImage: FC<UserImageProps> = ({ width, height }) => {
  const { data } = useSession() as any;

  return (
    <Image
      className="rounded-full"
      {...{
        src: data ? data?.user.image : "/user.png",
        alt: data ? data?.user.name : "User",
        width,
        height,
        priority: true,
        quality: 100,
      }}
    />
  );
};
