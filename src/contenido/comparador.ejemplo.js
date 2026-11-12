/**
 * Datos de EJEMPLO para la demo del comparador. No son mediciones: cada valor es provisional
 * hasta que el motor real (ADR-006) los produzca. La interfaz los marca como tales.
 * Las etiquetas están en `es/comparador.js` y `en/comparador.js`, por `id`.
 *
 * `diferencias` guarda la distancia normalizada entre una celda de la Tierra y el destino para cada
 * variable (0 = idénticas). `null` indica que no hay dato para esa variable (regla de Gower).
 *
 * @typedef {{ id: string }} Variable
 * @typedef {{ id: string, mundo: 'luna'|'marte', diferencias: Record<string, number|null> }} Destino
 * @typedef {{ id: string, pesos: Record<string, number> }} Perfil
 */

/** @type {Variable[]} */
export const variables = [
  { id: 'pendiente' },
  { id: 'rugosidad' },
  { id: 'relieve' },
  { id: 'emisividad' },
  { id: 'permafrost' },
  { id: 'viento' },
];

/** @type {Destino[]} */
export const destinos = [
  {
    id: 'luna',
    mundo: 'luna',
    diferencias: { pendiente: 0.4, rugosidad: 0.6, relieve: 0.9, emisividad: 1.4, permafrost: 0.5, viento: null },
  },
  {
    id: 'marte',
    mundo: 'marte',
    diferencias: { pendiente: 0.5, rugosidad: 0.3, relieve: 0.7, emisividad: 0.6, permafrost: 1.8, viento: 0.9 },
  },
];

/** Tablas de pesos por uso. Marcadas como ejemplo en ADR-006 §7: no hay pesos publicados. */
/** @type {Perfil[]} */
export const perfiles = [
  { id: 'rover', pesos: { pendiente: 40, rugosidad: 40, relieve: 20, emisividad: 0, permafrost: 0, viento: 0 } },
  { id: 'habitat', pesos: { pendiente: 30, rugosidad: 10, relieve: 20, emisividad: 10, permafrost: 20, viento: 10 } },
  { id: 'agua', pesos: { pendiente: 0, rugosidad: 0, relieve: 20, emisividad: 20, permafrost: 60, viento: 0 } },
];
