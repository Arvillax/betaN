/**
 * Project milestones, in date order.
 * @typedef {'hecho'|'en-curso'|'proximo'} MilestoneStatus
 * @typedef {{ date: string, title: string, body: string, status: MilestoneStatus }} Milestone
 */

export const statusLabels = {
  hecho: 'Hecho',
  'en-curso': 'En curso',
  proximo: 'Próximo',
};

/** @type {Milestone[]} */
export const milestones = [
  {
    date: '2026-11-05',
    title: 'Reto y variables',
    body: 'Lo que pide el reto, la fórmula del parecido y las variables de partida.',
    status: 'hecho',
  },
  {
    date: '2026-11-10',
    title: 'Datos descargados',
    body: 'Descarga repetible de los datasets y periodo común 2013–2022.',
    status: 'hecho',
  },
  {
    date: '2026-11-14',
    title: 'Hackathon, día 1',
    body: 'El motor compara la Tierra entera contra un sitio de la Luna y otro de Marte.',
    status: 'proximo',
  },
  {
    date: '2026-11-15',
    title: 'Hackathon, día 2',
    body: 'Mapa interactivo, fichas de los mejores análogos y video de entrega.',
    status: 'proximo',
  },
];

export const roadmapCopy = {
  eyebrow: 'Hoja de ruta',
  title: 'Del dato a la demo',
};
