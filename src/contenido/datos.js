/**
 * Datasets principales por cuerpo y herramientas del proyecto. `licencia` es una clave: su texto está en
 * `es/datos.js` y `en/datos.js` (`licencias`). `version: null` se muestra como pendiente.
 * `verificada` es true solo si la fuente dice que la licencia se comprobó (✔ en el manifiesto o nota de verificación).
 *
 * @typedef {{ cuerpo: 'tierra'|'luna'|'marte', nombre: string, version: string|null, licencia: string, verificada: boolean }} ConjuntoDatos
 * @typedef {{ id: string, nombre: string }} Herramienta
 */

// Fuente: analogos-space-apps-2026/contexto/30-datos/manifiesto-de-datasets.md (§1 a §3) y
// contexto/50-referencia/sensores-tierra.md:98 (licencias de Copernicus, aridez y Pyroduct verificadas)
/** @type {ConjuntoDatos[]} */
export const conjuntosDatos = [
  { cuerpo: 'tierra', nombre: 'Copernicus DEM GLO-90', version: '2024_1', licencia: 'copernicus-dem', verificada: true },
  { cuerpo: 'tierra', nombre: 'ASTER GED AG1km', version: 'V003', licencia: 'dominio-publico-nasa', verificada: false },
  { cuerpo: 'tierra', nombre: 'MODIS MYD11C3 (Aqua)', version: 'V061', licencia: 'dominio-publico-nasa', verificada: false },
  { cuerpo: 'tierra', nombre: 'MODIS MOD13C1 (NDVI)', version: 'V061', licencia: 'dominio-publico-nasa', verificada: false },
  { cuerpo: 'tierra', nombre: 'MERRA-2 M2T1NXFLX', version: null, licencia: 'dominio-publico-nasa', verificada: false },
  { cuerpo: 'tierra', nombre: 'Global-AI_PET', version: 'v3.1', licencia: 'cc-by-4-no-comercial', verificada: true },
  { cuerpo: 'tierra', nombre: 'JRC GSW', version: 'v1.5', licencia: 'copernicus-abierta', verificada: true },
  { cuerpo: 'tierra', nombre: 'Pyroduct Digital Catalog', version: 'v3.0', licencia: 'cc-by-4', verificada: true },

  { cuerpo: 'luna', nombre: 'LOLA LDEM_80S_20M', version: 'V2.1', licencia: 'dominio-publico-nasa', verificada: false },
  { cuerpo: 'luna', nombre: 'LOLA Polar Illumination / Permanent Shadow', version: null, licencia: 'dominio-publico-nasa', verificada: false },
  { cuerpo: 'luna', nombre: 'Diviner CF (Lucey et al. 2021)', version: null, licencia: 'cc-by-4', verificada: true },
  { cuerpo: 'luna', nombre: 'Diviner GDR L3 dgdr_tbol_avg_pols', version: null, licencia: 'dominio-publico-nasa', verificada: false },
  { cuerpo: 'luna', nombre: 'M3 L2 CH1M3_0004', version: null, licencia: 'dominio-publico-nasa', verificada: false },
  { cuerpo: 'luna', nombre: 'LROC Lunar Pit Atlas', version: null, licencia: 'permiso-sin-confirmar', verificada: false },

  { cuerpo: 'marte', nombre: 'HRSC-MOLA blended DEM', version: 'v2', licencia: 'dominio-publico-usgs', verificada: false },
  { cuerpo: 'marte', nombre: 'CTX DTM / HiRISE DTM', version: null, licencia: 'dominio-publico', verificada: false },
  { cuerpo: 'marte', nombre: 'TES (Bandfield 2002)', version: null, licencia: 'dominio-publico-nasa', verificada: false },
  { cuerpo: 'marte', nombre: 'THEMIS Global Thermal Inertia', version: null, licencia: 'dominio-publico', verificada: false },
  { cuerpo: 'marte', nombre: 'Mars Climate Database (MCD)', version: '6.2', licencia: 'mcd', verificada: true },
  { cuerpo: 'marte', nombre: 'SWIM', version: '2.0', licencia: 'sin-licencia', verificada: false },
  { cuerpo: 'marte', nombre: 'MDAD', version: 'v1.1', licencia: 'cc-by-4', verificada: true },
  { cuerpo: 'marte', nombre: 'Montabone dust climatology', version: 'v2', licencia: 'cc-by-sa-3', verificada: true },
];

/** Orden de las columnas de datasets. */
export const idsCuerpos = ['tierra', 'luna', 'marte'];

// Fuente: analogos-space-apps-2026/motor/LEEME.md:13, scripts/etl/*.py, visor/package.json:13 y package.json de esta landing
/** @type {Herramienta[]} */
export const herramientas = [
  { id: 'motor', nombre: 'Rust · rayon · mmap' },
  { id: 'etl', nombre: 'Python · GDAL · numpy' },
  { id: 'visor', nombre: 'CesiumJS 1.147.0 · Vite' },
  { id: 'landing', nombre: 'Vite · Handlebars · Less · WebGL2' },
];
