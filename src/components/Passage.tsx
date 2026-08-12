import useTypingSpeedTest from "../hooks/useTypingSpeedTest";
import Character from "./Character";

export default function Passage() {
  const {
    state: {
      passage: { id, text },
    },
  } = useTypingSpeedTest();
  const passageChars = text.split("");

  return (
    <p
      className="text-5xl leading-13.5 tracking-normal text-neutral-400"
      aria-hidden="true"
    >
      {passageChars.map((char, index) => (
        <Character key={`${id}-${index}`} char={char} index={index} />
      ))}
    </p>
  );
}
