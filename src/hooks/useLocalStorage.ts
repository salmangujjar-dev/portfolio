import { useState } from "react";

// Module-level cache for localStorage reads (7.5 - Cache Storage API Calls)
const storageCache = new Map<string, string | null>();

function useLocalStorage<T>(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      if (typeof window !== "undefined") {
        // Check cache first
        if (storageCache.has(key)) {
          return storageCache.get(key) ?? initialValue;
        }
        const item = window.localStorage.getItem(key);
        const value = item ? item : initialValue;
        storageCache.set(key, item);
        return value;
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
        // Keep cache in sync
        storageCache.set(key, value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { storedValue, setValue } as const;
}

// Invalidate cache on external changes
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key) {
      storageCache.delete(e.key);
    }
  });
}

export default useLocalStorage;
