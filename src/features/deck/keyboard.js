/**
 * Presentation keys: arrows, PageUp/PageDown, Space, Home and End.
 * Keys are left alone while the user is typing or moving a slider.
 */

const NEXT = new Set(['ArrowDown', 'ArrowRight', 'PageDown']);
const PREV = new Set(['ArrowUp', 'ArrowLeft', 'PageUp']);

function isInteractive(target) {
  return target instanceof HTMLElement && Boolean(target.closest('input, textarea, select, button, [contenteditable="true"]'));
}

/** @param {{ next(): void, prev(): void, goTo(i: number): void, count: number }} deck */
export function bindKeyboard(deck) {
  function onKeyDown(event) {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    if (isInteractive(event.target)) return;

    const key = event.key;
    if (NEXT.has(key) || (key === ' ' && !event.shiftKey)) deck.next();
    else if (PREV.has(key) || (key === ' ' && event.shiftKey)) deck.prev();
    else if (key === 'Home') deck.goTo(0);
    else if (key === 'End') deck.goTo(deck.count - 1);
    else return;

    event.preventDefault();
  }

  window.addEventListener('keydown', onKeyDown);
  return () => window.removeEventListener('keydown', onKeyDown);
}
