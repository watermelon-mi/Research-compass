import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  href?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-stone-800 text-stone-50 hover:bg-stone-700 border border-stone-800",
  secondary:
    "bg-white text-stone-800 hover:bg-stone-50 border border-stone-300",
  ghost: "bg-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-transparent",
};

export function Button({
  variant = "primary",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-500 disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
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
