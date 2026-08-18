import { useEffect, useRef } from "react";
import useTypingSpeedTest from "../hooks/useTypingSpeedTest";
import Character from "./Character";
import { getCharState } from "../utils/helpers";

export default function Passage() {
  const {
    state: {
      status,
      input,
      passage: { id, text },
    },
  } = useTypingSpeedTest();
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (status !== "running") return;
    cursorRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [input, status]);

  const passageChars = text.split("");

  return (
    <p
      className={`text-4xl leading-[43.8px] tracking-normal whitespace-break-spaces text-neutral-400 transition-all duration-300 sm:text-5xl sm:leading-13.5 ${status === "idle" ? "blur-lg" : ""}`}
      aria-hidden="true"
    >
      {passageChars.map((char, index) => {
        const hasCursor = status === "running" && index === input.length;
        const charState = getCharState(char, input, index);

        return (
          <Character
            key={`${id}-${index}`}
            ref={index === input.length ? cursorRef : undefined}
            char={char}
            state={charState}
            hasCursor={hasCursor}
          />
        );
      })}
    </p>
  );
}
