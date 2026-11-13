import { test } from 'node:test';
import assert from 'node:assert/strict';
import { construirContexto, construirDemo } from './contexto.js';
import { sitiosObjetivo } from './sitios.js';

const ORDEN = ['inicio', 'reto', 'sitios', 'metodo', 'datos', 'alcance', 'equipo', 'cierre'];
const contar = (cuerpo) => sitiosObjetivo.filter((s) => s.cuerpo === cuerpo).length;

for (const codigo of ['es', 'en']) {
  test(`${codigo}: las diapositivas van en el orden del relato`, () => {
    assert.deepEqual(
      construirContexto(codigo).diapositivas.map((d) => d.id),
      ORDEN,
    );
  });

  test(`${codigo}: la cifra de sitios objetivo sale de sitios.js (9 de la Luna + 12 de Marte)`, () => {
    const cifra = construirContexto(codigo).alcance.cifras.find((c) => c.id === 'sitios');
    assert.equal(contar('luna'), 9);
    assert.equal(contar('marte'), 12);
    assert.equal(cifra.valor, 21);
    assert.equal(cifra.valor, contar('luna') + contar('marte'));
  });

  test(`${codigo}: la diapositiva de sitios separa la Luna de Marte`, () => {
    const { luna, marte } = construirContexto(codigo).sitios;
    assert.equal(luna.length, 9);
    assert.equal(marte.length, 12);
    assert.equal(luna[0].id, 'SL-01');
    assert.equal(marte.at(-1).id, 'SL-21');
  });

  test(`${codigo}: sin URL de la demo, el botón queda pendiente`, () => {
    assert.equal(construirContexto(codigo).demo.disponible, false);
  });
}

test('las cifras se agrupan según el idioma', () => {
  const celdas = (codigo) => construirContexto(codigo).alcance.cifras.find((c) => c.id === 'celdas').texto;
  assert.equal(celdas('en'), '58,700,374');
  assert.equal(celdas('es'), new Intl.NumberFormat('es').format(58700374));
});

test('construirDemo: con URL hay enlace, sin URL queda pendiente', () => {
  const textos = { probar: 'Probar', pendiente: 'Pendiente', pendienteCorto: 'Corto' };
  assert.deepEqual(construirDemo('', textos), { disponible: false, url: '', ...textos });
  assert.deepEqual(construirDemo('  ', textos).disponible, false);
  assert.deepEqual(construirDemo('https://ejemplo.org/demo', textos), {
    disponible: true,
    url: 'https://ejemplo.org/demo',
    ...textos,
  });
});

test('ningún conjunto de datos queda sin cuerpo, nombre ni marca de verificación', () => {
  const { cuerpos } = construirContexto('es').datos;
  assert.deepEqual(
    cuerpos.map((c) => c.id),
    ['tierra', 'luna', 'marte'],
  );
  for (const cuerpo of cuerpos) {
    assert.ok(cuerpo.conjuntos.length > 0);
    for (const conjunto of cuerpo.conjuntos) {
      assert.ok(conjunto.nombre && conjunto.licencia && conjunto.version);
      assert.equal(typeof conjunto.verificada, 'boolean');
    }
  }
});
