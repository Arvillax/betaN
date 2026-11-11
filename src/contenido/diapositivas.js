/**
 * Orden de las diapositivas. Para agregar una: crea `src/vistas/paginas/<nombre>.hbs`,
 * sus estilos en `src/estilos/paginas/<nombre>.less` y agrega una entrada aquí.
 *
 * - `mundo` define el terreno que se dibuja detrás de la diapositiva.
 * - `tono` define el contraste del texto: `claro` (papel) u `oscuro` (noche).
 *
 * @typedef {{ id: string, vista: string, etiqueta: string, mundo: 'tierra'|'luna'|'marte', tono: 'claro'|'oscuro' }} Diapositiva
 */

/** @type {Diapositiva[]} */
export const diapositivas = [
  { id: 'inicio', vista: 'paginas/portada', etiqueta: 'Inicio', mundo: 'tierra', tono: 'claro' },
  { id: 'reto', vista: 'paginas/reto', etiqueta: 'El reto', mundo: 'tierra', tono: 'claro' },
  { id: 'no-buscamos', vista: 'paginas/lo-que-no', etiqueta: 'Lo que no buscamos', mundo: 'tierra', tono: 'claro' },
  { id: 'metodo', vista: 'paginas/metodo', etiqueta: 'El método', mundo: 'luna', tono: 'oscuro' },
  { id: 'dimensiones', vista: 'paginas/dimensiones', etiqueta: 'Las 8 dimensiones', mundo: 'luna', tono: 'oscuro' },
  { id: 'comparador', vista: 'paginas/comparador', etiqueta: 'Comparador', mundo: 'marte', tono: 'oscuro' },
  { id: 'datos', vista: 'paginas/datos', etiqueta: 'Datos abiertos', mundo: 'marte', tono: 'oscuro' },
  { id: 'ruta', vista: 'paginas/hoja-de-ruta', etiqueta: 'Hoja de ruta', mundo: 'tierra', tono: 'claro' },
  { id: 'equipo', vista: 'paginas/equipo', etiqueta: 'Equipo', mundo: 'tierra', tono: 'claro' },
];
