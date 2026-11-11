/** Small numeric helpers shared by features. No DOM access. */

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const lerp = (from, to, t) => from + (to - from) * t;

/**
 * Frame-rate independent easing toward a target.
 * @param {number} current
 * @param {number} target
 * @param {number} lambda higher = faster
 * @param {number} dt seconds since last frame
 */
export const damp = (current, target, lambda, dt) => lerp(current, target, 1 - Math.exp(-lambda * dt));

/**
 * Parses `#rgb` or `#rrggbb` into WebGL-ready channels in 0..1.
 * @returns {[number, number, number]}
 */
export function hexToRgb(hex) {
  let value = hex.trim().replace('#', '');
  if (value.length === 3) value = [...value].map((c) => c + c).join('');
  const int = Number.parseInt(value, 16);
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
}
