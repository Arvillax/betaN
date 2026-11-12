/**
 * Orden de las diapositivas. Para agregar una: crea `src/vistas/paginas/<nombre>.hbs`,
 * sus estilos en `src/estilos/paginas/<nombre>.less`, agrega una entrada aquí y su etiqueta en
 * `es/diapositivas.js` y `en/diapositivas.js`.
 *
 * - `id` es el hash de la URL y el id del DOM: queda en español en los dos idiomas.
 * - `mundo` define el terreno que se dibuja detrás de la diapositiva.
 * - `tono` define el contraste del texto: `claro` (papel) u `oscuro` (noche).
 *
 * @typedef {{ id: string, vista: string, mundo: 'tierra'|'luna'|'marte', tono: 'claro'|'oscuro' }} Diapositiva
 */

/** @type {Diapositiva[]} */
export const diapositivas = [
  { id: 'inicio', vista: 'paginas/portada', mundo: 'tierra', tono: 'claro' },
  { id: 'reto', vista: 'paginas/reto', mundo: 'tierra', tono: 'claro' },
  { id: 'no-buscamos', vista: 'paginas/lo-que-no', mundo: 'tierra', tono: 'claro' },
  { id: 'metodo', vista: 'paginas/metodo', mundo: 'luna', tono: 'oscuro' },
  { id: 'dimensiones', vista: 'paginas/dimensiones', mundo: 'luna', tono: 'oscuro' },
  { id: 'comparador', vista: 'paginas/comparador', mundo: 'marte', tono: 'oscuro' },
  { id: 'datos', vista: 'paginas/datos', mundo: 'marte', tono: 'oscuro' },
  { id: 'ruta', vista: 'paginas/hoja-de-ruta', mundo: 'tierra', tono: 'claro' },
  { id: 'equipo', vista: 'paginas/equipo', mundo: 'tierra', tono: 'claro' },
];
