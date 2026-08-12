import { useEffect, useState } from "react";

export default function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(function () {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? (JSON.parse(storedValue) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(
    () => localStorage.setItem(key, JSON.stringify(value)),
    [key, value],
  );

  return [value, setValue];
}
