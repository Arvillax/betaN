/**
 * Datos abiertos por variable. Los nombres salen de
 * contexto/10-reto/dimensiones-innegociables.md (sección 4).
 * Versiones, licencias y URL se completan desde contexto/50-referencia antes de la entrega.
 *
 * @typedef {{ nombre: string, version?: string, licencia?: string, url?: string }} ConjuntoDatos
 * @typedef {{ variable: string, tierra: ConjuntoDatos[], luna: ConjuntoDatos[], marte: ConjuntoDatos[] }} FilaDatos
 */

/** @type {FilaDatos[]} */
export const filasDatos = [
  {
    variable: 'Terreno',
    tierra: [{ nombre: 'Copernicus DEM' }, { nombre: 'NASADEM' }],
    luna: [{ nombre: 'LOLA' }],
    marte: [{ nombre: 'MOLA' }, { nombre: 'HRSC-MOLA' }],
  },
  {
    variable: 'Minerales',
    tierra: [{ nombre: 'ASTER GED AG1km V003' }, { nombre: 'EMIT' }],
    luna: [{ nombre: 'Diviner' }],
    marte: [{ nombre: 'TES' }, { nombre: 'THEMIS' }],
  },
  {
    variable: 'Temperatura',
    tierra: [{ nombre: 'MODIS MOD11' }, { nombre: 'NASA POWER' }],
    luna: [{ nombre: 'Diviner' }],
    marte: [{ nombre: 'THEMIS' }, { nombre: 'TES' }],
  },
  {
    variable: 'Hielo',
    tierra: [{ nombre: 'NSIDC GGD318' }, { nombre: 'SMAP' }],
    luna: [{ nombre: 'Zonas en sombra permanente' }],
    marte: [{ nombre: 'SWIM' }],
  },
  {
    variable: 'Viento y polvo',
    tierra: [{ nombre: 'MERRA-2' }, { nombre: 'MAIAC' }],
    luna: [],
    marte: [{ nombre: 'MCD' }, { nombre: 'MDAD v1.1' }],
  },
  {
    variable: 'Subsuelo',
    tierra: [{ nombre: 'Pyroduct Digital Catalog' }, { nombre: 'WOKAM' }],
    luna: [{ nombre: 'LROC Pit Atlas' }],
    marte: [{ nombre: 'MGC³' }],
  },
];

export const textosDatos = {
  antetitulo: 'Datos abiertos',
  titulo: 'Cada comparación sale de una capa real',
  entradilla: 'Datos abiertos de NASA, USGS y ESA. Nada de capturas ni cifras sin un mapa detrás.',
  vacio: 'Sin capa: en la Luna no hay viento.',
  pendiente: 'Versión, licencia y URL de cada capa: pendientes de anotar en 50-referencia.',
  columnas: { tierra: 'Tierra', luna: 'Luna', marte: 'Marte' },
};
