import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = (): Lenis | null => instance;

export const scrollToSection = (
  hash: string,
  options?: { duration?: number; offset?: number }
) => {
  const lenis = getLenis();
  const target = hash.startsWith("#") ? hash : `#${hash}`;

  if (lenis) {
    lenis.scrollTo(target, {
      duration: options?.duration ?? 1.4,
      offset: options?.offset ?? -16,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
    return;
  }

  if (typeof window !== "undefined") {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
