import useTypingSpeedTest from "../hooks/useTypingSpeedTest";
import type { CharacterState } from "../models/passage.interface";

interface CharacterProps {
  char: string;
  index: number;
}

const CHAR_STATES_CLS: Record<CharacterState, string> = {
  pending: "text-neutral-400",
  valid: "text-green-500",
  invalid:
    "text-red-500 after:absolute after:bottom-0 after:left-0 after:h-0.75 after:w-full after:bg-red-500",
};

export default function Character({ char, index }: CharacterProps) {
  const {
    state: { input },
  } = useTypingSpeedTest();

  const typedChar = input.at(index);
  const charState: CharacterState =
    typedChar === undefined
      ? "pending"
      : typedChar === char
        ? "valid"
        : "invalid";
  const hasCursor = index === input.length;

  return (
    <span className={`relative ${CHAR_STATES_CLS[charState]}`}>
      {char}
      {hasCursor && (
        <span
          aria-hidden="true"
          className="absolute -inset-x-0.5 top-1/2 h-10 -translate-y-1/2 rounded-sm bg-white/20"
        ></span>
      )}
    </span>
  );
}
