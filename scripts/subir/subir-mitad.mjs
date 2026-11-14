#!/usr/bin/env node
// Sube una mitad de este repo a un repositorio de GitHub: la PC 1 sube la mitad 1 y la PC 2 la mitad 2.
// Uso: node scripts/subir/subir-mitad.mjs [--pc 1|2] [--repo <url>]   (ver guiasubir.md)
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';
import { archivosDeMitad, coincide, MITAD_2, validarUrlRepo } from './mitades.js';

const NOMBRES = { 1: 'mitad 1 (estructura y estilo)', 2: 'mitad 2 (contenido y comportamiento)' };
const MENSAJES = {
  1: 'chore: mitad 1 (estructura y estilo) desde la PC 1',
  2: 'feat: mitad 2 (contenido y comportamiento) desde la PC 2',
};

class Detener extends Error {}

function detener(mensaje) {
  throw new Detener(mensaje);
}

/** Ejecuta git (o gh) sin shell. Con `mostrar`, la salida va directo a la terminal (permite pedir credenciales). */
function ejecutar(programa, args, { cwd, mostrar = false, permitirFallo = false } = {}) {
  const resultado = spawnSync(programa, args, {
    cwd,
    encoding: 'utf8',
    stdio: mostrar ? 'inherit' : ['ignore', 'pipe', 'pipe'],
  });
  if (resultado.error) {
    if (permitirFallo) return { ok: false, salida: '', error: resultado.error.message };
    detener(`No se pudo ejecutar ${programa}: ${resultado.error.message}`);
  }
  const ok = resultado.status === 0;
  const salida = (resultado.stdout ?? '').trim();
  const error = (resultado.stderr ?? '').trim();
  if (!ok && !permitirFallo) {
    detener(`Falló: ${programa} ${args.join(' ')}${error ? `\n${error}` : ''}`);
  }
  return { ok, salida, error };
}

const git = (args, opciones) => ejecutar('git', args, opciones);

function leerArgumentos(argv) {
  const opciones = { pc: undefined, repo: undefined, permitirLocal: false, ayuda: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--pc') opciones.pc = argv[++i] ?? '';
    else if (arg.startsWith('--pc=')) opciones.pc = arg.slice(5);
    else if (arg === '--repo') opciones.repo = argv[++i] ?? '';
    else if (arg.startsWith('--repo=')) opciones.repo = arg.slice(7);
    else if (arg === '--permitir-local') opciones.permitirLocal = true;
    else if (arg === '--ayuda' || arg === '-h' || arg === '--help') opciones.ayuda = true;
    else detener(`Opción desconocida: ${arg}. Use --ayuda.`);
  }
  return opciones;
}

/** Lector de líneas que no pierde respuestas cuando llegan por una tubería antes de la pregunta. */
function crearPreguntador() {
  const rl = createInterface({ input: process.stdin, terminal: false });
  const lineas = rl[Symbol.asyncIterator]();
  return {
    async preguntar(texto) {
      process.stdout.write(texto);
      const { value, done } = await lineas.next();
      if (done) detener('No se recibió respuesta (la entrada terminó).');
      if (!process.stdin.isTTY) process.stdout.write(`${value}\n`);
      return value.trim();
    },
    cerrar: () => rl.close(),
  };
}

async function pedirDatos(opciones) {
  let preguntador;
  const pregunta = async (texto) => {
    preguntador ??= crearPreguntador();
    return preguntador.preguntar(texto);
  };
  try {
    let pc = opciones.pc;
    if (pc !== undefined && pc !== '1' && pc !== '2') detener(`--pc debe ser 1 o 2 (recibido: "${pc}").`);
    while (pc !== '1' && pc !== '2') {
      pc = await pregunta('¿Es la PC 1 o la PC 2? (1/2): ');
      if (pc !== '1' && pc !== '2') console.log('Responda 1 o 2.');
    }

    const validar = (url) => validarUrlRepo(url, { permitirLocal: opciones.permitirLocal });
    let repo = opciones.repo;
    if (repo !== undefined && !validar(repo).valida) {
      detener(`--repo no es una URL de GitHub válida: "${repo}". Ejemplo: https://github.com/usuario/repo`);
    }
    while (repo === undefined || !validar(repo).valida) {
      repo = await pregunta('URL del repositorio destino (https://github.com/usuario/repo): ');
      if (!validar(repo).valida) console.log('URL no válida. Ejemplo: https://github.com/usuario/repo');
    }
    return { pc: Number(pc), repo: repo.trim() };
  } finally {
    preguntador?.cerrar();
  }
}

/** Git corre en una carpeta temporal: las rutas locales relativas se vuelven absolutas. */
function normalizarDestino(url, { dueno }) {
  if (dueno || url.startsWith('file://')) return url;
  return path.resolve(url);
}

