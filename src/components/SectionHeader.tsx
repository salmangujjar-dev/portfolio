"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@lib/utils";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground"
      >
        <span className="block h-px w-8 bg-muted-foreground/60" />
        {eyebrow}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="font-display text-fluid-3xl font-semibold leading-[1.05] tracking-editorial text-balance"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="max-w-xl text-fluid-base leading-relaxed text-muted-foreground text-pretty"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
