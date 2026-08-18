import type { AnchorHTMLAttributes, ReactNode } from "react";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export default function Link({
  children,
  href = "#",
  target = "_blank",
  ...props
}: LinkProps) {
  return (
    <a
      className="group relative leading-5 tracking-tight text-blue-400 focus:outline-none"
      href={href}
      target={target}
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px h-px scale-x-0 bg-current transition-all duration-300 group-hover:scale-x-100 group-focus:scale-x-100"
      ></span>
    </a>
  );
}
