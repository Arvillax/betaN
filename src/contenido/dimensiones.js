/**
 * Las ocho dimensiones de analogía del reto y cómo las cubre el proyecto.
 * Fuente: contexto/10-reto/dimensiones-innegociables.md, sección 4 (2026-11-05).
 *
 * @typedef {'cubierta'|'parcial'|'sin-variable'} Cobertura
 * @typedef {{ numero: number, titulo: string, variable: string, tierra: string, espacio: string, cobertura: Cobertura }} Dimension
 */

export const etiquetasCobertura = {
  cubierta: 'Cubierta',
  parcial: 'Parcial',
  'sin-variable': 'Sin variable',
};

/** @type {Dimension[]} */
export const dimensiones = [
  {
    numero: 1,
    titulo: 'Geología y minerales',
    variable: 'Emisividad térmica / índice de sílice (propuesta)',
    tierra: 'ASTER GED, EMIT, GLiM',
    espacio: 'Diviner · TES, THEMIS',
    cobertura: 'parcial',
  },
  {
    numero: 2,
    titulo: 'Terreno',
    variable: 'Pendiente, rugosidad y relieve relativo',
    tierra: 'Copernicus DEM, NASADEM',
    espacio: 'LOLA · MOLA',
    cobertura: 'cubierta',
  },
  {
    numero: 3,
    titulo: 'Temperatura e iluminación',
    variable: 'Temperatura (fuera de la nota); iluminación candidata',
    tierra: 'MODIS MOD11, NASA POWER',
    espacio: 'Diviner, LOLA · THEMIS, TES',
    cobertura: 'parcial',
  },
  {
    numero: 4,
    titulo: 'Agua, hielo y recursos',
    variable: 'Permafrost o hielo (fracción de área)',
    tierra: 'NSIDC GGD318, SMAP',
    espacio: 'Sombra permanente · SWIM',
    cobertura: 'parcial',
  },
  {
    numero: 5,
    titulo: 'Polvo, viento y erosión',
    variable: 'Viento como número de Shields; procesos como bandera',
    tierra: 'MERRA-2, MAIAC',
    espacio: 'Sin viento en la Luna · MCD, MGD3',
    cobertura: 'parcial',
  },
  {
    numero: 6,
    titulo: 'Biología y habitabilidad',
    variable: 'Ninguna todavía',
    tierra: 'Aridez Global-AI, NDVI MODIS',
    espacio: 'Sin biología conocida',
    cobertura: 'sin-variable',
  },
  {
    numero: 7,
    titulo: 'Cuevas y subsuelo',
    variable: 'Distancia y densidad de fosas y tubos de lava',
    tierra: 'Pyroduct Catalog, WOKAM',
    espacio: 'LROC Pit Atlas · MGC³',
    cobertura: 'parcial',
  },
  {
    numero: 8,
    titulo: 'Aterrizaje y movilidad',
    variable: 'Indirecta: pendiente, rugosidad e iluminación como filtros',
    tierra: 'Las del terreno y la temperatura',
    espacio: 'Las del terreno y la temperatura',
    cobertura: 'parcial',
  },
];

export const textosDimensiones = {
  antetitulo: 'Las 8 dimensiones',
  titulo: 'Lo que el reto pide comparar',
  resumen: 'Al 2026-11-05: 1 cubierta, 6 parciales y 1 sin variable.',
};
