import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? item : initialValue;
      } else {
        return initialValue;
      }
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (key: string, value: string) => {
    try {
      if (typeof window !== "undefined") {
        setStoredValue(value);
        window.localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { storedValue, setValue } as const;
}

export default useLocalStorage;
