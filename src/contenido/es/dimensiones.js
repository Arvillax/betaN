/** Textos de las ocho dimensiones, por id. Fuente: contexto/10-reto/dimensiones-innegociables.md, sección 4 (2026-11-05). */
export const dimensiones = {
  coberturas: {
    cubierta: 'Cubierta',
    parcial: 'Parcial',
    'sin-variable': 'Sin variable',
  },
  elementos: {
    geologia: {
      titulo: 'Geología y minerales',
      variable: 'Emisividad térmica / índice de sílice (propuesta)',
      tierra: 'ASTER GED, EMIT, GLiM',
      espacio: 'Diviner · TES, THEMIS',
    },
    terreno: {
      titulo: 'Terreno',
      variable: 'Pendiente, rugosidad y relieve relativo',
      tierra: 'Copernicus DEM, NASADEM',
      espacio: 'LOLA · MOLA',
    },
    temperatura: {
      titulo: 'Temperatura e iluminación',
      variable: 'Temperatura (fuera de la nota); iluminación candidata',
      tierra: 'MODIS MOD11, NASA POWER',
      espacio: 'Diviner, LOLA · THEMIS, TES',
    },
    agua: {
      titulo: 'Agua, hielo y recursos',
      variable: 'Permafrost o hielo (fracción de área)',
      tierra: 'NSIDC GGD318, SMAP',
      espacio: 'Sombra permanente · SWIM',
    },
    polvo: {
      titulo: 'Polvo, viento y erosión',
      variable: 'Viento como número de Shields; procesos como bandera',
      tierra: 'MERRA-2, MAIAC',
      espacio: 'Sin viento en la Luna · MCD, MGD3',
    },
    biologia: {
      titulo: 'Biología y habitabilidad',
      variable: 'Ninguna todavía',
      tierra: 'Aridez Global-AI, NDVI MODIS',
      espacio: 'Sin biología conocida',
    },
    cuevas: {
      titulo: 'Cuevas y subsuelo',
      variable: 'Distancia y densidad de fosas y tubos de lava',
      tierra: 'Pyroduct Catalog, WOKAM',
      espacio: 'LROC Pit Atlas · MGC³',
    },
    aterrizaje: {
      titulo: 'Aterrizaje y movilidad',
      variable: 'Indirecta: pendiente, rugosidad e iluminación como filtros',
      tierra: 'Las del terreno y la temperatura',
      espacio: 'Las del terreno y la temperatura',
    },
  },
  textos: {
    antetitulo: 'Las 8 dimensiones',
    titulo: 'Lo que el reto pide comparar',
    resumen: 'Al 2026-11-05: 1 cubierta, 6 parciales y 1 sin variable.',
    tierra: 'Tierra',
    espacio: 'Luna · Marte',
  },
};
