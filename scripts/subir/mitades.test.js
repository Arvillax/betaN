import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  agruparPorCommits,
  archivosDeMitad,
  coincide,
  EXCLUIDOS,
  GRUPOS_MITAD_1,
  GRUPOS_MITAD_2,
  quitarBloqueSubir,
  validarUrlRepo,
} from './mitades.js';

const raizRepo = execFileSync('git', ['rev-parse', '--show-toplevel'], {
  cwd: fileURLToPath(new URL('.', import.meta.url)),
  encoding: 'utf8',
}).trim();
// Incluye los archivos nuevos sin rastrear: el script de subida tambien los copia.
const archivosDelRepo = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], {
  cwd: raizRepo,
  encoding: 'utf8',
})
  .split('\n')
  .filter(Boolean);

const mitad1 = archivosDeMitad(1, archivosDelRepo);
const mitad2 = archivosDeMitad(2, archivosDelRepo);

test('las mitades no comparten archivos', () => {
  const comunes = mitad1.filter((ruta) => mitad2.includes(ruta));
  assert.deepEqual(comunes, []);
});

test('las mitades y los excluidos cubren todo lo que lista git ls-files', () => {
  const sinDueno = archivosDelRepo.filter(
    (ruta) => !mitad1.includes(ruta) && !mitad2.includes(ruta) && !EXCLUIDOS.some((patron) => coincide(patron, ruta)),
  );
  assert.deepEqual(sinDueno, []);
});

test('los excluidos no entran en ninguna mitad', () => {
  const excluidosEnMitad = [...mitad1, ...mitad2].filter((ruta) => EXCLUIDOS.some((patron) => coincide(patron, ruta)));
  assert.deepEqual(excluidosEnMitad, []);
});

test('la mitad 1 no lleva contenido, vistas ni modulos', () => {
  const ajenos = mitad1.filter((ruta) => /^src\/(contenido|vistas|modulos)\//.test(ruta));
  assert.deepEqual(ajenos, []);
  assert.ok(mitad1.includes('package.json'));
  assert.ok(mitad1.includes('vite.config.js'));
});

test('la mitad 2 lleva el flujo de GitHub Pages', () => {
  assert.ok(mitad2.includes('.github/workflows/pages.yml'));
  assert.ok(!mitad1.includes('.github/workflows/pages.yml'));
});

test('la guia y los scripts de subida no entran en ninguna mitad', () => {
  const herramientas = archivosDelRepo.filter((ruta) => ruta === 'guiasubir.md' || ruta.startsWith('scripts/'));
  assert.ok(herramientas.includes('guiasubir.md'));
  assert.ok(herramientas.includes('scripts/subir/subir-mitad.mjs'));
  for (const ruta of herramientas) {
    assert.ok(EXCLUIDOS.some((patron) => coincide(patron, ruta)), `${ruta} no esta excluido`);
    assert.ok(!mitad1.includes(ruta) && !mitad2.includes(ruta), `${ruta} esta en una mitad`);
  }
});

for (const [n, mitad] of [
  [1, mitad1],
  [2, mitad2],
]) {
  test(`los commits de la mitad ${n} cubren sus archivos sin repetir ni dejar grupos vacios`, () => {
    const commits = agruparPorCommits(n, mitad);
    const agrupados = commits.flatMap((commit) => commit.archivos);
    assert.equal(new Set(agrupados).size, agrupados.length, 'hay archivos repetidos');
    assert.deepEqual([...agrupados].sort(), [...mitad].sort());
    for (const commit of commits) assert.ok(commit.archivos.length > 0, `grupo vacio: ${commit.mensaje}`);
  });
}

test('agruparPorCommits respeta el orden de los grupos y las exclusiones', () => {
  const commits = agruparPorCommits(1, ['src/estilos/paginas/a.less', 'src/main.js', 'src/estilos/base/b.less']);
  assert.deepEqual(
    commits.map((commit) => commit.archivos),
    [['src/estilos/base/b.less'], ['src/estilos/paginas/a.less'], ['src/main.js']],
  );
  assert.throws(() => agruparPorCommits(1, ['otro/archivo.txt']), /otro\/archivo\.txt/);
});

test('los mensajes de commit no mencionan el reparto ni el origen', () => {
  const prohibido = /clon|copia|copy|clone|mitad|pc ?[12]|betan|arvillax/i;
  for (const { mensaje } of [...GRUPOS_MITAD_1, ...GRUPOS_MITAD_2]) {
    assert.doesNotMatch(mensaje, prohibido);
  }
});

test('quitarBloqueSubir quita el bloque marcado y deja el resto igual', () => {
  const texto = 'uno\n\n<!-- subir:inicio -->\n## Subir\n\nver guia\n<!-- subir:fin -->\n\n## Dos\n';
  assert.equal(quitarBloqueSubir(texto), 'uno\n\n## Dos\n');
  assert.equal(quitarBloqueSubir('uno\n\n<!-- subir:inicio -->\nx\n<!-- subir:fin -->\n'), 'uno\n');
  assert.equal(quitarBloqueSubir('sin marcas\n'), 'sin marcas\n');
});

test('quitarBloqueSubir deja el README sin la guia de subida', () => {
  const readme = fs.readFileSync(path.join(raizRepo, 'README.md'), 'utf8');
  assert.match(readme, /<!-- subir:inicio -->/);
  const filtrado = quitarBloqueSubir(readme);
  assert.doesNotMatch(filtrado, /guiasubir|subir:inicio|subir:fin|scripts\/subir/);
  assert.doesNotMatch(filtrado, /\n\n\n/);
  assert.match(filtrado, /## Diapositivas/);
});

test('el patron con /** no coincide con un prefijo parcial', () => {
  assert.equal(coincide('src/vistas/**', 'src/vistas/a.hbs'), true);
  assert.equal(coincide('src/vistas/**', 'src/vistasx/a.hbs'), false);
  assert.equal(coincide('package.json', 'package.json'), true);
  assert.equal(coincide('package.json', 'otro/package.json'), false);
});

test('validarUrlRepo acepta URLs de GitHub', () => {
  for (const url of [
    'https://github.com/Juan/mi-landing',
    'https://github.com/Juan/mi-landing.git',
    'https://github.com/Juan/mi-landing/',
    'git@github.com:Juan/mi-landing.git',
  ]) {
    assert.deepEqual(validarUrlRepo(url), { valida: true, dueno: 'Juan', repo: 'mi-landing' }, url);
  }
});

test('validarUrlRepo rechaza lo que no es un repo de GitHub', () => {
  for (const url of [
    'https://gitlab.com/a/b',
    'github.com/a',
    'javascript:alert(1)',
    'https://github.com/a/b;rm -rf',
    'file:///x',
    '',
    undefined,
  ]) {
    assert.equal(validarUrlRepo(url).valida, false, String(url));
  }
});

test('validarUrlRepo acepta rutas locales solo con permitirLocal', () => {
  assert.deepEqual(validarUrlRepo('file:///x', { permitirLocal: true }), { valida: true, dueno: null, repo: null });
  assert.equal(validarUrlRepo('/tmp/destino.git').valida, false);
  assert.equal(validarUrlRepo('/tmp/destino.git', { permitirLocal: true }).valida, true);
  assert.equal(validarUrlRepo('C:\\ensayo\\destino.git', { permitirLocal: true }).valida, true);
});
