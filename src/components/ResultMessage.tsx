import type { RefObject } from "react";

interface ResultMessageProps {
  title: string;
  message: string;
  headingRef: RefObject<HTMLHeadingElement | null>;
}

export default function ResultMessage({
  title,
  message,
  headingRef,
}: ResultMessageProps) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <h2
        id="test-result-heading"
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl leading-7.25 font-bold tracking-[-.32px] text-white capitalize sm:text-5xl sm:leading-13.5 sm:tracking-normal"
      >
        {title}
      </h2>
      <p className="sm:tracking-tightest text-center leading-4.75 tracking-tight text-neutral-400 sm:text-xl sm:leading-6">
        {message}
      </p>
    </div>
  );
}
