"use client";

import { LogoIcon } from "@/components/icons/logo-icon";
import { FC, memo, useState } from "react";
import { ReportDrawer } from "@/components/report-drawer";
import { HelpButton } from "@/components/buttons/help-button";
import Link from "next/link";

export const Footer: FC = memo(() => {
  const [openReport, setOpenReport] = useState(false);

  return (
    <footer className="w-full flex flex-col items-center justify-center gap-10 bg-slate-100 dark:bg-slate-950 pb-4 pt-12">
      <div className="flex flex-row justify-around items-center w-full">
        <LogoIcon {...{ width: 90, height: 90 }} />
        {/*<div className="flex flex-row items-center gap-6">*/}
        {/*  <FacebookIcon />*/}
        {/*  <InstagramIcon />*/}
        {/*  <TwitterIcon />*/}
        {/*</div>*/}
        <div className="flex flex-col gap-4 items-center">
          <Link
            href={"/privacy"}
            className="text-gray-600 dark:text-gray-400 text-xs text-center hover:underline"
          >
            Privacidade
          </Link>

          <Link
            href={"/terms"}
            className="text-gray-600 dark:text-gray-400 text-xs text-center hover:underline"
          >
            Termos
          </Link>

          <ReportDrawer
            isOpen={openReport}
            setIsOpen={setOpenReport}
            onConfirm={() => {}}
            trigger={<HelpButton />}
          />
        </div>
      </div>
      <p className="text-xs text-center text-slate-500">
        © 2024 - BeYourStories. Todos os direitos reservados.
      </p>
    </footer>
  );
});

Footer.displayName = "Footer";
