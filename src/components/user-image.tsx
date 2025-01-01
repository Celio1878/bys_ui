"use client";

import { FC } from "react";
import { useSession } from "next-auth/react";

interface UserImageProps {
  width: number;
  height: number;
  className?: string;
}

export const UserImage: FC<UserImageProps> = ({ width, height, className }) => {
  const { data: session } = useSession() as any;

  return (
    <img
      className={`${className} rounded-full object-cover`}
      src={session ? session?.user.image : "/user.png"}
      key={session?.user.id}
      alt={session?.user.name || "user"}
      width={width}
      height={height}
    />

    // <Image
    //   className={`${className} rounded-full object-cover`}
    //   src={session ? session?.user.image : "/user.png"}
    //   width={width}
    //   height={height}
    //   alt={session?.user.name || "user"}
    //     priority={true}
    //     quality={100}
    //   />
  );
};
