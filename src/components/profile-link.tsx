import { FC } from "react";
import Link from "next/link";

interface ProfileLinkProps {
  name: string;
}

export const ProfileLink: FC<ProfileLinkProps> = ({ name }) => {
  const sanitized_name = name.replace(/\s/g, "-").toLowerCase();
  return (
    <Link
      className="border rounded-md py-2.5 px-4 font-semibold hover:text-white hover:bg-indigo-700 transition-all duration-300"
      href={`/profile/${sanitized_name}`}
    >
      Perfil
    </Link>
  );
};
