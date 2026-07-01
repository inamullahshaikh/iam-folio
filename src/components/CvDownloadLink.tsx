import type { ReactNode } from "react";
import { personal } from "../data/portfolio";

export default function CvDownloadLink({
  className = "link-rust",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a
      href={personal.cv.href}
      download={personal.cv.downloadName}
      className={className}
    >
      {children ?? personal.cv.label}
    </a>
  );
}
