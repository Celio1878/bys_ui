import { LogoIcon } from "@/components/icons/logo-icon";
import { FacebookIcon } from "@/components/icons/facebook-icon";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { TwitterIcon } from "@/components/icons/twitter-icon";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-4">
      <LogoIcon {...{ width: 100, height: 100 }} />
      <div className="flex flex-row items-center gap-6">
        <FacebookIcon />
        <InstagramIcon />
        <TwitterIcon />
      </div>
      <p className="text-sm text-center">
        © 2024 - Be Your Stories. Todos os direitos reservados.
      </p>
    </footer>
  );
};
