import type { ReactNode } from "react";

export default function Header({ children }: { children: ReactNode }) {
  return (
    <header className="flex items-center justify-between gap-2">
      {children}
    </header>
  );
}
