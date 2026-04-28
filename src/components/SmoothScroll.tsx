"use client";

import { useEffect, type PropsWithChildren } from "react";
import Lenis from "lenis";

import { setLenis } from "@lib/lenis";

const SmoothScroll = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    setLenis(lenis);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    if (window.location.hash) {
      const hash = window.location.hash;
      const settle = window.setTimeout(() => {
        lenis.scrollTo(hash, { duration: 1.4, offset: -16 });
      }, 80);
      return () => {
        window.clearTimeout(settle);
        cancelAnimationFrame(rafId);
        setLenis(null);
        lenis.destroy();
      };
    }

    return () => {
      cancelAnimationFrame(rafId);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
