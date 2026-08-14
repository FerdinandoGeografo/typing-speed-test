import type { RefObject } from "react";
import useTypingSpeedTest from "../hooks/useTypingSpeedTest";

export default function HiddenInput({
  inputRef,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
}) {
  const {
    state: { status, input },
    dispatch,
  } = useTypingSpeedTest();

  return (
    <>
      <label htmlFor="typing-test-input" className="sr-only">
        Typing test passage. Start typing to begin the test.
      </label>
      <input
        className="sr-only"
        ref={inputRef}
        id="typing-test-input"
        aria-describedby="typing-test-instructions"
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        disabled={status === "finished"}
        tabIndex={-1}
        value={input}
        onChange={(e) =>
          dispatch({ type: "input", payload: { value: e.target.value } })
        }
      />
      <p id="typing-test-instructions" className="sr-only">
        Type the passage shown below exactly as written. Your words per minute
        and accuracy will be announced when the test ends.
      </p>
    </>
  );
}
