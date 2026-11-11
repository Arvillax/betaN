/**
 * Marca y metadatos de la página. Los comparten todas las diapositivas.
 * @typedef {{ nombre: string, equipo: string, ciudad: string, evento: string, titulo: string, descripcion: string, urlRepo: string }} Sitio
 */

/** @type {Sitio} */
export const sitio = {
  nombre: 'Análogos Tierra · Luna · Marte',
  equipo: 'J4K',
  ciudad: 'Tegucigalpa',
  evento: 'NASA Space Apps Challenge 2026',
  titulo: 'Análogos Tierra · Luna · Marte — J4K',
  descripcion:
    'Un buscador que recorre la Tierra entera y la compara con sitios de la Luna y de Marte, variable por variable.',
  urlRepo: '',
};

/** Mundos del indicador del encabezado, en el orden del relato. */
export const mundos = [
  { id: 'tierra', etiqueta: 'Tierra' },
  { id: 'luna', etiqueta: 'Luna' },
  { id: 'marte', etiqueta: 'Marte' },
];
