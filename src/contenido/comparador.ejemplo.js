/**
 * Datos de EJEMPLO para la demo del comparador. No son mediciones: cada valor es provisional
 * hasta que el motor real (ADR-006) los produzca. La interfaz los marca como tales.
 *
 * `diferencias` guarda la distancia normalizada entre una celda de la Tierra y el destino para cada
 * variable (0 = idénticas). `null` indica que no hay dato para esa variable (regla de Gower).
 *
 * @typedef {{ id: string, etiqueta: string }} Variable
 * @typedef {{ id: string, etiqueta: string, mundo: 'luna'|'marte', sitio: string, diferencias: Record<string, number|null>, tierraNoPuede: string[] }} Destino
 * @typedef {{ id: string, etiqueta: string, pesos: Record<string, number> }} Perfil
 */

/** @type {Variable[]} */
export const variables = [
  { id: 'pendiente', etiqueta: 'Pendiente' },
  { id: 'rugosidad', etiqueta: 'Rugosidad' },
  { id: 'relieve', etiqueta: 'Relieve relativo' },
  { id: 'emisividad', etiqueta: 'Emisividad' },
  { id: 'permafrost', etiqueta: 'Permafrost' },
  { id: 'viento', etiqueta: 'Viento' },
];

/** @type {Destino[]} */
export const destinos = [
  {
    id: 'luna',
    etiqueta: 'Luna',
    mundo: 'luna',
    sitio: 'Sitio de base lunar (ejemplo)',
    diferencias: { pendiente: 0.4, rugosidad: 0.6, relieve: 0.9, emisividad: 1.4, permafrost: 0.5, viento: null },
    tierraNoPuede: ['Gravedad: cerca de 1/6 de la terrestre', 'Sin atmósfera ni presión', 'Noches de unos 14 días terrestres'],
  },
  {
    id: 'marte',
    etiqueta: 'Marte',
    mundo: 'marte',
    sitio: 'Sitio de exploración en Marte (ejemplo)',
    diferencias: { pendiente: 0.5, rugosidad: 0.3, relieve: 0.7, emisividad: 0.6, permafrost: 1.8, viento: 0.9 },
    tierraNoPuede: ['Gravedad: cerca de 0,38 de la terrestre', 'Atmósfera de CO₂ a menos del 1 % de la presión terrestre', 'Radiación en superficie sin campo magnético global'],
  },
];

/** Tablas de pesos por uso. Marcadas como ejemplo en ADR-006 §7: no hay pesos publicados. */
/** @type {Perfil[]} */
export const perfiles = [
  { id: 'rover', etiqueta: 'Rover', pesos: { pendiente: 40, rugosidad: 40, relieve: 20, emisividad: 0, permafrost: 0, viento: 0 } },
  { id: 'habitat', etiqueta: 'Hábitat', pesos: { pendiente: 30, rugosidad: 10, relieve: 20, emisividad: 10, permafrost: 20, viento: 10 } },
  { id: 'agua', etiqueta: 'Agua', pesos: { pendiente: 0, rugosidad: 0, relieve: 20, emisividad: 20, permafrost: 60, viento: 0 } },
];

export const textosComparador = {
  antetitulo: 'Comparador',
  titulo: 'Mueve los pesos, mira el parecido',
  entradilla: 'Una celda de la Tierra contra un destino. Elige el uso o ajusta cada variable.',
  etiquetaEjemplo: 'Ejemplo — dato pendiente',
  etiquetaPuntaje: 'Parecido S, de 0 a 1',
  nota: 'Versión simplificada de ADR-006: distancia con pesos, sin correlación entre variables. Si falta un dato, la variable no cuenta y su peso se reparte.',
};
