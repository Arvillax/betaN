/**
 * App-wide events. Features never import each other; they talk through these.
 * Every event carries its payload in `event.detail`.
 */
export const EVENTS = Object.freeze({
  /** detail: { index: number, id: string, world: string, tone: string } */
  SLIDE_CHANGE: 'deck:change',
  /** detail: { world: string } — a feature asks the terrain to show a world for a while */
  WORLD_REQUEST: 'world:request',
});

export function emit(name, detail) {
  document.dispatchEvent(new CustomEvent(name, { detail }));
}

/** @returns {() => void} unsubscribe */
export function on(name, handler) {
  const listener = (event) => handler(event.detail);
  document.addEventListener(name, listener);
  return () => document.removeEventListener(name, listener);
}
