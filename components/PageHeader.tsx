import Link from "next/link";
import type { ReactNode } from "react";

interface PageHeaderProps {
  children?: ReactNode;
}

export function PageHeader({ children }: PageHeaderProps) {
  return (
    <header className="border-b border-stone-200/80 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-serif text-[15px] tracking-tight text-stone-800 transition-colors hover:text-stone-600"
        >
          Research Compass
        </Link>
        {children}
      </div>
    </header>
  );
}
