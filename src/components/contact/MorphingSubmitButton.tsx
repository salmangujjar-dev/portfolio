"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, Send, X } from "lucide-react";

import { cn } from "@lib/utils";

export type SubmitStatus = "idle" | "loading" | "success" | "error";

type Props = {
  status: SubmitStatus;
  onClick?: () => void;
  className?: string;
  idleLabel?: string;
  successLabel?: string;
  errorLabel?: string;
};

const MorphingSubmitButton = ({
  status,
  onClick,
  className,
  idleLabel = "Send message",
  successLabel = "Message sent",
  errorLabel = "Try again",
}: Props) => {
  const isCircle = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <motion.button
      type="submit"
      onClick={onClick}
      disabled={status === "loading" || status === "success"}
      layout
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden font-medium uppercase tracking-[0.2em] text-sm transition-colors",
        isCircle && "h-12 w-12 rounded-full",
        !isCircle && "h-12 px-7 rounded-full",
        isSuccess
          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/40"
          : isError
          ? "bg-destructive/15 text-destructive border border-destructive/40"
          : "bg-accent text-accent-foreground border border-accent hover:shadow-glow",
        className
      )}
      style={{ borderRadius: 9999 }}
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        {status === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-2"
          >
            {idleLabel}
            <Send className="h-4 w-4" />
          </motion.span>
        )}

        {status === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="inline-flex"
          >
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="sr-only">Sending</span>
          </motion.span>
        )}

        {status === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="inline-flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
            {successLabel}
          </motion.span>
        )}

        {status === "error" && (
          <motion.span
            key="error"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            {errorLabel}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default MorphingSubmitButton;
