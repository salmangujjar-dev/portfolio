"use client";

import { PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeProvider from "./providers/ThemeProvider";
import ParticlesBG from "@components/Particles";

export function Providers({ children }: PropsWithChildren) {
  return (
    <NextUIProvider>
      <ThemeProvider>
        <ParticlesBG />
        <AnimatePresence mode="wait">
          <div key="main-content">{children}</div>
        </AnimatePresence>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </ThemeProvider>
    </NextUIProvider>
  );
}
