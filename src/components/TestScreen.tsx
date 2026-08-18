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
    <section className="flex h-full flex-col">
      <TestToolbar>
        <TestStatsBox />
        <TestSettings />
      </TestToolbar>

      <HiddenInput inputRef={inputRef} />

      <div className="relative min-h-20 overflow-hidden">
        <div
          className={`h-full px-4 pt-8 outline-none md:px-8 lg:px-28 ${status === "running" ? "overflow-y-auto pb-8 md:pb-6 lg:pb-16" : "overflow-hidden pb-6.5 md:pb-16 lg:pb-4"}`}
        >
          <Passage />
        </div>

        {status === "idle" && (
          <StartOverlay onStart={() => dispatch({ type: "start" })} />
        )}
      </div>

      {status === "running" && (
        <footer className="spacing-x flex shrink-0 justify-center border-t border-neutral-700 pt-5.75 pb-8 md:pb-10 lg:pt-7.75">
          <RestartButton className="bg-neutral-800 text-white hover:bg-neutral-700">
            <span>Restart test</span>
          </RestartButton>
        </footer>
      )}
    </section>
  );
}
