/**
 * Simplified similarity score from ADR-006: weighted distance without the correlation term,
 * Gower rule for missing data, and a bell curve that maps distance to a 0..1 score.
 * Pure functions: no DOM, safe to test with `node --test`.
 */

/** @typedef {'coincide'|'parcial'|'difiere'|'sin-dato'} Verdict */

const MATCH_THRESHOLD = 0.75;
const PARTIAL_THRESHOLD = 0.4;

/** Bell curve: distance 0 → 1, grows → 0. */
export function similarityFromDistance(distance) {
  return Math.exp(-(distance * distance) / 2);
}

/** @returns {Verdict} */
export function verdictFor(similarity) {
  if (similarity >= MATCH_THRESHOLD) return 'coincide';
  if (similarity >= PARTIAL_THRESHOLD) return 'parcial';
  return 'difiere';
}

/**
 * @param {Record<string, number|null>} differences normalized distance per variable; null = no data
 * @param {Record<string, number>} weights raw weights per variable (any scale)
 */
export function scoreSite(differences, weights) {
  const weighted = Object.keys(differences).filter((id) => (weights[id] ?? 0) > 0);
  const available = weighted.filter((id) => differences[id] !== null);
  const weightSum = available.reduce((sum, id) => sum + weights[id], 0);

  const breakdown = Object.keys(differences).map((id) => {
    const difference = differences[id];
    const hasWeight = (weights[id] ?? 0) > 0;
    if (difference === null) {
      return { id, weight: 0, similarity: null, verdict: /** @type {Verdict} */ ('sin-dato') };
    }
    const similarity = similarityFromDistance(difference);
    const weight = hasWeight && weightSum > 0 ? weights[id] / weightSum : 0;
    return { id, weight, similarity, verdict: verdictFor(similarity) };
  });

  if (weightSum === 0) {
    return { score: null, used: available.length, total: weighted.length, breakdown };
  }

  const squaredDistance = breakdown.reduce(
    (sum, v) => (v.similarity === null ? sum : sum + v.weight * differences[v.id] ** 2),
    0,
  );

  return {
    score: Math.exp(-squaredDistance / 2),
    used: available.length,
    total: weighted.length,
    breakdown,
  };
}
