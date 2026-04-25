"use client";

import { useRef, type MouseEvent } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "motion/react";

type Options = {
  strength?: number;
  stiffness?: number;
  damping?: number;
};

export const useMagnetic = <T extends HTMLElement = HTMLDivElement>({
  strength = 0.35,
  stiffness = 150,
  damping = 15,
}: Options = {}) => {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness, damping, mass: 0.5 });
  const springY = useSpring(y, { stiffness, damping, mass: 0.5 });

  const onMouseMove = (e: MouseEvent<T>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, x: springX, y: springY, onMouseMove, onMouseLeave };
};
