import type { ButtonHTMLAttributes, ReactNode } from "react";

interface SelectButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  selected?: boolean;
}

export default function SelectButton({
  children,
  selected = false,
  disabled = false,
  className = "",
  onClick,
}: SelectButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={(e) => onClick?.(e)}
      className={`cursor-pointer rounded-lg border px-2.25 py-1.25 leading-4.75 transition-all duration-300 not-disabled:hover:border-blue-400 not-disabled:hover:text-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black focus:outline-none disabled:cursor-not-allowed ${selected ? "border-blue-400 text-blue-400 focus:border-blue-400 focus:text-blue-400" : "border-neutral-500 text-white focus:border-white focus:text-white disabled:text-white/90"} ${className}`}
    >
      {children}
    </button>
  );
}
