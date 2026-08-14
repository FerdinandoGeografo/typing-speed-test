import { useEffect, useRef } from "react";
import type { TestStatus } from "../models/typing-test.types";

const INTERACTIVE_SELECTORS = "button, a, input";

export default function useTypingFocus(status: TestStatus) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(
    function () {
      if (status === "running") ref.current?.focus();
    },
    [status],
  );

  useEffect(() => {
    if (status !== "running") return;

    function handleMouseDown(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest(INTERACTIVE_SELECTORS)) {
        console.log("Closest");
        return;
      }
      ref.current?.focus();
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [status]);

  return ref;
}
