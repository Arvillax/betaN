/**
 * Tracks the mouse or a finger over the window.
 * @param {(state: { x: number, y: number, active: boolean }) => void} handler coordinates in CSS pixels
 * @returns {() => void} stop tracking
 */
export function trackPointer(handler) {
  const move = (event) => handler({ x: event.clientX, y: event.clientY, active: true });
  const leave = () => handler({ x: -1, y: -1, active: false });

  window.addEventListener('pointermove', move, { passive: true });
  window.addEventListener('pointerdown', move, { passive: true });
  document.documentElement.addEventListener('pointerleave', leave);
  window.addEventListener('blur', leave);

  return () => {
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerdown', move);
    document.documentElement.removeEventListener('pointerleave', leave);
    window.removeEventListener('blur', leave);
  };
}
