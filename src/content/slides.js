/**
 * Slide order. To add a slide: create `src/views/pages/<name>.hbs`,
 * its styles in `src/styles/pages/<name>.less`, and add an entry here.
 *
 * - `world` sets the terrain drawn behind the slide.
 * - `tone` sets the text contrast: `light` (paper) or `dark` (night).
 *
 * @typedef {{ id: string, view: string, label: string, world: 'earth'|'moon'|'mars', tone: 'light'|'dark' }} Slide
 */

/** @type {Slide[]} */
export const slides = [
  { id: 'inicio', view: 'pages/hero', label: 'Inicio', world: 'earth', tone: 'light' },
  { id: 'reto', view: 'pages/challenge', label: 'El reto', world: 'earth', tone: 'light' },
  { id: 'no-buscamos', view: 'pages/not-this', label: 'Lo que no buscamos', world: 'earth', tone: 'light' },
  { id: 'metodo', view: 'pages/method', label: 'El método', world: 'moon', tone: 'dark' },
  { id: 'dimensiones', view: 'pages/dimensions', label: 'Las 8 dimensiones', world: 'moon', tone: 'dark' },
  { id: 'comparador', view: 'pages/comparator', label: 'Comparador', world: 'mars', tone: 'dark' },
  { id: 'datos', view: 'pages/datasets', label: 'Datos abiertos', world: 'mars', tone: 'dark' },
  { id: 'ruta', view: 'pages/roadmap', label: 'Hoja de ruta', world: 'earth', tone: 'light' },
  { id: 'equipo', view: 'pages/team', label: 'Equipo', world: 'earth', tone: 'light' },
];
