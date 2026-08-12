import {
  DIFFICULTY_OPTIONS,
  MODE_OPTIONS,
  type Difficulty,
  type Mode,
} from "../models/typing-state.interface";

import TestStat from "./TestStat";
import Divider from "./Divider";
import ButtonGroup from "./ButtonGroup";
import Passage from "./Passage";
import StartOverlay from "./StartOverlay";
import RestartButton from "./RestartButton";

import useTypingFocus from "../hooks/useTypingFocus";
import useTypingSpeedTest from "../hooks/useTypingSpeedTest";

export default function TestScreen() {
  const {
    state: { status, difficulty, mode, input },
    wpm,
    accuracy,
    time,
    dispatch,
  } = useTypingSpeedTest();

  const inputRef = useTypingFocus(status);

  return (
    <section className="contents">
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-b-neutral-700 pb-3.75">
        <div className="flex flex-1 items-center gap-5 sm:flex-none sm:gap-6">
          <TestStat label="WPM" value={wpm} />
          <Divider />
          <TestStat label="Accuracy" value={`${accuracy}%`} />
          <Divider />
          <TestStat label="Time" value={time} />
        </div>

        <div className="flex flex-1 items-center gap-2.5 sm:flex-none sm:gap-4">
          <ButtonGroup
            label="Difficulty"
            options={DIFFICULTY_OPTIONS}
            selected={difficulty}
            onSelect={(value) =>
              dispatch({
                type: "setDifficulty",
                payload: { difficulty: value as Difficulty },
              })
            }
          />
          <Divider className="hidden sm:block" />
          <ButtonGroup
            label="Mode"
            options={MODE_OPTIONS}
            selected={mode}
            onSelect={(value) =>
              dispatch({ type: "setMode", payload: { mode: value as Mode } })
            }
          />
        </div>
      </div>

      <div
        className="relative h-auto min-h-120"
        onClick={() => inputRef.current?.focus()}
      >
        <input
          id="typing-test-input"
          aria-description="Type the passage shown below exactly as written. Your words per minute and accuracy will be announced when the test ends."
          className="absolute size-px opacity-0"
          ref={inputRef}
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          disabled={status !== "running"}
          value={input}
          onChange={(e) =>
            dispatch({ type: "input", payload: { value: e.target.value } })
          }
        />

        <Passage />

        {status === "idle" && (
          <StartOverlay onStart={() => dispatch({ type: "start" })} />
        )}
      </div>
      {status === "running" && (
        <footer className="mt-8 flex justify-center border-t border-neutral-700 pt-7.75">
          <RestartButton className="hover: bg-neutral-800 text-white hover:bg-neutral-700">
            <span>Restart test</span>
          </RestartButton>
        </footer>
      )}
    </section>
  );
}
