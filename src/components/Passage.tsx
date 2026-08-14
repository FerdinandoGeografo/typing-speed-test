import useTypingSpeedTest from "../hooks/useTypingSpeedTest";
import Character from "./Character";

export default function Passage() {
  const {
    state: {
      status,
      passage: { id, text },
    },
  } = useTypingSpeedTest();
  const passageChars = text.split("");

  return (
    <p
      className={`text-4xl leading-[43.8px] tracking-normal whitespace-break-spaces text-neutral-400 transition-all duration-300 sm:text-5xl sm:leading-13.5 ${status === "idle" ? "blur-[10px]" : ""}`}
      aria-hidden="true"
    >
      {passageChars.map((char, index) => (
        <Character key={`${id}-${index}`} char={char} index={index} />
      ))}
    </p>
  );
}
