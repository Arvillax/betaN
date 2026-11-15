/**
 * Datos de la página que no cambian con el idioma. Los textos están en `es/sitio.js` y `en/sitio.js`.
 * Con `urlDemo` vacío el botón de la demo abre un aviso con la fecha de prueba (`pruebaDemo`, ISO 8601 con zona);
 * con una URL se vuelve un enlace.
 * @typedef {{ equipo: string, ciudad: string, evento: string, urlDemo: string, pruebaDemo: string }} Sitio
 */

/** @type {Sitio} */
export const sitio = {
  equipo: 'J4Ks',
  ciudad: 'Tegucigalpa',
  evento: 'NASA Space Apps Challenge 2026',
  urlDemo: 'http://localhost:5173/',
  pruebaDemo: '2026-11-15T17:00:00-06:00',
};

/** Mundos del indicador del encabezado, en el orden del relato. */
export const idsMundos = ['tierra', 'luna', 'marte'];
