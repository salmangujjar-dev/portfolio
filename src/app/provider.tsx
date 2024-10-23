"use client";

import { PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/react";

import ThemeProvider from "./providers/ThemeProvider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <NextUIProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </NextUIProvider>
  );
}
