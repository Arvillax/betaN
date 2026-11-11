/**
 * Brand and page metadata. Shared by every slide.
 * @typedef {{ name: string, team: string, city: string, event: string, title: string, description: string, repoUrl: string }} Site
 */

/** @type {Site} */
export const site = {
  name: 'Análogos Tierra · Luna · Marte',
  team: 'J4K',
  city: 'Tegucigalpa',
  event: 'NASA Space Apps Challenge 2026',
  title: 'Análogos Tierra · Luna · Marte — J4K',
  description:
    'Un buscador que recorre la Tierra entera y la compara con sitios de la Luna y de Marte, variable por variable.',
  repoUrl: '',
};

/** Worlds shown in the header indicator, in narrative order. */
export const worlds = [
  { id: 'earth', label: 'Tierra' },
  { id: 'moon', label: 'Luna' },
  { id: 'mars', label: 'Marte' },
];
