import type { RefObject } from "react";
import type { CharacterState } from "../models/passage.types";

interface CharacterProps {
  char: string;
  state: CharacterState;
  hasCursor: boolean;
  ref?: RefObject<HTMLSpanElement | null>;
}

const CHAR_STATES_CLS: Record<CharacterState, string> = {
  pending: "text-neutral-400",
  valid: "text-green-500",
  invalid:
    "text-red-500 after:absolute after:bottom-0 after:left-0 after:h-0.75 after:w-full after:bg-red-500",
};

export default function Character({
  char,
  state,
  hasCursor,
  ref,
}: CharacterProps) {
  return (
    <span
      ref={ref}
      className={`relative transition-colors duration-300 ${CHAR_STATES_CLS[state]}`}
    >
      {char}
      {hasCursor && (
        <span
          aria-hidden="true"
          className="absolute -inset-x-0.5 top-1/2 h-8.5 -translate-y-1/2 rounded-sm bg-white/20 sm:h-10"
        ></span>
      )}
    </span>
  );
}
