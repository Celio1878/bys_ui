import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "../styles/globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Be Your Stories",
  description: "Create Books",
  applicationName: "BYS",
  keywords: ["beYourStories", "stories", "story", "book", "create-book"],
  category: "entertainment",
  classification: "free",
  creator: "Celio Vieira",
  authors: [{ name: "Celio Vieira", url: "celiovieira.com" }],
  publisher: "Vercel",
  generator: "Next.js",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
    href: "/logo.png",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "flex-1 flex-col min-h-screen items-center justify-between bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
