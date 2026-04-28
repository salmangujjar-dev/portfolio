"use client";

import React, {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from "react";

import useLocalStorage from "@hooks/useLocalStorage";

export type TThemeProvider = {
  children: ReactNode;
  defaultTheme: "light" | "dark";
};

type TThemeContext = {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
};

const ThemeContext = React.createContext<TThemeContext | null>(null);

const applyDocumentTheme = (theme: "light" | "dark") => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
};

export default function ThemeProvider({ children }: PropsWithChildren) {
  const { storedValue, setValue } = useLocalStorage("theme", "dark");
  const [theme, setThemeState] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (storedValue === "light" || storedValue === "dark") {
      setThemeState(storedValue);
      applyDocumentTheme(storedValue);
    } else {
      applyDocumentTheme("dark");
    }
  }, [storedValue]);

  const setTheme = (next: "light" | "dark") => {
    setThemeState(next);
    setValue("theme", next);
    applyDocumentTheme(next);
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