function raizFuente() {
  const carpetaScript = path.dirname(fileURLToPath(import.meta.url));
  const resultado = git(['rev-parse', '--show-toplevel'], { cwd: carpetaScript, permitirFallo: true });
  if (resultado.ok) return { raiz: path.resolve(resultado.salida), esGit: true };
  return { raiz: path.resolve(carpetaScript, '..', '..'), esGit: false };
}

function listarRecursivo(raiz, relativa = '') {
  const archivos = [];
  for (const entrada of fs.readdirSync(path.join(raiz, relativa), { withFileTypes: true })) {
    const ruta = relativa ? `${relativa}/${entrada.name}` : entrada.name;
    if (entrada.isDirectory()) {
      if (['.git', 'node_modules', 'dist'].includes(entrada.name)) continue;
      archivos.push(...listarRecursivo(raiz, ruta));
    } else if (entrada.isFile()) {
      archivos.push(ruta);
    }
  }
  return archivos;
}

/** Archivos de la copia de origen: los rastreados y los nuevos que git no ignora. */
function archivosFuente({ raiz, esGit }) {
  const lista = esGit
    ? git(['ls-files', '--cached', '--others', '--exclude-standard'], { cwd: raiz }).salida.split('\n')
    : listarRecursivo(raiz);
  return lista.filter((ruta) => ruta && fs.existsSync(path.join(raiz, ruta)));
}

function verificarIdentidad(cwd) {
  const nombre = git(['config', '--get', 'user.name'], { cwd, permitirFallo: true }).salida;
  const correo = git(['config', '--get', 'user.email'], { cwd, permitirFallo: true }).salida;
  if (!nombre || !correo) {
    detener(
      'Git no sabe quién firma los commits. Configúrelo y vuelva a ejecutar:\n' +
        '  git config --global user.name "Su nombre"\n' +
        '  git config --global user.email "su-correo@ejemplo.com"',
    );
  }
}

function copiar(archivos, raizOrigen, raizDestino) {
  for (const ruta of archivos) {
    const destino = path.join(raizDestino, ...ruta.split('/'));
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.copyFileSync(path.join(raizOrigen, ...ruta.split('/')), destino);
  }
}

function confirmar(cwd, mensaje) {
  git(['add', '-A'], { cwd });
  if (git(['diff', '--cached', '--quiet'], { cwd, permitirFallo: true }).ok) detener('No hay archivos nuevos que subir.');
  git(['commit', '-q', '-m', mensaje], { cwd });
  return git(['rev-parse', '--short', 'HEAD'], { cwd }).salida;
}

function subirMitad1({ destino, archivos, raiz, trabajo }) {
  const cabezas = git(['ls-remote', '--heads', destino], { cwd: trabajo }).salida;
  if (cabezas) detener('El repositorio ya tiene commits: la mitad 1 va en un repositorio vacío.');

  const carpeta = path.join(trabajo, 'mitad-1');
  fs.mkdirSync(carpeta);
  git(['init', '-q', '-b', 'main'], { cwd: carpeta });
  copiar(archivos, raiz, carpeta);
  const commit = confirmar(carpeta, MENSAJES[1]);
  git(['remote', 'add', 'origin', destino], { cwd: carpeta });
  git(['push', '-u', 'origin', 'main'], { cwd: carpeta, mostrar: true });
  return commit;
}

function subirMitad2({ destino, archivos, raiz, trabajo }) {
  const carpeta = path.join(trabajo, 'destino');
  git(['clone', '-q', destino, carpeta], { cwd: trabajo, mostrar: true });

  const tieneMain = git(['rev-parse', '--verify', '--quiet', 'refs/remotes/origin/main'], {
    cwd: carpeta,
    permitirFallo: true,
  }).ok;
  if (!tieneMain) detener('Primero tiene que subir la PC 1: el repositorio no tiene la rama main.');
  git(['checkout', '-q', 'main'], { cwd: carpeta });
  if (!fs.existsSync(path.join(carpeta, 'package.json'))) {
    detener('Primero tiene que subir la PC 1: falta package.json en main.');
  }

  const yaSubidos = git(['ls-files'], { cwd: carpeta })
    .salida.split('\n')
    .filter((ruta) => ruta && MITAD_2.some((patron) => coincide(patron, ruta)));
  if (yaSubidos.length > 0) {
    detener(`La mitad 2 ya está en el repositorio (por ejemplo ${yaSubidos[0]}). No se sube dos veces.`);
  }

  copiar(archivos, raiz, carpeta);
  const commit = confirmar(carpeta, MENSAJES[2]);
  git(['push', 'origin', 'main'], { cwd: carpeta, mostrar: true });
  return commit;
}

function esperar(milisegundos) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milisegundos);
}

