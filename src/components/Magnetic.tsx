import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// Critically damped (damping = 2 * sqrt(stiffness * mass)): follows without overshoot
const spring = { stiffness: 150, damping: 8, mass: 0.1 };

// Pulls its child toward the cursor. Motion values bypass React renders.
export default function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0)`;

  const onPointerMove = (event: React.PointerEvent) => {
    if (reduced || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ transform }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className="flex sm:inline-flex"
    >
      {children}
    </motion.div>
  );
}
