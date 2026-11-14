/**
 * Reparto del repo en dos mitades para subirlo desde dos PC al mismo repositorio.
 * Patrones: ruta exacta o 'carpeta/**'. Rutas relativas al repo, con barras '/'.
 */

/** Mitad 1: estructura y estilo (PC 1). */
export const MITAD_1 = [
  'package.json',
  'package-lock.json',
  'vite.config.js',
  'jsconfig.json',
  '.gitignore',
  'index.html',
  'en/index.html',
  'public/**',
  'src/main.js',
  'src/estilos/**',
  'src/utilidades/**',
  'src/recursos/**',
];

/** Mitad 2: contenido y comportamiento (PC 2). El flujo de Pages va aqui para publicar solo con el repo completo. */
export const MITAD_2 = [
  'src/contenido/**',
  'src/vistas/**',
  'src/modulos/**',
  'README.md',
  'guiasubir.md',
  'scripts/**',
  '.github/workflows/pages.yml',
];

/** No se suben con ninguna mitad. */
export const EXCLUIDOS = ['odd/**', 'dist/**', 'node_modules/**'];

/**
 * @param {string} patron Ruta exacta o 'prefijo/**'.
 * @param {string} ruta
 */
export function coincide(patron, ruta) {
  if (patron.endsWith('/**')) return ruta.startsWith(patron.slice(0, -2));
  return ruta === patron;
}

/**
 * @param {1 | 2} n
 * @param {string[]} archivosDelRepo
 * @returns {string[]}
 */
export function archivosDeMitad(n, archivosDelRepo) {
  const patrones = n === 1 ? MITAD_1 : n === 2 ? MITAD_2 : null;
  if (!patrones) throw new Error(`Mitad desconocida: ${n}`);
  return archivosDelRepo.filter(
    (ruta) => patrones.some((patron) => coincide(patron, ruta)) && !EXCLUIDOS.some((patron) => coincide(patron, ruta)),
  );
}

const PARTE = '[A-Za-z0-9][A-Za-z0-9-]{0,38}';
const REPO = '[A-Za-z0-9._-]+?';
const URL_HTTPS = new RegExp(`^https://github\\.com/(${PARTE})/(${REPO})(?:\\.git)?/?$`);
const URL_SSH = new RegExp(`^git@github\\.com:(${PARTE})/(${REPO})\\.git$`);
const RUTA_LOCAL = /^(?:file:\/\/\/?[^\s;&|`$<>]+|\/[^\s;&|`$<>]*|[A-Za-z]:[\\/][^;&|`$<>\n]*|\.{1,2}[\\/][^;&|`$<>\n]*)$/;

/**
 * @param {string} url
 * @param {{ permitirLocal?: boolean }} [opciones] permitirLocal acepta file:// y rutas a un repo local (solo pruebas).
 * @returns {{ valida: boolean, dueno: string | null, repo: string | null }}
 */
export function validarUrlRepo(url, { permitirLocal = false } = {}) {
  const invalida = { valida: false, dueno: null, repo: null };
  if (typeof url !== 'string') return invalida;
  const texto = url.trim();
  const github = URL_HTTPS.exec(texto) ?? URL_SSH.exec(texto);
  if (github) {
    const [, dueno, repo] = github;
    if (repo === '.' || repo === '..') return invalida;
    return { valida: true, dueno, repo };
  }
  if (permitirLocal && RUTA_LOCAL.test(texto)) return { valida: true, dueno: null, repo: null };
  return invalida;
}
