import type { ReactNode } from "react";

export default function Header({ children }: { children: ReactNode }) {
  return (
    <header className="spacing-x flex items-center justify-between gap-2 pt-4 md:pt-8">
      {children}
    </header>
  );
}
