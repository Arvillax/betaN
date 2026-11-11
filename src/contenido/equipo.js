/**
 * Integrantes del equipo. Agrega un objeto por persona; mientras la lista esté vacía, la diapositiva muestra una invitación.
 * @typedef {{ nombre: string, rol: string, url?: string }} Integrante
 */

/** @type {Integrante[]} */
export const integrantes = [];

export const textosEquipo = {
  antetitulo: 'Equipo',
  titulo: 'J4K',
  entradilla: 'Un equipo de Tegucigalpa en el reto “Identify Earth Locations that Analog the Permanent Moon Base Locations and Mars”.',
  vacio: 'Agrega a cada integrante en src/contenido/equipo.js.',
  cierre: 'Datos abiertos, analogía por procesos físicos y cada diferencia dicha en voz alta.',
};
