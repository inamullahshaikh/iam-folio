import { useEffect, useRef } from "react";

type CursorPosition = {
  x: number;
  y: number;
};

const LERP = 0.08;

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

export function useCursorBackground(enabled: boolean) {
  const target = useRef<CursorPosition>({ x: 0.5, y: 0.5 });
  const current = useRef<CursorPosition>({ x: 0.5, y: 0.5 });
  const frame = useRef<number>();

  useEffect(() => {
    if (!enabled) {
      document.documentElement.style.removeProperty("--cursor-x");
      document.documentElement.style.removeProperty("--cursor-y");
      document.documentElement.style.removeProperty("--cursor-offset-x");
      document.documentElement.style.removeProperty("--cursor-offset-y");
      document.documentElement.style.removeProperty("--cursor-parallax-x");
      document.documentElement.style.removeProperty("--cursor-parallax-y");
      document.documentElement.style.removeProperty("--cursor-ratio-x");
      document.documentElement.style.removeProperty("--cursor-ratio-y");
      document.documentElement.style.removeProperty("--cursor-tilt-x");
      document.documentElement.style.removeProperty("--cursor-tilt-y");
      document.documentElement.style.removeProperty("--cursor-depth");
      return;
    }

    const root = document.documentElement;

    const onPointerMove = (event: PointerEvent) => {
      target.current = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      };
    };

    const tick = () => {
      current.current = {
        x: lerp(current.current.x, target.current.x, LERP),
        y: lerp(current.current.y, target.current.y, LERP),
      };

      const px = current.current.x;
      const py = current.current.y;
      const offsetX = (px - 0.5) * 2;
      const offsetY = (py - 0.5) * 2;

      root.style.setProperty("--cursor-x", `${px * 100}%`);
      root.style.setProperty("--cursor-y", `${py * 100}%`);
      root.style.setProperty("--cursor-offset-x", offsetX.toFixed(4));
      root.style.setProperty("--cursor-offset-y", offsetY.toFixed(4));
      root.style.setProperty("--cursor-ratio-x", String(px));
      root.style.setProperty("--cursor-ratio-y", String(py));
      root.style.setProperty("--cursor-parallax-x", `${offsetX * 32}px`);
      root.style.setProperty("--cursor-parallax-y", `${offsetY * 24}px`);
      root.style.setProperty("--cursor-tilt-x", `${offsetY * -6}deg`);
      root.style.setProperty("--cursor-tilt-y", `${offsetX * 8}deg`);
      root.style.setProperty("--cursor-depth", `${Math.max(Math.abs(offsetX), Math.abs(offsetY))}`);

      frame.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frame.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame.current) cancelAnimationFrame(frame.current);
      root.style.removeProperty("--cursor-x");
      root.style.removeProperty("--cursor-y");
      root.style.removeProperty("--cursor-offset-x");
      root.style.removeProperty("--cursor-offset-y");
      root.style.removeProperty("--cursor-parallax-x");
      root.style.removeProperty("--cursor-parallax-y");
      root.style.removeProperty("--cursor-ratio-x");
      root.style.removeProperty("--cursor-ratio-y");
      root.style.removeProperty("--cursor-tilt-x");
      root.style.removeProperty("--cursor-tilt-y");
      root.style.removeProperty("--cursor-depth");
    };
  }, [enabled]);
}
