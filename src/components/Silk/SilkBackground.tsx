import { useEffect, useState } from "react";
import { useCursorMotionEnabled } from "../../hooks/useCursorMotionEnabled";
import Silk from "./Silk";

export default function SilkBackground() {
  const [desktopEnabled, setDesktopEnabled] = useState(false);
  const cursorEnabled = useCursorMotionEnabled();

  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");
    const update = () => setDesktopEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const enabled = desktopEnabled && cursorEnabled;

  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <Silk
        speed={5}
        scale={1}
        color="#7B7481"
        noiseIntensity={1.5}
        rotation={0}
        className="h-full w-full hero-silk-shell"
      />
      <div className="absolute inset-0 bg-bg/55" />
      <div className="absolute inset-0 glow-spot opacity-60" />
    </div>
  );
}
