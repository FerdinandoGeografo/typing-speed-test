import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariation = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variation?: ButtonVariation;
}

const BUTTON_VARIATIONS: Record<ButtonVariation, string> = {
  primary: "text-neutral-0 bg-blue-600 px-6 hover:bg-blue-400",
  secondary: "text-neutral-900 bg-neutral-0 gap-2.5 px-4 hover:bg-neutral-0/90",
};

export default function Button({
  children,
  variation = "primary",
  type = "button",
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      className={`flex h-14 cursor-pointer items-center justify-center rounded-xl text-xl leading-6 font-semibold tracking-[-.3px] capitalize transition-all duration-300 focus:ring-2 focus:ring-blue-400 focus:ring-offset-[3px] focus:ring-offset-black focus:outline-none ${BUTTON_VARIATIONS[variation]} ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
