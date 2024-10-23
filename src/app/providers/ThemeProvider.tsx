import React, {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from "react";

import { clsxm } from "@utils/clsxm";
import useLocalStorage from "../../hooks/useLocalStorage";

export type TThemeProvider = {
  children: ReactNode;
  defaultTheme: "light" | "dark";
};

type TThemeContext = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<TThemeContext | null>(null);

export default function ThemeProvider({ children }: PropsWithChildren) {
  const { storedValue, setValue } = useLocalStorage("theme", "dark");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setValue("theme", newTheme);
  };

  useEffect(() => {
    if (storedValue) {
      setTheme(storedValue as TThemeContext["theme"]);
    }
  }, [storedValue]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={clsxm({
          "dark text-foreground bg-background": theme !== "light",
        })}
      >
        {children}
      </div>
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
