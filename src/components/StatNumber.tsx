import { useRef } from "react";
import { useInView } from "framer-motion";
import NumberFlow from "@number-flow/react";

// Counts up from 0 the first time the stat scrolls into view.
export default function StatNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <span ref={ref}>
      <NumberFlow value={inView ? value : 0} suffix={suffix} willChange />
    </span>
  );
}
