/** Textos de las ocho dimensiones, por id. Fuente: contexto/10-reto/dimensiones-innegociables.md, sección 4 (2026-11-05). */
export const dimensiones = {
  coberturas: {
    cubierta: 'Covered',
    parcial: 'Partial',
    'sin-variable': 'No variable',
  },
  elementos: {
    geologia: {
      titulo: 'Geology and minerals',
      variable: 'Thermal emissivity / silica index (proposed)',
      tierra: 'ASTER GED, EMIT, GLiM',
      espacio: 'Diviner · TES, THEMIS',
    },
    terreno: {
      titulo: 'Terrain',
      variable: 'Slope, roughness and relative relief',
      tierra: 'Copernicus DEM, NASADEM',
      espacio: 'LOLA · MOLA',
    },
    temperatura: {
      titulo: 'Temperature and illumination',
      variable: 'Temperature (not in the score); illumination as a candidate',
      tierra: 'MODIS MOD11, NASA POWER',
      espacio: 'Diviner, LOLA · THEMIS, TES',
    },
    agua: {
      titulo: 'Water, ice and resources',
      variable: 'Permafrost or ice (area fraction)',
      tierra: 'NSIDC GGD318, SMAP',
      espacio: 'Permanent shadow · SWIM',
    },
    polvo: {
      titulo: 'Dust, wind and erosion',
      variable: 'Wind as a Shields number; processes as a flag',
      tierra: 'MERRA-2, MAIAC',
      espacio: 'No wind on the Moon · MCD, MGD3',
    },
    biologia: {
      titulo: 'Biology and habitability',
      variable: 'None yet',
      tierra: 'Global-AI aridity, MODIS NDVI',
      espacio: 'No known biology',
    },
    cuevas: {
      titulo: 'Caves and subsurface',
      variable: 'Distance to and density of pits and lava tubes',
      tierra: 'Pyroduct Catalog, WOKAM',
      espacio: 'LROC Pit Atlas · MGC³',
    },
    aterrizaje: {
      titulo: 'Landing and mobility',
      variable: 'Indirect: slope, roughness and illumination as filters',
      tierra: 'Same as terrain and temperature',
      espacio: 'Same as terrain and temperature',
    },
  },
  textos: {
    antetitulo: 'The 8 dimensions',
    titulo: 'What the challenge asks us to compare',
    resumen: 'As of 2026-11-05: 1 covered, 6 partial and 1 with no variable yet.',
    tierra: 'Earth',
    espacio: 'Moon · Mars',
  },
};
