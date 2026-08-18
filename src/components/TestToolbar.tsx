import type { ReactNode } from "react";

export default function TestToolbar({ children }: { children: ReactNode }) {
  return (
    <div className="spacing-x flex flex-col gap-4 border-b border-b-neutral-700 pt-2 pb-3.75 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-5">
      {children}
    </div>
  );
}
