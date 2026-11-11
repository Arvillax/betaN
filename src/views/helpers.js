/**
 * Handlebars helpers. Presentation-only logic; content stays in src/content.
 */
export const helpers = {
  /** Two-digit slide number from a zero-based index: 0 → "01". */
  pad: (index) => String(Number(index) + 1).padStart(2, '0'),
  /** Zero-padded total, e.g. total of 9 → "09". */
  padTotal: (list) => String(list?.length ?? 0).padStart(2, '0'),
  eq: (a, b) => a === b,
};
