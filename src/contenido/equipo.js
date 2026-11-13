/**
 * Integrantes del equipo, por alias. El rol de cada uno está en `es/equipo.js` y `en/equipo.js` (`roles`, por `id`).
 * El usuario de GitHub se muestra como texto, sin enlace.
 * @typedef {{ id: string, nombre: string, github: string }} Integrante
 */

// Fuente: analogos-space-apps-2026/contexto/.control/equipo.json y contexto/35-modulos/M-03-visor/M-03-ficha.md:38
/** @type {Integrante[]} */
export const integrantes = [
  { id: 'fernando', nombre: 'fernando', github: 'RedFer855' },
  { id: 'guillermo', nombre: 'guillermo', github: 'IngGuillermoRosa' },
];
