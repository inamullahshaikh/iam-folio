import { Link } from "react-router-dom";
import { usePageMeta } from "../lib/usePageMeta";

export default function NotFound() {
  usePageMeta({ title: "Not found | Inamullah Shaikh" });

  return (
    <div className="mx-auto max-w-[720px] px-6 pt-24 pb-4">
      <p className="font-mono text-sm text-ink-faint">404</p>
      <h1 className="mt-3 text-[2rem] font-semibold text-ink">
        This page doesn't exist.
      </h1>
      <p className="mt-4 text-ink-soft">
        The link may be broken or the page moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block text-sm text-rust hover:underline hover:underline-offset-4"
      >
        ← Back home
      </Link>
    </div>
  );
}
