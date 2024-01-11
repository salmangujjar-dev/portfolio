import { useEffect, useState } from "react";
import tailwindConfig from "../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

const config = resolveConfig(tailwindConfig);

export enum EScreenType {
  xxl = "2xl",
  lg = "lg",
  md = "md",
  sm = "sm",
  xl = "xl",
}

export function useMediaQuery(query: EScreenType): boolean {
  const screens = config.theme?.screens as any;
  const me = `(min-width: ${screens[query]})`;

  const getMatches = (): boolean => {
    if (typeof window !== "undefined") {
      return window.matchMedia(me).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches());

  function handleChange() {
    setMatches(getMatches());
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(me);

    handleChange();
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  return matches;
}
