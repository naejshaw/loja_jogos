export function resolveMedia(s?: string): string {
  if (!s) return '';
  if (s.startsWith('/')) return `http://localhost:3001${s}`;
  return s;
}
