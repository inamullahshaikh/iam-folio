import { useEffect, useRef } from "react";
import { cursorPointer } from "../lib/cursorState";

type CursorPosition = {
  x: number;
  y: number;
};

const LERP = 0.1;
const MIN_DELTA = 0.0008;
const FRAME_MS = 1000 / 30;

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

export function useCursorBackground(enabled: boolean) {
  const target = useRef<CursorPosition>({ x: 0.5, y: 0.5 });
  const current = useRef<CursorPosition>({ x: 0.5, y: 0.5 });
  const frame = useRef<number>();
  const lastFrame = useRef(0);
  const running = useRef(false);

  useEffect(() => {
    const root = document.documentElement;

    const clearCursorVars = () => {
      root.removeAttribute("data-cursor-motion");
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

    if (!enabled) {
      clearCursorVars();
      return;
    }

    root.setAttribute("data-cursor-motion", "true");

    const stop = () => {
      running.current = false;
      if (frame.current) {
        cancelAnimationFrame(frame.current);
        frame.current = undefined;
      }
    };

    const writeVars = (px: number, py: number) => {
      const offsetX = (px - 0.5) * 2;
      const offsetY = (py - 0.5) * 2;

      cursorPointer.x = px;
      cursorPointer.y = py;

      root.style.setProperty("--cursor-x", `${px * 100}%`);
      root.style.setProperty("--cursor-y", `${py * 100}%`);
      root.style.setProperty("--cursor-offset-x", offsetX.toFixed(4));
      root.style.setProperty("--cursor-offset-y", offsetY.toFixed(4));
      root.style.setProperty("--cursor-ratio-x", px.toFixed(4));
      root.style.setProperty("--cursor-ratio-y", py.toFixed(4));
      root.style.setProperty("--cursor-parallax-x", `${offsetX * 24}px`);
      root.style.setProperty("--cursor-parallax-y", `${offsetY * 18}px`);
      root.style.setProperty("--cursor-tilt-x", `${offsetY * -4}deg`);
      root.style.setProperty("--cursor-tilt-y", `${offsetX * 5}deg`);
      root.style.setProperty(
        "--cursor-depth",
        `${Math.max(Math.abs(offsetX), Math.abs(offsetY)).toFixed(3)}`
      );
    };

    const tick = (time: number) => {
      if (!running.current || document.hidden) {
        stop();
        return;
      }

      const elapsed = time - lastFrame.current;
      if (elapsed < FRAME_MS) {
        frame.current = requestAnimationFrame(tick);
        return;
      }
      lastFrame.current = time;

      const prev = { ...current.current };
      current.current = {
        x: lerp(current.current.x, target.current.x, LERP),
        y: lerp(current.current.y, target.current.y, LERP),
      };

      const dx = Math.abs(current.current.x - prev.x);
      const dy = Math.abs(current.current.y - prev.y);
      const settled =
        Math.abs(current.current.x - target.current.x) < MIN_DELTA &&
        Math.abs(current.current.y - target.current.y) < MIN_DELTA;

      if (dx > MIN_DELTA || dy > MIN_DELTA) {
        writeVars(current.current.x, current.current.y);
      }

      if (!settled) {
        frame.current = requestAnimationFrame(tick);
      } else {
        frame.current = undefined;
        running.current = false;
      }
    };

    const start = () => {
      if (running.current) return;
      running.current = true;
      lastFrame.current = 0;
      frame.current = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      target.current = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      };
      start();
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      clearCursorVars();
    };
  }, [enabled]);
}
