import { useState } from "react";

export default function usePrefersReducedMotion() {
  const [prefers] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  return prefers;
}
