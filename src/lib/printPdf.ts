export function printPdf() {
  if (typeof window === "undefined") return;
  window.print();
}
