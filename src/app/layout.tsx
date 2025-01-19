import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "../styles/globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/shell/theme-provider";
import { MainLayout } from "@/components/shell/main-layout";
import { UserProvider } from "@/components/shell/user-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { WebVitals } from "@/utils/web-vitals";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export const metadata: Metadata = {
  title: "Be Your Stories",
  description: "Create Books",
  applicationName: "BYS",
  keywords: ["beYourStories", "stories", "story", "book", "create-books"],
  category: "entertainment",
  classification: "free",
  creator: "Celio Vieira",
  authors: [{ name: "Celio Vieira", url: "celiovieira.com" }],
  publisher: "Vercel",
  generator: "Next.js",
  icons: {
    icon: `${BUCKET_URL}/other_images/logo.png`,
    shortcut: `${BUCKET_URL}/other_images/logo.png`,
    apple: `${BUCKET_URL}/other_images/logo.png`,
    href: `${BUCKET_URL}/other_images/logo.png`,
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <UserProvider>
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
            <MainLayout>{children}</MainLayout>
            <Toaster />
          </ThemeProvider>
          <SpeedInsights />
          <WebVitals />
        </body>
        <GoogleAnalytics gaId="G-VNJB67FBTB" />
        <Analytics />
      </UserProvider>
    </html>
  );
}
