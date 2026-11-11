/**
 * Composition root: creates every feature and connects them through events.
 * Features never import each other; this is the only file that knows all of them.
 */
import './styles/main.less';

import { worlds } from './content/site.js';
import { variables, destinations, profiles } from './content/comparator.sample.js';
import { qs } from './lib/dom.js';
import { on, EVENTS } from './lib/events.js';
import { prefersReducedMotion, onReducedMotionChange } from './lib/motion.js';
import { trackPointer } from './lib/pointer.js';
import { createTerrain } from './features/terrain/terrain-renderer.js';
import { useStaticBackground } from './features/terrain/fallback.js';
import { createProbe } from './features/probe/probe.js';
import { createDeck } from './features/deck/deck.js';
import { bindKeyboard } from './features/deck/keyboard.js';
import { createProgress } from './features/deck/progress.js';
import { createComparator } from './features/comparator/comparator.js';

const worldLabels = Object.fromEntries(worlds.map((w) => [w.id, w.label]));

// Background
const canvas = /** @type {HTMLCanvasElement} */ (qs('[data-terrain]'));
const terrain = createTerrain(canvas, {
  reducedMotion: prefersReducedMotion(),
  onFailure: () => useStaticBackground(canvas),
});
if (!terrain) useStaticBackground(canvas);
onReducedMotionChange((reduced) => terrain?.setReducedMotion(reduced));

// Probe
const probe = createProbe(/** @type {HTMLElement} */ (qs('[data-probe]')), worldLabels);
trackPointer((pointer) => {
  terrain?.setPointer(pointer);
  probe.update(pointer);
});

// Chrome + world changes. Subscribed before the deck starts so the first slide is reflected.
let progress;
function showWorld(world) {
  terrain?.setWorld(world);
  probe.setWorld(world);
  progress?.showWorld(world);
}
on(EVENTS.WORLD_REQUEST, ({ world }) => showWorld(world));

const deckRoot = /** @type {HTMLElement} */ (qs('[data-deck]'));
on(EVENTS.SLIDE_CHANGE, (slide) => {
  progress?.showSlide(slide);
  showWorld(slide.world);
});

// Comparator subscribes after the world handler, so its world request wins on its slide.
const comparatorRoot = qs('[data-comparator]');
if (comparatorRoot) createComparator(/** @type {HTMLElement} */ (comparatorRoot), { variables, destinations, profiles });

// The deck needs the chrome ready; the chrome needs the deck to navigate.
const deck = createDeck(deckRoot);
progress = createProgress(deck);
const first = deckRoot.querySelectorAll('[data-slide]')[deck.index];
progress.showSlide({ index: deck.index, id: first.id, tone: first.dataset.tone });
progress.showWorld(first.dataset.world);
bindKeyboard(deck);

document.documentElement.classList.add('is-ready');
