"use client";

import { PropsWithChildren } from "react";
import { AnimatePresence } from "motion/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ThemeProvider from "./providers/ThemeProvider";
import SmoothScroll from "@components/SmoothScroll";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <AnimatePresence mode="wait">
          <div key="main-content">{children}</div>
        </AnimatePresence>
      </SmoothScroll>
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
        theme="dark"
      />
    </ThemeProvider>
  );
}
