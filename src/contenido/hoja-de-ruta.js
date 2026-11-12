/**
 * Hitos del proyecto, en orden de fecha. Título y cuerpo están en `es/hoja-de-ruta.js` y `en/hoja-de-ruta.js`, por `id`.
 * @typedef {'hecho'|'en-curso'|'proximo'} EstadoHito
 * @typedef {{ id: string, fecha: string, estado: EstadoHito }} Hito
 */

/** @type {Hito[]} */
export const hitos = [
  { id: 'reto', fecha: '2026-11-05', estado: 'hecho' },
  { id: 'datos', fecha: '2026-11-10', estado: 'hecho' },
  { id: 'dia-1', fecha: '2026-11-14', estado: 'proximo' },
  { id: 'dia-2', fecha: '2026-11-15', estado: 'proximo' },
];
