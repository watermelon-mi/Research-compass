import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-stone-200/80 bg-white p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
