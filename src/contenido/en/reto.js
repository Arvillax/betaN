/**
 * Textos de las diapositivas de apertura. Fuente: enunciado oficial del reto, tal como lo resume
 * analogos-space-apps-2026/contexto/10-reto/dimensiones-innegociables.md (2026-11-05).
 */

export const portada = {
  antetitulo: 'NASA Space Apps 2026 · Tegucigalpa',
  lineasTitulo: ['Earth has already rehearsed', 'the Moon and Mars.'],
  acento: 'Now we need to find where.',
  entradilla:
    'A search tool that scans the whole Earth and compares it with a site on the Moon or Mars, variable by variable. For each place it tells you what matches, by how much, what doesn’t, and what it is good for.',
  accion: 'See the challenge',
  pista: 'Move the cursor: it is a probe over the terrain.',
};

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
};

export const loQueNo = {
  antetitulo: 'Out of scope',
  titulo: 'We are not after what is already known',
  entradilla:
    'The challenge asks us to look beyond well-studied analogs and places that only look alike. The analogy is measured by physical processes, not by photos.',
  conocidos: ['Antarctica', 'Atacama', 'Iceland', 'Hawaii', 'Haughton', 'Death Valley', 'Mojave'],
  cierre: 'What we are looking for lies in the part of Earth almost nobody has checked.',
  etiquetaLista: 'Well-studied analogs, out of scope',
};

export const metodo = {
  antetitulo: 'The method',
  titulo: 'Many variables at once, not a photo',
  entradilla:
    'Every place on Earth is compared with the destination using 1 to k physical variables. Adding variables does not change the formula.',
  pasos: [
    { titulo: 'Pick the destination', cuerpo: 'A permanent lunar base site or a Mars exploration site.' },
    { titulo: 'Pick the use', cuerpo: 'Rover, habitat or water: the use decides how much each variable weighs.' },
    { titulo: 'Compare the whole Earth', cuerpo: 'Every cell is measured against the destination, with filters for what is non-negotiable.' },
    { titulo: 'Explain the result', cuerpo: 'A score from 0 to 1 with its breakdown: what matches, by how much, and what differs.' },
  ],
  capas: ['Slope', 'Roughness', 'Relative relief', 'Emissivity', 'Permafrost', 'Wind', '+ k'],
  fuente: 'Formula: ADR-006 · Variables: ADR-008',
  etiquetaCapas: 'Layers compared at the same time',
};
