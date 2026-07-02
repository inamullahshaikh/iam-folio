import { useEffect, useState } from "react";
import { titleOptions } from "../data/portfolio";

const TYPE_MS = 70;
const DELETE_MS = 40;
const PAUSE_MS = 2200;

export default function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = titleOptions[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && display.length < current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, display.length + 1));
      }, TYPE_MS);
    } else if (!deleting && display.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), PAUSE_MS);
    } else if (deleting && display.length > 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, display.length - 1));
      }, DELETE_MS);
    } else if (deleting && display.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % titleOptions.length);
    }

    return () => clearTimeout(timeout);
  }, [display, deleting, roleIndex]);

  return (
    <p
      className="mt-3 min-h-[1.75rem] text-base font-medium text-text-muted sm:min-h-[2rem] sm:text-xl"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="text-gradient-violet">{display}</span>
      <span
        className="ml-0.5 inline-block h-[1.1em] w-0.5 translate-y-px bg-accent opacity-80 align-middle"
        aria-hidden
      />
    </p>
  );
}
