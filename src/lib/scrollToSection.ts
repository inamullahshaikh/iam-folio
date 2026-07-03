export function scrollToSection(sectionId: string) {
  const target = document.getElementById(sectionId);
  if (!target) return false;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}
