import Image from "next/image";
import { FC } from "react";

interface Props {
  width: number;
  height: number;
}

export const GoogleIcon: FC<Props> = ({ height, width }) => {
  return (
    <Image {...{ src: "/google.png", alt: "google-icon", width, height }} />
  );
};
