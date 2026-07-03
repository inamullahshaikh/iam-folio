import { useCursorBackground } from "../hooks/useCursorBackground";
import { useCursorMotionEnabled } from "../hooks/useCursorMotionEnabled";

export default function CursorBackground() {
  const enabled = useCursorMotionEnabled();

  useCursorBackground(enabled);

  return (
    <div
      className={`cursor-bg pointer-events-none fixed inset-0 z-0 overflow-hidden ${enabled ? "cursor-bg-active" : ""}`}
      aria-hidden
    >
      <div className="cursor-bg-base" />
      <div className="cursor-bg-orb cursor-bg-orb-primary" />
      <div className="cursor-bg-orb cursor-bg-orb-secondary" />
      <div className="cursor-bg-vignette" />
    </div>
  );
}
