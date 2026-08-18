import { useEffect, useRef, useState } from "react";
import useTypingSpeedTest from "../hooks/useTypingSpeedTest";
import RestartButton from "./RestartButton";
import ResultMessage from "./ResultMessage";
import ResultStat from "./ResultStat";
import { calculateResultType } from "../utils/helpers";
import Confetti from "./Confetti";
import Accuracy from "./Accuracy";
import { RESULT_MESSAGES } from "../constants/result-messages";

export default function ResultScreen() {
  const {
    state: { errors },
    correctChars,
    wpm,
    bestWpm,
    accuracy,
    submitBest,
  } = useTypingSpeedTest();
  const [previousBest] = useState(() => bestWpm);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);
  useEffect(() => submitBest(wpm), [submitBest, wpm]);

  const resultType = calculateResultType(wpm, previousBest);
  const { title, message } = RESULT_MESSAGES[resultType];

  return (
    <section
      className="spacing-x relative flex flex-col items-center gap-6 pt-2 sm:gap-8 md:mt-10 lg:mt-0"
      aria-labelledby="test-result-heading"
    >
      {resultType === "record" ? (
        <>
          <Confetti />
          <svg
            className="mt-4 mb-2 size-16 sm:mt-0 sm:mb-6 sm:size-20 lg:mb-0"
            role="presentation"
            aria-hidden="true"
          >
            <use href="/icons.svg#new-pb"></use>
          </svg>
        </>
      ) : (
        <>
          <img
            className="absolute top-11 left-0.5 size-5.25 sm:size-auto md:top-11 md:left-4 lg:top-29 lg:-left-0.75"
            src="pattern-star-2.svg"
            alt=""
          />
          <img
            className="absolute right-3.25 -bottom-20.75 size-9.75 sm:size-auto md:right-0 md:-bottom-12.5 lg:right-0.5 lg:bottom-9"
            src="pattern-star-1.svg"
            alt=""
          />
          <svg
            className="my-4 size-12 rounded-full ring-[7.5px] ring-green-500/10 ring-offset-[7.5px] ring-offset-green-500/20 sm:my-6 sm:size-16 sm:ring-16 sm:ring-offset-16"
            role="presentation"
            aria-hidden="true"
          >
            <use href="/icons.svg#completed"></use>
          </svg>
        </>
      )}

      <ResultMessage title={title} message={message} headingRef={headingRef} />

      <p role="status" aria-live="polite" className="sr-only">
        {title}: {wpm} words per minute, {accuracy} percent accuracy,
        {correctChars} correct and {errors} incorrect characters.
      </p>

      <div className="grid grid-cols-1 gap-4 self-stretch pb-4 sm:grid-cols-3 sm:gap-5 sm:pt-5 sm:pb-8 md:grid-cols-[160px_160px_160px] md:self-center">
        <ResultStat label="WPM">{wpm}</ResultStat>
        <ResultStat label="Accuracy">
          <Accuracy accuracy={accuracy} />
        </ResultStat>
        <ResultStat label="Characters">
          <span className="text-green-500">{correctChars}</span>
          <span className="text-neutral-400">/</span>
          <span className="text-red-500">{errors}</span>
        </ResultStat>
      </div>

      <RestartButton>
        <span>{resultType === "normal" ? "Go again" : "Beat this score"}</span>
      </RestartButton>
    </section>
  );
}
