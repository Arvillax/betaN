/**
 * Probe readout that follows the pointer. Purely visual: coordinates map the screen to a
 * simulated latitude/longitude grid, and the UI says so.
 */
import { formatNumber } from '../../lib/dom.js';

function toCoordinates(x, y) {
  const lat = 90 - (y / window.innerHeight) * 180;
  const lon = (x / window.innerWidth) * 360 - 180;
  const latText = `${formatNumber(Math.abs(lat), 1)}° ${lat >= 0 ? 'N' : 'S'}`;
  const lonText = `${formatNumber(Math.abs(lon), 1)}° ${lon >= 0 ? 'E' : 'O'}`;
  return `${latText} · ${lonText}`;
}

/**
 * @param {HTMLElement} root `[data-probe]`
 * @param {Record<string, string>} worldLabels world id → visible name
 */
export function createProbe(root, worldLabels) {
  const world = root.querySelector('[data-probe-world]');
  const coords = root.querySelector('[data-probe-coords]');

  return {
    /** @param {{ x: number, y: number, active: boolean }} pointer */
    update({ x, y, active }) {
      root.classList.toggle('is-visible', active);
      if (!active) return;
      root.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      coords.textContent = toCoordinates(x, y);
    },
    setWorld(id) {
      world.textContent = worldLabels[id] ?? id;
    },
  };
}
