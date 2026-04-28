import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@components/Header";
import Footer from "@components/Footer";
import Analytics from "@components/Analytics";
import { cn } from "@lib/utils";
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

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
    var root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    root.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("dark", inter.variable)} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body
        className={cn(
          inter.className,
          "min-h-screen relative bg-background text-foreground antialiased selection:bg-accent/30"
        )}
      >
        <Providers>
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow flex flex-col">{children}</main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
