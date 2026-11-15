/**
 * Integrantes del equipo, por alias. El rol de cada uno está en `es/equipo.js` y `en/equipo.js` (`roles`, por `id`).
 * `linkedin` queda en cadena vacía cuando el integrante no comparte perfil.
 * @typedef {{ id: string, nombre: string, github: string, linkedin: string, correo: string }} Integrante
 */

/** @type {Integrante[]} */
export const integrantes = [
  { id: 'armando', nombre: 'Armando Villamil', github: 'Arvillax', linkedin: 'https://www.linkedin.com/in/armando-villamil', correo: 'arvillax05@gmail.com' },
  { id: 'juan', nombre: 'Juan Ramón Aguilar Martínez', github: 'JuanRa012012', linkedin: 'https://www.linkedin.com/in/juan-ramon-aguilar-martinez-69044980', correo: 'jraguilar012012@gmail.com' },
  { id: 'kevin', nombre: 'Kevin Mejía', github: 'Kev-M023', linkedin: 'https://www.linkedin.com/in/kevin-mejia-a21964372', correo: 'kevinme023@gmail.com' },
  { id: 'david', nombre: 'David Andino', github: 'jdavidandino555-lab', linkedin: '', correo: 'jdavid.andino555@gmail.com' },
  { id: 'fernando', nombre: 'Fernando Barahona', github: 'RedFer855', linkedin: 'https://www.linkedin.com/in/fernando-barahona-8a795543a', correo: 'fbarahona280@gmail.com' },
  { id: 'guillermo', nombre: 'Guillermo Rosa', github: 'IngGuillermoRosa', linkedin: 'https://www.linkedin.com/in/guillermo-rosa-2ba41b26a', correo: 'joseguillermorosa200519@gmail.com' },
];
