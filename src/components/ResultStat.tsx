import type { ReactNode } from "react";

export default function ResultStat({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg px-6 py-4 inset-ring inset-ring-neutral-700">
      <span className="tracking-tightest text-xl leading-6 text-neutral-400">
        {label}
      </span>
      <span className="text-2xl leading-6 font-bold text-white">
        {children}
      </span>
    </div>
  );
}
