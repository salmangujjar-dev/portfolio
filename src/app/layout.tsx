import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@components/Header";
import Footer from "@components/Footer";
import { clsxm } from "@utils/clsxm";
import { Providers } from "./provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Salman Ahmed | Portfolio",
  description:
    "Full-stack developer portfolio showcasing projects, skills, and experience",
  keywords: [
    "Full-stack developer",
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Salman Ahmed" }],
  openGraph: {
    title: "Salman Ahmed | Portfolio",
    description:
      "Full-stack developer portfolio showcasing projects, skills, and experience",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salman Ahmed | Portfolio",
    description:
      "Full-stack developer portfolio showcasing projects, skills, and experience",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={clsxm(
          inter.className,
          "min-h-screen relative bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300"
        )}
      >
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
