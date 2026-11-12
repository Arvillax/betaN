/**
 * Datos abiertos por variable. Los nombres salen de
 * contexto/10-reto/dimensiones-innegociables.md (sección 4).
 * Versiones, licencias y URL se completan desde contexto/50-referencia antes de la entrega.
 * El nombre de cada variable está en `es/datos.js` y `en/datos.js`, por `id`. Un conjunto sin nombre propio
 * lleva `clave` en vez de `nombre` y se traduce en `conjuntos`.
 *
 * @typedef {{ nombre?: string, clave?: string, version?: string, licencia?: string, url?: string }} ConjuntoDatos
 * @typedef {{ id: string, tierra: ConjuntoDatos[], luna: ConjuntoDatos[], marte: ConjuntoDatos[] }} FilaDatos
 */

/** @type {FilaDatos[]} */
export const filasDatos = [
  {
    id: 'terreno',
    tierra: [{ nombre: 'Copernicus DEM' }, { nombre: 'NASADEM' }],
    luna: [{ nombre: 'LOLA' }],
    marte: [{ nombre: 'MOLA' }, { nombre: 'HRSC-MOLA' }],
  },
  {
    id: 'minerales',
    tierra: [{ nombre: 'ASTER GED AG1km V003' }, { nombre: 'EMIT' }],
    luna: [{ nombre: 'Diviner' }],
    marte: [{ nombre: 'TES' }, { nombre: 'THEMIS' }],
  },
  {
    id: 'temperatura',
    tierra: [{ nombre: 'MODIS MOD11' }, { nombre: 'NASA POWER' }],
    luna: [{ nombre: 'Diviner' }],
    marte: [{ nombre: 'THEMIS' }, { nombre: 'TES' }],
  },
  {
    id: 'hielo',
    tierra: [{ nombre: 'NSIDC GGD318' }, { nombre: 'SMAP' }],
    luna: [{ clave: 'sombra-permanente' }],
    marte: [{ nombre: 'SWIM' }],
  },
  {
    id: 'viento',
    tierra: [{ nombre: 'MERRA-2' }, { nombre: 'MAIAC' }],
    luna: [],
    marte: [{ nombre: 'MCD' }, { nombre: 'MDAD v1.1' }],
  },
  {
    id: 'subsuelo',
    tierra: [{ nombre: 'Pyroduct Digital Catalog' }, { nombre: 'WOKAM' }],
    luna: [{ nombre: 'LROC Pit Atlas' }],
    marte: [{ nombre: 'MGC³' }],
  },
];
