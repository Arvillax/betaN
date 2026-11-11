/** Reduced-motion preference, read live so it follows OS changes. */
const query = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

export const prefersReducedMotion = () => Boolean(query?.matches);

/** @param {(reduced: boolean) => void} handler */
export function onReducedMotionChange(handler) {
  query?.addEventListener('change', (event) => handler(event.matches));
}
