/**
 * Las ocho dimensiones de analogía del reto y cómo las cubre el proyecto. Los textos de cada una están en
 * `es/dimensiones.js` y `en/dimensiones.js`, por `id`.
 * Fuente: contexto/10-reto/dimensiones-innegociables.md, sección 4 (2026-11-05).
 *
 * @typedef {'cubierta'|'parcial'|'sin-variable'} Cobertura
 * @typedef {{ id: string, numero: number, cobertura: Cobertura }} Dimension
 */

/** @type {Dimension[]} */
export const dimensiones = [
  { id: 'geologia', numero: 1, cobertura: 'parcial' },
  { id: 'terreno', numero: 2, cobertura: 'cubierta' },
  { id: 'temperatura', numero: 3, cobertura: 'parcial' },
  { id: 'agua', numero: 4, cobertura: 'parcial' },
  { id: 'polvo', numero: 5, cobertura: 'parcial' },
  { id: 'biologia', numero: 6, cobertura: 'sin-variable' },
  { id: 'cuevas', numero: 7, cobertura: 'parcial' },
  { id: 'aterrizaje', numero: 8, cobertura: 'parcial' },
];
