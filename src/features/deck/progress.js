/**
 * Reflects the active slide in the chrome: side rail, header counter, world indicator
 * and the page tone (light/dark) that the header colors depend on.
 */
import { qsa, qs } from '../../lib/dom.js';

/** @param {{ goTo(i: number): void }} deck */
export function createProgress(deck) {
  const links = qsa('[data-goto]');
  const worldLabels = qsa('[data-world-label]');
  const counter = qs('[data-slide-current]');

  links.forEach((link) =>
    link.addEventListener('click', (event) => {
      event.preventDefault();
      deck.goTo(Number(link.dataset.goto));
    }),
  );

  return {
    /** @param {{ index: number, id: string, tone: string }} slide */
    showSlide({ index, id, tone }) {
      links.forEach((link, i) => {
        if (i === index) link.setAttribute('aria-current', 'step');
        else link.removeAttribute('aria-current');
      });
      if (counter) counter.textContent = String(index + 1).padStart(2, '0');
      document.documentElement.dataset.tone = tone;
      history.replaceState(null, '', `#${id}`);
    },
    /** The world can differ from the slide's own (the comparator can request one). */
    showWorld(world) {
      document.documentElement.dataset.world = world;
      worldLabels.forEach((label) => label.classList.toggle('is-current', label.dataset.worldLabel === world));
    },
  };
}
