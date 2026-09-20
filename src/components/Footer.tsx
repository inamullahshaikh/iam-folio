import { footerCopy, personal } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="safe-bottom bg-bg-elevated px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-2 text-center text-xs text-text-muted sm:flex-row sm:justify-between">
        <p>&copy; 2026 {personal.full_name}</p>
        <p>{footerCopy.tagline}</p>
      </div>
    </footer>
  );
}
