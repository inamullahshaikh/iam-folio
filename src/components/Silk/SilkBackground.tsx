import { useEffect, useState } from "react";
import { useCursorMotionEnabled } from "../../hooks/useCursorMotionEnabled";
import Silk from "./Silk";

export default function SilkBackground() {
  const cursorEnabled = useCursorMotionEnabled();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setEnabled(!reducedMotion.matches);
    };

    update();
    reducedMotion.addEventListener("change", update);
    return () => reducedMotion.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <Silk
        speed={5}
        scale={1}
        color="#7B7481"
        noiseIntensity={1.5}
        rotation={0}
        className={`h-full w-full ${cursorEnabled ? "hero-silk-shell" : ""}`}
      />
      <div className="absolute inset-0 bg-bg/55" />
      <div className="absolute inset-0 glow-spot opacity-60" />
    </div>
  );
}
