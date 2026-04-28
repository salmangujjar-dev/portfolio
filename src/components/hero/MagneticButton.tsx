"use client";

import { type ReactNode, type ComponentProps } from "react";
import { motion } from "motion/react";

import { useMagnetic } from "@hooks/useMagnetic";
import { cn } from "@lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  strength?: number;
} & Omit<ComponentProps<"button">, "onClick" | "className" | "children">;

const MagneticButton = ({
  children,
  className,
  href,
  target,
  rel,
  onClick,
  strength = 0.4,
  ...rest
}: Props) => {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic<HTMLDivElement>({
    strength,
  });

  const inner = (
    <motion.span
      style={{ x, y }}
      className="relative inline-flex items-center gap-2 px-6 py-3 text-sm font-medium uppercase tracking-[0.18em]"
    >
      {children}
    </motion.span>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn(
        "group relative inline-flex cursor-pointer select-none rounded-full border border-accent/40 bg-accent/5 text-foreground transition-colors duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent",
        className
      )}
    >
      {href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          className="inline-flex"
        >
          {inner}
        </a>
      ) : (
        <button type="button" onClick={onClick} {...rest} className="inline-flex">
          {inner}
        </button>
      )}
    </motion.div>
  );
};

export default MagneticButton;
