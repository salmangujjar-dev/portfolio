"use client";

import { PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/react";

export function Provider({ children }: PropsWithChildren) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
