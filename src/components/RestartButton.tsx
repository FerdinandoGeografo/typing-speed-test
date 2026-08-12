import type { ReactNode } from "react";
import Button from "./Button";
import useTypingSpeedTest from "../hooks/useTypingSpeedTest";

export default function RestartButton({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { dispatch } = useTypingSpeedTest();

  return (
    <Button
      variation="secondary"
      className={className}
      onClick={() => dispatch({ type: "restart" })}
    >
      {children}
      <svg className="size-5" role="presentation" aria-hidden="true">
        <use href="/icons.svg#restart"></use>
      </svg>
    </Button>
  );
}
