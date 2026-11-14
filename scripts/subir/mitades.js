/**
 * Reparto del repo en dos mitades para subirlo desde dos PC al mismo repositorio.
 * Patrones: ruta exacta o 'carpeta/**'. Rutas relativas al repo, con barras '/'.
 *
 * Cada mitad se sube en varios commits, uno por grupo y en el orden de la lista. Un archivo va al PRIMER grupo
 * cuyos `patrones` coinciden y cuyos `excluir` (opcional) no coinciden; asi un grupo general puede dejar fuera una
 * subcarpeta que tiene su propio commit mas adelante.
 * Los mensajes no mencionan el reparto ni el origen (lo comprueba mitades.test.js).
 */

/** @typedef {{ mensaje: string, patrones: string[], excluir?: string[] }} Grupo */

/** Mitad 1: estructura y estilo (PC 1). @type {Grupo[]} */
export const GRUPOS_MITAD_1 = [
  {
    mensaje: 'chore: configuración del proyecto con Vite, Less y Handlebars',
    patrones: ['package.json', 'package-lock.json', 'vite.config.js', 'jsconfig.json', '.gitignore', 'public/**'],
  },
  {
    mensaje: 'feat(utilidades): funciones de matemática, eventos, DOM, movimiento y puntero',
    patrones: ['src/utilidades/**'],
  },
  {
    mensaje: 'feat(estilos): tokens, base y componentes',
    patrones: ['src/estilos/**'],
    excluir: ['src/estilos/paginas/**'],
  },
  {
    mensaje: 'feat(estilos): estilos de cada diapositiva',
    patrones: ['src/estilos/paginas/**'],
  },
  {
    mensaje: 'feat: páginas en español e inglés, logo y punto de entrada',
    patrones: ['index.html', 'en/index.html', 'src/main.js', 'src/recursos/**'],
  },
];

/** Mitad 2: contenido y comportamiento (PC 2). El flujo de Pages va aqui para publicar solo con el repo completo. */
export const GRUPOS_MITAD_2 = [
  {
    mensaje: 'feat(contenido): textos en español e inglés y datos compartidos',
    patrones: ['src/contenido/**'],
  },
  {
    mensaje: 'feat(vistas): plantilla, componentes y diapositivas',
    patrones: ['src/vistas/**'],
  },
  {
    mensaje: 'feat(terreno): fondo WebGL interactivo con relieve de la Tierra, la Luna y Marte',
    patrones: ['src/modulos/terreno/**'],
  },
  {
    mensaje: 'feat(presentacion): navegación entre diapositivas, sonda e idioma',
    patrones: ['src/modulos/presentacion/**', 'src/modulos/sonda/**', 'src/modulos/idioma/**'],
  },
  {
    mensaje: 'ci(pages): publicación en GitHub Pages',
    patrones: ['.github/workflows/pages.yml'],
  },
  {
    mensaje: 'docs: README del proyecto',
    patrones: ['README.md'],
  },
];

export const MITAD_1 = GRUPOS_MITAD_1.flatMap((grupo) => grupo.patrones);
export const MITAD_2 = GRUPOS_MITAD_2.flatMap((grupo) => grupo.patrones);

/** No se suben con ninguna mitad: ni la guia de subida ni este script van al repositorio nuevo. */
export const EXCLUIDOS = ['odd/**', 'dist/**', 'node_modules/**', 'guiasubir.md', 'scripts/**'];

/**
 * @param {string} patron Ruta exacta o 'prefijo/**'.
 * @param {string} ruta
 */
export function coincide(patron, ruta) {
  if (patron.endsWith('/**')) return ruta.startsWith(patron.slice(0, -2));
  return ruta === patron;
}

function gruposDeMitad(n) {
  if (n === 1) return GRUPOS_MITAD_1;
  if (n === 2) return GRUPOS_MITAD_2;
  throw new Error(`Mitad desconocida: ${n}`);
}

/**
 * @param {1 | 2} n
 * @param {string[]} archivosDelRepo
 * @returns {string[]}
 */
export function archivosDeMitad(n, archivosDelRepo) {
  const patrones = gruposDeMitad(n).flatMap((grupo) => grupo.patrones);
  return archivosDelRepo.filter(
    (ruta) => patrones.some((patron) => coincide(patron, ruta)) && !EXCLUIDOS.some((patron) => coincide(patron, ruta)),
  );
}

/**
 * Reparte los archivos de una mitad en commits, en el orden de sus grupos. Omite los grupos sin archivos.
 * @param {1 | 2} n
 * @param {string[]} archivosDeLaMitad
 * @returns {{ mensaje: string, archivos: string[] }[]}
 */
export function agruparPorCommits(n, archivosDeLaMitad) {
  const grupos = gruposDeMitad(n);
  const porGrupo = grupos.map(() => []);
  for (const ruta of archivosDeLaMitad) {
    const indice = grupos.findIndex(
      (grupo) =>
        grupo.patrones.some((patron) => coincide(patron, ruta)) &&
        !(grupo.excluir ?? []).some((patron) => coincide(patron, ruta)),
    );
    if (indice === -1) throw new Error(`El archivo ${ruta} no pertenece a ningún commit de la mitad ${n}.`);
    porGrupo[indice].push(ruta);
  }
  return grupos
    .map((grupo, indice) => ({ mensaje: grupo.mensaje, archivos: porGrupo[indice] }))
    .filter((commit) => commit.archivos.length > 0);
}

const INICIO_SUBIR = '<!-- subir:inicio -->';
const FIN_SUBIR = '<!-- subir:fin -->';

/**
 * Quita del README el bloque entre las marcas de subida (marcas incluidas) y una linea en blanco vecina,
 * para que el repositorio nuevo no enlace a una guia que no lleva. Sin marcas, devuelve el texto igual.
 * @param {string} texto
 */
export function quitarBloqueSubir(texto) {
  const inicio = texto.indexOf(INICIO_SUBIR);
  const fin = inicio === -1 ? -1 : texto.indexOf(FIN_SUBIR, inicio);
  if (fin === -1) return texto;
  let antes = texto.slice(0, inicio);
  let despues = texto.slice(fin + FIN_SUBIR.length).replace(/^\r?\n/, '');
  if (/^\r?\n/.test(despues)) despues = despues.replace(/^\r?\n/, '');
  else if (despues === '') antes = antes.replace(/\r?\n$/, '');
  return antes + despues;
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
