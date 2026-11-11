/** Thin DOM helpers. Keep them generic: no feature knowledge here. */

/**
 * @template {Element} T
 * @param {string} selector
 * @param {ParentNode} [root]
 * @returns {T | null}
 */
export const qs = (selector, root = document) => root.querySelector(selector);

/**
 * @template {Element} T
 * @param {string} selector
 * @param {ParentNode} [root]
 * @returns {T[]}
 */
export const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

/** Reads a CSS custom property from :root, e.g. cssVar('--sky') → '#028EFD'. */
export const cssVar = (name, element = document.documentElement) =>
  getComputedStyle(element).getPropertyValue(name).trim();

/** Spanish number format with fixed decimals: 0.62 → "0,62". */
export const formatNumber = (value, digits = 2) =>
  new Intl.NumberFormat('es', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
