import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@components/Header";
import Footer from "@components/Footer";

import { clsxm } from "@utils/clsxm";
import { Providers } from "./provider";
import TransitionEffect from "@components/TransitionEffect";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Salman Ahmed`,
  description: "Author: Salman Ahmed",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsxm(inter.className)}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow flex items-center">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
