import { useEffect, useRef } from "react";
import type { TestStatus } from "../models/typing-test.types";

const INTERACTIVE_SELECTORS =
  "button, a, input, [role='radio'], [role='button']";

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

    function handlePointerDown(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest(INTERACTIVE_SELECTORS)) return;
      e.preventDefault();
      ref.current?.focus();
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [status]);

  return ref;
}
