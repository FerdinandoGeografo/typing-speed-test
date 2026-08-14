import TestToolbar from "./TestToolbar";
import TestStatsBox from "./TestStatsBox";
import TestSettings from "./TestSettings";
import HiddenInput from "./HiddenInput";
import Passage from "./Passage";
import StartOverlay from "./StartOverlay";
import RestartButton from "./RestartButton";

import useTypingFocus from "../hooks/useTypingFocus";
import useTypingSpeedTest from "../hooks/useTypingSpeedTest";

export default function TestScreen() {
  const {
    state: { status },
    dispatch,
  } = useTypingSpeedTest();

  const inputRef = useTypingFocus(status);

  return (
    <section className="contents">
      <TestToolbar>
        <TestStatsBox />
        <TestSettings />
      </TestToolbar>

      <div
        className="relative min-h-120"
        onClick={() => inputRef.current?.focus()}
      >
        <HiddenInput inputRef={inputRef} />
        <Passage />
        {status === "idle" && (
          <StartOverlay onStart={() => dispatch({ type: "start" })} />
        )}
      </div>
      {status === "running" && (
        <footer className="flex justify-center border-t border-neutral-700 pt-5.75 lg:mt-8 lg:pt-7.75">
          <RestartButton className="hover: bg-neutral-800 text-white hover:bg-neutral-700">
            <span>Restart test</span>
          </RestartButton>
        </footer>
      )}
    </section>
  );
}
