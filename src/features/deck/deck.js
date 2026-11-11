/**
 * Slide deck over native scrolling: CSS scroll-snap does the snapping,
 * this module tracks the active slide and offers next/prev/goTo.
 */
import { qsa } from '../../lib/dom.js';
import { emit, EVENTS } from '../../lib/events.js';
import { prefersReducedMotion } from '../../lib/motion.js';

const CENTER_BAND = '-49% 0px -49% 0px';

/** @param {HTMLElement} root `[data-deck]` */
export function createDeck(root) {
  const slides = qsa('[data-slide]', root);
  let activeIndex = -1;

  function activate(index) {
    if (index === activeIndex || !slides[index]) return;
    slides[activeIndex]?.classList.remove('is-active');
    activeIndex = index;
    const slide = slides[index];
    slide.classList.add('is-active', 'is-seen');
    emit(EVENTS.SLIDE_CHANGE, {
      index,
      total: slides.length,
      id: slide.id,
      world: slide.dataset.world,
      tone: slide.dataset.tone,
    });
  }

  // Deep link: jump to the slide in the URL hash before observing, so the first
  // observer pass does not activate the hero and overwrite the hash.
  const fromHash = slides.findIndex((s) => `#${s.id}` === window.location.hash);
  if (fromHash > 0) slides[fromHash].scrollIntoView({ behavior: 'instant', block: 'start' });

  // A slide is active when it crosses a thin band at the middle of the viewport.
  // This works for slides taller than the screen too (mobile), unlike a visibility ratio.
  const observer = new IntersectionObserver(
    (entries) => {
      const hit = entries.find((entry) => entry.isIntersecting);
      if (hit) activate(slides.indexOf(/** @type {HTMLElement} */ (hit.target)));
    },
    { rootMargin: CENTER_BAND, threshold: 0 },
  );
  slides.forEach((slide) => observer.observe(slide));

  function goTo(index) {
    const target = slides[Math.max(0, Math.min(slides.length - 1, index))];
    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }

  activate(fromHash >= 0 ? fromHash : 0);

  return {
    get index() {
      return activeIndex;
    },
    get count() {
      return slides.length;
    },
    goTo,
    next: () => goTo(activeIndex + 1),
    prev: () => goTo(activeIndex - 1),
    destroy: () => observer.disconnect(),
  };
}
