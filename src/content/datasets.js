/**
 * Open datasets per variable. Names come from
 * contexto/10-reto/dimensiones-innegociables.md (section 4).
 * Versions, licenses and URLs are filled from contexto/50-referencia before delivery.
 *
 * @typedef {{ name: string, version?: string, license?: string, url?: string }} Dataset
 * @typedef {{ variable: string, earth: Dataset[], moon: Dataset[], mars: Dataset[] }} DatasetRow
 */

/** @type {DatasetRow[]} */
export const datasetRows = [
  {
    variable: 'Terreno',
    earth: [{ name: 'Copernicus DEM' }, { name: 'NASADEM' }],
    moon: [{ name: 'LOLA' }],
    mars: [{ name: 'MOLA' }, { name: 'HRSC-MOLA' }],
  },
  {
    variable: 'Minerales',
    earth: [{ name: 'ASTER GED AG1km V003' }, { name: 'EMIT' }],
    moon: [{ name: 'Diviner' }],
    mars: [{ name: 'TES' }, { name: 'THEMIS' }],
  },
  {
    variable: 'Temperatura',
    earth: [{ name: 'MODIS MOD11' }, { name: 'NASA POWER' }],
    moon: [{ name: 'Diviner' }],
    mars: [{ name: 'THEMIS' }, { name: 'TES' }],
  },
  {
    variable: 'Hielo',
    earth: [{ name: 'NSIDC GGD318' }, { name: 'SMAP' }],
    moon: [{ name: 'Zonas en sombra permanente' }],
    mars: [{ name: 'SWIM' }],
  },
  {
    variable: 'Viento y polvo',
    earth: [{ name: 'MERRA-2' }, { name: 'MAIAC' }],
    moon: [],
    mars: [{ name: 'MCD' }, { name: 'MDAD v1.1' }],
  },
  {
    variable: 'Subsuelo',
    earth: [{ name: 'Pyroduct Digital Catalog' }, { name: 'WOKAM' }],
    moon: [{ name: 'LROC Pit Atlas' }],
    mars: [{ name: 'MGC³' }],
  },
];

export const datasetsCopy = {
  eyebrow: 'Datos abiertos',
  title: 'Cada comparación sale de una capa real',
  lead: 'Datos abiertos de NASA, USGS y ESA. Nada de capturas ni cifras sin un mapa detrás.',
  empty: 'Sin capa: en la Luna no hay viento.',
  pending: 'Versión, licencia y URL de cada capa: pendientes de anotar en 50-referencia.',
  columns: { earth: 'Tierra', moon: 'Luna', mars: 'Marte' },
};
