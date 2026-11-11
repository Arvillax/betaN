/**
 * The eight analogy dimensions of the challenge and how the project covers them.
 * Source: contexto/10-reto/dimensiones-innegociables.md, section 4 (2026-11-05).
 *
 * @typedef {'cubierta'|'parcial'|'sin-variable'} Coverage
 * @typedef {{ number: number, title: string, variable: string, earth: string, space: string, coverage: Coverage }} Dimension
 */

export const coverageLabels = {
  cubierta: 'Cubierta',
  parcial: 'Parcial',
  'sin-variable': 'Sin variable',
};

/** @type {Dimension[]} */
export const dimensions = [
  {
    number: 1,
    title: 'Geología y minerales',
    variable: 'Emisividad térmica / índice de sílice (propuesta)',
    earth: 'ASTER GED, EMIT, GLiM',
    space: 'Diviner · TES, THEMIS',
    coverage: 'parcial',
  },
  {
    number: 2,
    title: 'Terreno',
    variable: 'Pendiente, rugosidad y relieve relativo',
    earth: 'Copernicus DEM, NASADEM',
    space: 'LOLA · MOLA',
    coverage: 'cubierta',
  },
  {
    number: 3,
    title: 'Temperatura e iluminación',
    variable: 'Temperatura (fuera de la nota); iluminación candidata',
    earth: 'MODIS MOD11, NASA POWER',
    space: 'Diviner, LOLA · THEMIS, TES',
    coverage: 'parcial',
  },
  {
    number: 4,
    title: 'Agua, hielo y recursos',
    variable: 'Permafrost o hielo (fracción de área)',
    earth: 'NSIDC GGD318, SMAP',
    space: 'Sombra permanente · SWIM',
    coverage: 'parcial',
  },
  {
    number: 5,
    title: 'Polvo, viento y erosión',
    variable: 'Viento como número de Shields; procesos como bandera',
    earth: 'MERRA-2, MAIAC',
    space: 'Sin viento en la Luna · MCD, MGD3',
    coverage: 'parcial',
  },
  {
    number: 6,
    title: 'Biología y habitabilidad',
    variable: 'Ninguna todavía',
    earth: 'Aridez Global-AI, NDVI MODIS',
    space: 'Sin biología conocida',
    coverage: 'sin-variable',
  },
  {
    number: 7,
    title: 'Cuevas y subsuelo',
    variable: 'Distancia y densidad de fosas y tubos de lava',
    earth: 'Pyroduct Catalog, WOKAM',
    space: 'LROC Pit Atlas · MGC³',
    coverage: 'parcial',
  },
  {
    number: 8,
    title: 'Aterrizaje y movilidad',
    variable: 'Indirecta: pendiente, rugosidad e iluminación como filtros',
    earth: 'Las del terreno y la temperatura',
    space: 'Las del terreno y la temperatura',
    coverage: 'parcial',
  },
];

export const dimensionsCopy = {
  eyebrow: 'Las 8 dimensiones',
  title: 'Lo que el reto pide comparar',
  summary: 'Al 2026-11-05: 1 cubierta, 6 parciales y 1 sin variable.',
};
