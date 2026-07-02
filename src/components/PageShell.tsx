import type { ReactNode } from "react";

export default function PageShell({
  children,
  narrow = false,
  className = "",
}: {
  children: ReactNode;
  narrow?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${narrow ? "prose-shell" : "page-shell"} pb-8 pt-10 sm:pb-12 sm:pt-16 ${className}`}
    >
      {children}
    </div>
  );
}
