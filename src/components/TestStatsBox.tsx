import useTypingSpeedTest from "../hooks/useTypingSpeedTest";
import type { Mode } from "../models/typing-test.types";
import Accuracy from "./Accuracy";
import Divider from "./Divider";
import TestStat from "./TestStat";

export default function TestStatsBox() {
  const {
    state: { mode, seconds },
    wpm,
    accuracy,
    time,
  } = useTypingSpeedTest();

  function getTimedStateClass(mode: Mode, seconds: number) {
    if (mode !== "timed") return "";
    if (seconds <= 20) return "text-red-500";
    if (seconds <= 50) return "text-yellow-400";
    return "";
  }

  return (
    <div className="flex flex-1 items-center gap-5 sm:flex-none sm:gap-6">
      <TestStat label="WPM">{wpm}</TestStat>
      <Divider />
      <TestStat label="Accuracy">
        <Accuracy accuracy={accuracy} />
      </TestStat>
      <Divider />
      <TestStat label="Time">
        <span
          className={`transition-colors duration-300 ${getTimedStateClass(mode, seconds)}`}
        >
          {time}
        </span>
      </TestStat>
    </div>
  );
}
