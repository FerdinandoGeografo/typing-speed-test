import type { ButtonHTMLAttributes, ReactNode } from "react";

interface SelectButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  selected?: boolean;
}

export default function SelectButton({
  children,
  selected = false,
  onClick,
  className = "",
}: SelectButtonProps) {
  return (
    <button
      className={`cursor-pointer rounded-lg border px-2.25 py-1.25 leading-4.75 transition-all duration-300 hover:border-blue-400 hover:text-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black focus:outline-none ${selected ? "border-blue-400 text-blue-400 focus:border-blue-400 focus:text-blue-400" : "border-neutral-500 text-white focus:border-white focus:text-white"} ${className}`}
      onClick={(e) => onClick?.(e)}
    >
      {children}
    </button>
  );
}
