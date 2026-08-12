import { useEffect, useRef } from "react";
import type { TestStatus } from "../models/typing-state.interface";

export default function useTypingFocus(status: TestStatus) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(
    function () {
      if (status === "running") ref.current?.focus();
    },
    [status],
  );

  return ref;
}
