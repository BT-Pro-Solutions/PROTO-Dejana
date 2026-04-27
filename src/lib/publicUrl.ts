/**
 * URL for a file served from `public/` (e.g. `public/assets/...`).
 * Uses Vite `base` so paths work on GitHub Pages (`/repo-name/`) and locally (`/`).
 */
export function publicUrl(path: string): string {
  const trimmed = path.startsWith('/') ? path.slice(1) : path
  const base = import.meta.env.BASE_URL
  const withSlash = base.endsWith('/') ? base : `${base}/`
  return withSlash + trimmed
}
