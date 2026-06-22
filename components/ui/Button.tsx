import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variants = {
  primary: "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-leaf",
  secondary: "bg-accent text-leaf shadow-lg shadow-accent/20 hover:bg-[#f6ad32]",
  ghost: "bg-white/70 text-leaf ring-1 ring-primary/15 hover:bg-white",
};

export function Button({ children, href, variant = "primary", className = "", ...props }: ButtonProps) {
  const classes = `focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition duration-300 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
