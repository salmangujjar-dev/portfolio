import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@components/Header";
import { clsxm } from "@utils/clsxm";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Salman's Portfolio`,
  description: "Author: Salman Ahmed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsxm(
          inter.className,
          "min-h-screen flex flex-col h-screen"
        )}
      >
        <Header />
        <main className="flex-grow flex items-center">{children}</main>
      </body>
    </html>
  );
}
