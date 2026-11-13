/** Textos de la portada, el reto y el método. */

// Fuente: analogos-space-apps-2026/README.md:5-6
export const inicio = {
  antetitulo: 'NASA Space Apps 2026 · Tegucigalpa',
  lineasTitulo: ['Earth has already rehearsed', 'the Moon and Mars.'],
  acento: 'Now we need to find where.',
  entradilla:
    'We look for places on Earth that resemble permanent Moon base sites and Mars through physical processes, not appearance. And we explain where they match and where they differ.',
  accion: 'See the challenge',
  pista: 'Move the cursor: it is a probe over the terrain.',
};

// Fuente: analogos-space-apps-2026/contexto/10-reto/dimensiones-innegociables.md:24-30 y contexto/INDEX-sitios.md
export const reto = {
  antetitulo: 'The challenge',
  titulo: 'Three questions for every analog',
  entradilla: 'An analog doesn’t have to match in everything. It has to say clearly where it does and where it doesn’t.',
  preguntas: [
    {
      clave: 'coincide',
      titulo: 'What matches',
      cuerpo: 'The physical features or processes that make the analogy hold.',
    },
    {
      clave: 'falla',
      titulo: 'Where it falls short',
      cuerpo: 'Gravity, atmosphere, pressure and scale: what Earth cannot reproduce.',
    },
    {
      clave: 'sirve',
      titulo: 'What it is for',
      cuerpo: 'How studying that place helps prepare the exploration of the Moon or Mars.',
    },
  ],
  tituloNoBuscamos: 'What we are not after',
  entradillaNoBuscamos: 'The challenge asks us not to rediscover known analogs or places that only look alike.',
  conocidos: ['Antarctica', 'Atacama', 'Iceland', 'Hawaii', 'Haughton', 'Death Valley', 'Mojave'],
  etiquetaLista: 'Known analogs, out of scope',
  control:
    'The 43 already documented analogs (ST-01 to ST-43) are not the answer: they are a control to check that the method finds them.',
};

// Fuente: contexto/70-bitacora/2026-11/2026-11-11-fernando-etl-de-ensayo-y-vectores-objetivo.md, ADR-002, ADR-006,
// ADR-008, ADR-010, ADR-011, ADR-013 y motor/LEEME.md (repo analogos-space-apps-2026)
export const metodo = {
  antetitulo: 'How it works',
  titulo: 'From data layers to a list of places',
  entradilla: 'The whole Earth is compared with each site, variable by variable. Nothing is computed live: it all arrives ready.',
  pasos: [
    {
      titulo: 'Input',
      cuerpo:
        'Open data from NASA, USGS and ESA, processed beforehand on a computer. Earth becomes a table of HEALPix level-12 cells and each target site a vector: 9 lunar regions and 12 Mars sites.',
      etiquetas: ['ADR-002', 'ADR-011'],
    },
    {
      titulo: 'Process',
      cuerpo:
        'Each cell is measured against the site with a weighted Mahalanobis distance, on a median and spread that resist outliers, with a tolerance margin per variable. If a value is missing, that variable does not count. The score is S = e^(−γ·D²), from 0 to 1. Only cells with complete terrain and NDVI ≤ 0.30 qualify, and many scenarios are tried to see which candidates hold up.',
      etiquetas: ['ADR-006', 'ADR-008', 'ADR-013'],
    },
    {
      titulo: 'Output',
      cuerpo:
        'A metrics.json and a list of candidates per profile and site, with the score, the measured values, the score of each variable and what Earth cannot reproduce.',
      etiquetas: ['ADR-010'],
    },
  ],
  capas: ['Slope', 'Roughness', 'Relative relief', 'Silica', 'Thermal range', 'Illumination', 'Wind', '+ k'],
  fuente: 'Variables N1 to N7: ADR-008',
  etiquetaCapas: 'Layers compared at the same time',
};
