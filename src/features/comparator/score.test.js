import { test } from 'node:test';
import assert from 'node:assert/strict';
import { similarityFromDistance, scoreSite, verdictFor } from './score.js';

test('identical variable gives similarity 1', () => {
  assert.equal(similarityFromDistance(0), 1);
});

test('similarity decreases as distance grows', () => {
  assert.ok(similarityFromDistance(0.5) > similarityFromDistance(1));
  assert.ok(similarityFromDistance(3) < 0.02);
});

test('verdict thresholds', () => {
  assert.equal(verdictFor(0.9), 'coincide');
  assert.equal(verdictFor(0.5), 'parcial');
  assert.equal(verdictFor(0.1), 'difiere');
});

test('weights are normalized and score uses the weighted distance', () => {
  const result = scoreSite({ a: 1, b: 1 }, { a: 10, b: 30 });
  // D² = 0.25·1 + 0.75·1 = 1 → S = e^(-1/2)
  assert.ok(Math.abs(result.score - Math.exp(-0.5)) < 1e-9);
  assert.equal(result.breakdown.find((v) => v.id === 'a').weight, 0.25);
});

test('missing data is skipped and its weight is redistributed (Gower)', () => {
  const result = scoreSite({ a: 0, b: null }, { a: 50, b: 50 });
  assert.equal(result.score, 1);
  assert.equal(result.used, 1);
  assert.equal(result.total, 2);
  const missing = result.breakdown.find((v) => v.id === 'b');
  assert.equal(missing.similarity, null);
  assert.equal(missing.verdict, 'sin-dato');
});

test('zero-weight variables do not count', () => {
  const result = scoreSite({ a: 0, b: 5 }, { a: 1, b: 0 });
  assert.equal(result.score, 1);
  assert.equal(result.total, 1);
});

test('no usable variable returns a null score', () => {
  assert.equal(scoreSite({ a: null }, { a: 1 }).score, null);
  assert.equal(scoreSite({ a: 1 }, { a: 0 }).score, null);
});
