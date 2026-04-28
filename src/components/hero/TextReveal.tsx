"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

import { cn } from "@lib/utils";

type Props = {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
};

const parentVariants: Variants = {
  hidden: {},
  visible: (custom: { delay: number; stagger: number }) => ({
    transition: {
      delayChildren: custom.delay,
      staggerChildren: custom.stagger,
    },
  }),
};

const childVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { type: "spring", stiffness: 220, damping: 22, mass: 0.6 },
  },
};

const TextReveal = ({
  text,
  className,
  charClassName,
  delay = 0,
  stagger = 0.035,
  as = "span",
}: Props) => {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.span;

  if (reduced) {
    const Static = as as keyof JSX.IntrinsicElements;
    return <Static className={className}>{text}</Static>;
  }

  const words = text.split(" ");

  return (
    <Tag
      className={cn("inline-flex flex-wrap", className)}
      variants={parentVariants}
      initial="hidden"
      animate="visible"
      custom={{ delay, stagger }}
      aria-label={text}
    >
      {words.map((word, w) => (
        <span
          key={w}
          className="inline-flex whitespace-nowrap"
          aria-hidden
        >
          {word.split("").map((char, c) => (
            <span
              key={c}
              className="inline-block overflow-hidden leading-[1.05]"
            >
              <motion.span
                variants={childVariants}
                className={cn("inline-block will-change-transform", charClassName)}
              >
                {char}
              </motion.span>
            </span>
          ))}
          {w < words.length - 1 && (
            <span className="inline-block w-[0.35em]" aria-hidden />
          )}
        </span>
      ))}
    </Tag>
  );
};

export default TextReveal;
