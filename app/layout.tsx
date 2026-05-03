import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/app/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitTrack — Dashboard",
  description: "Daily workout, meals, and hydration for Ashu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-50 text-zinc-900 transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-50">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
