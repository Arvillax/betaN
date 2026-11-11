/**
 * Visual presets for each world. Colors are CSS token names (src/styles/settings/tokens.less),
 * so the palette has a single source of truth.
 *
 * @typedef {{ blend: [number, number, number], bg: string, lineLow: string, lineHigh: string, lineAlpha: number }} WorldPreset
 */

/** @type {Record<'earth'|'moon'|'mars', WorldPreset>} */
export const WORLDS = {
  earth: { blend: [1, 0, 0], bg: '--paper', lineLow: '--sky', lineHigh: '--ultramar', lineAlpha: 0.7 },
  moon: { blend: [0, 1, 0], bg: '--ink', lineLow: '--ultramar', lineHigh: '--sky', lineAlpha: 0.8 },
  mars: { blend: [0, 0, 1], bg: '--night', lineLow: '--violeta', lineHigh: '--sky', lineAlpha: 0.85 },
};

export const DEFAULT_WORLD = 'earth';
