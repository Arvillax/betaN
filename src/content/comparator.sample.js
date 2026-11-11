/**
 * SAMPLE data for the comparator demo. These are not measurements: every value is a placeholder
 * until the real engine (ADR-006) produces them. The UI labels them as such.
 *
 * `difference` is the normalized distance between an Earth cell and the destination for one
 * variable (0 = identical). `null` means there is no data for that variable (Gower rule).
 *
 * @typedef {{ id: string, label: string }} Variable
 * @typedef {{ id: string, label: string, world: 'moon'|'mars', site: string, differences: Record<string, number|null>, earthCannot: string[] }} Destination
 * @typedef {{ id: string, label: string, weights: Record<string, number> }} Profile
 */

/** @type {Variable[]} */
export const variables = [
  { id: 'pendiente', label: 'Pendiente' },
  { id: 'rugosidad', label: 'Rugosidad' },
  { id: 'relieve', label: 'Relieve relativo' },
  { id: 'emisividad', label: 'Emisividad' },
  { id: 'permafrost', label: 'Permafrost' },
  { id: 'viento', label: 'Viento' },
];

/** @type {Destination[]} */
export const destinations = [
  {
    id: 'luna',
    label: 'Luna',
    world: 'moon',
    site: 'Sitio de base lunar (ejemplo)',
    differences: { pendiente: 0.4, rugosidad: 0.6, relieve: 0.9, emisividad: 1.4, permafrost: 0.5, viento: null },
    earthCannot: ['Gravedad: cerca de 1/6 de la terrestre', 'Sin atmósfera ni presión', 'Noches de unos 14 días terrestres'],
  },
  {
    id: 'marte',
    label: 'Marte',
    world: 'mars',
    site: 'Sitio de exploración en Marte (ejemplo)',
    differences: { pendiente: 0.5, rugosidad: 0.3, relieve: 0.7, emisividad: 0.6, permafrost: 1.8, viento: 0.9 },
    earthCannot: ['Gravedad: cerca de 0,38 de la terrestre', 'Atmósfera de CO₂ a menos del 1 % de la presión terrestre', 'Radiación en superficie sin campo magnético global'],
  },
];

/** Weight tables per use. Marked as sample in ADR-006 §7: there are no published weights. */
/** @type {Profile[]} */
export const profiles = [
  { id: 'rover', label: 'Rover', weights: { pendiente: 40, rugosidad: 40, relieve: 20, emisividad: 0, permafrost: 0, viento: 0 } },
  { id: 'habitat', label: 'Hábitat', weights: { pendiente: 30, rugosidad: 10, relieve: 20, emisividad: 10, permafrost: 20, viento: 10 } },
  { id: 'agua', label: 'Agua', weights: { pendiente: 0, rugosidad: 0, relieve: 20, emisividad: 20, permafrost: 60, viento: 0 } },
];

export const comparatorCopy = {
  eyebrow: 'Comparador',
  title: 'Mueve los pesos, mira el parecido',
  lead: 'Una celda de la Tierra contra un destino. Elige el uso o ajusta cada variable.',
  sampleTag: 'Ejemplo — dato pendiente',
  scoreLabel: 'Parecido S, de 0 a 1',
  note: 'Versión simplificada de ADR-006: distancia con pesos, sin correlación entre variables. Si falta un dato, la variable no cuenta y su peso se reparte.',
};
