import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clamp, lerp, damp, hexToRgb } from './math.js';

test('clamp keeps values inside the range', () => {
  assert.equal(clamp(5, 0, 1), 1);
  assert.equal(clamp(-1, 0, 1), 0);
  assert.equal(clamp(0.3, 0, 1), 0.3);
});

test('lerp interpolates linearly', () => {
  assert.equal(lerp(0, 10, 0.5), 5);
});

test('damp moves toward the target without overshooting', () => {
  const next = damp(0, 1, 8, 1 / 60);
  assert.ok(next > 0 && next < 1);
  assert.equal(damp(0, 1, 8, 100), 1);
});

test('hexToRgb parses 6 and 3 digit colors to 0..1 channels', () => {
  assert.deepEqual(hexToRgb('#ff0000'), [1, 0, 0]);
  assert.deepEqual(hexToRgb('#0f0'), [0, 1, 0]);
});
