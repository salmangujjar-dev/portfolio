"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const ScrollHint = () => {
  const [hidden, setHidden] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) setHidden(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (reduced) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={hidden ? { opacity: 0, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ delay: hidden ? 0 : 1.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      aria-hidden
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
        Scroll
      </span>
      <span className="relative flex h-9 w-5 items-start justify-center rounded-full border border-muted-foreground/40">
        <motion.span
          className="mt-1.5 block h-1.5 w-[3px] rounded-full bg-muted-foreground"
          animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        />
      </span>
    </motion.div>
  );
};

export default ScrollHint;
