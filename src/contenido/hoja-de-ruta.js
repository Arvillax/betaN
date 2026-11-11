/**
 * Hitos del proyecto, en orden de fecha.
 * @typedef {'hecho'|'en-curso'|'proximo'} EstadoHito
 * @typedef {{ fecha: string, titulo: string, cuerpo: string, estado: EstadoHito }} Hito
 */

export const etiquetasEstado = {
  hecho: 'Hecho',
  'en-curso': 'En curso',
  proximo: 'Próximo',
};

/** @type {Hito[]} */
export const hitos = [
  {
    fecha: '2026-11-05',
    titulo: 'Reto y variables',
    cuerpo: 'Lo que pide el reto, la fórmula del parecido y las variables de partida.',
    estado: 'hecho',
  },
  {
    fecha: '2026-11-10',
    titulo: 'Datos descargados',
    cuerpo: 'Descarga repetible de los datasets y periodo común 2013–2022.',
    estado: 'hecho',
  },
  {
    fecha: '2026-11-14',
    titulo: 'Hackathon, día 1',
    cuerpo: 'El motor compara la Tierra entera contra un sitio de la Luna y otro de Marte.',
    estado: 'proximo',
  },
  {
    fecha: '2026-11-15',
    titulo: 'Hackathon, día 2',
    cuerpo: 'Mapa interactivo, fichas de los mejores análogos y video de entrega.',
    estado: 'proximo',
  },
];

export const textosHojaDeRuta = {
  antetitulo: 'Hoja de ruta',
  titulo: 'Del dato a la demo',
};
