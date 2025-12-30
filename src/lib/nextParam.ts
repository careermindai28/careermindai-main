export function withNext(url: string, next: string) {
  const u = new URL(url, "https://x.local");
  u.searchParams.set("next", next);
  return u.pathname + u.search;
}
