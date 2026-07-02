export default function ScrollIndicator() {
  return (
    <a
      href="#stats"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted transition-colors hover:text-accent"
      aria-label="Scroll to stats"
    >
      <svg
        className="h-6 w-6 scroll-hint"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </a>
  );
}