function pasosManuales(dueno, repo) {
  console.log(
    '\nActive GitHub Pages a mano:\n' +
      `  1. https://github.com/${dueno}/${repo}/settings/pages → Source: GitHub Actions.\n` +
      `  2. https://github.com/${dueno}/${repo}/actions → "Publicar en GitHub Pages" → Run workflow.`,
  );
}

/** Activa Pages con GitHub Actions y lanza el flujo. Devuelve false si hay que hacerlo a mano. */
function activarPages(dueno, repo) {
  if (!ejecutar('gh', ['--version'], { permitirFallo: true }).ok) {
    console.log('\nNo se encontró gh (GitHub CLI).');
    return false;
  }
  const ruta = `repos/${dueno}/${repo}/pages`;
  const crear = ejecutar('gh', ['api', '-X', 'POST', ruta, '-f', 'build_type=workflow'], { permitirFallo: true });
  if (!crear.ok) {
    if (!/409/.test(crear.error)) {
      console.log(`\ngh no pudo activar Pages:\n${crear.error}`);
      return false;
    }
    const cambiar = ejecutar('gh', ['api', '-X', 'PUT', ruta, '-f', 'build_type=workflow'], { permitirFallo: true });
    if (!cambiar.ok) {
      console.log(`\ngh no pudo cambiar Pages a GitHub Actions:\n${cambiar.error}`);
      return false;
    }
  }
  console.log('\nGitHub Pages queda publicado con GitHub Actions.');

  // GitHub tarda unos segundos en registrar el flujo recién subido.
  let lanzar;
  for (let intento = 1; intento <= 4; intento += 1) {
    lanzar = ejecutar('gh', ['workflow', 'run', 'pages.yml', '-R', `${dueno}/${repo}`, '--ref', 'main'], {
      permitirFallo: true,
    });
    if (lanzar.ok) break;
    if (intento < 4) esperar(5000);
  }
  if (!lanzar.ok) {
    console.log(`\ngh no pudo lanzar el flujo:\n${lanzar.error}`);
    return false;
  }
  console.log('Flujo "Publicar en GitHub Pages" lanzado. Revise su avance en la pestaña Actions.');
  return true;
}

function urlPages(dueno, repo) {
  return repo.toLowerCase() === `${dueno.toLowerCase()}.github.io`
    ? `https://${dueno}.github.io/`
    : `https://${dueno}.github.io/${repo}/`;
}

async function principal() {
  const opciones = leerArgumentos(process.argv.slice(2));
  if (opciones.ayuda) {
    console.log('Uso: node scripts/subir/subir-mitad.mjs [--pc 1|2] [--repo https://github.com/usuario/repo]');
    console.log('Sin opciones, el script pregunta los dos datos. Ver guiasubir.md.');
    return;
  }

  const fuente = raizFuente();
  const { pc, repo } = await pedirDatos(opciones);
  const datosUrl = validarUrlRepo(repo, { permitirLocal: opciones.permitirLocal });
  const destino = normalizarDestino(repo, datosUrl);

  const archivos = archivosDeMitad(pc, archivosFuente(fuente));
  if (archivos.length === 0) detener(`No se encontraron archivos de la ${NOMBRES[pc]} en ${fuente.raiz}.`);

  const trabajo = fs.mkdtempSync(path.join(os.tmpdir(), 'subir-mitad-'));
  try {
    verificarIdentidad(trabajo);
    console.log(`\nSubiendo la ${NOMBRES[pc]} (${archivos.length} archivos) a ${repo}…`);
    const contexto = { destino, archivos, raiz: fuente.raiz, trabajo };
    const commit = pc === 1 ? subirMitad1(contexto) : subirMitad2(contexto);

    console.log(`\nListo: ${NOMBRES[pc]} subida.`);
    console.log(`  Archivos: ${archivos.length}`);
    console.log(`  Commit:   ${commit}`);

    if (pc === 1) {
      console.log('\nSiguiente paso: la PC 2 ejecuta este mismo script y responde 2.');
      return;
    }
    const { dueno, repo: nombreRepo } = datosUrl;
    if (!dueno) return;
    if (!activarPages(dueno, nombreRepo)) pasosManuales(dueno, nombreRepo);
    console.log(`\nLa página quedará en ${urlPages(dueno, nombreRepo)} cuando termine el flujo.`);
  } finally {
    try {
      fs.rmSync(trabajo, { recursive: true, force: true, maxRetries: 3 });
    } catch {
      console.log(`(No se pudo borrar la carpeta temporal ${trabajo}; puede borrarla a mano.)`);
    }
  }
}

principal().catch((error) => {
  if (error instanceof Detener) {
    console.error(`\n${error.message}`);
  } else {
    console.error(error);
  }
  process.exitCode = 1;
});
