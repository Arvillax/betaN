import { test } from 'node:test';
import assert from 'node:assert/strict';
import { construirContexto, construirDemo } from './contexto.js';
import { sitiosObjetivo } from './sitios.js';

const ORDEN = ['inicio', 'reto', 'sitios', 'metodo', 'datos', 'alcance', 'equipo', 'cierre'];
const contar = (cuerpo) => sitiosObjetivo.filter((s) => s.cuerpo === cuerpo).length;
const PRUEBA_DEMO = '2026-11-15T17:00:00-06:00';
const AVISO = {
  es: { antetitulo: 'Fecha de prueba de la demo', fecha: '15/11/2026', conector: 'a las', hora: '17:00', zona: 'UTC−6' },
  en: { antetitulo: 'Demo test date', fecha: 'Nov 15, 2026', conector: 'at', hora: '17:00', zona: 'UTC−6' },
};

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

  test(`${codigo}: sin URL de la demo, el botón invita a probarla y avisa la fecha de prueba`, () => {
    const { demo } = construirContexto(codigo);
    assert.deepEqual(Object.keys(demo).sort(), ['disponible', 'probar', 'probarCorto', 'prueba', 'url']);
    assert.equal(demo.disponible, false);
    assert.equal(demo.url, '');
    assert.deepEqual(demo.prueba, { iso: PRUEBA_DEMO, ...AVISO[codigo] });
  });
}

test('las cifras se agrupan según el idioma', () => {
  const celdas = (codigo) => construirContexto(codigo).alcance.cifras.find((c) => c.id === 'celdas').texto;
  assert.equal(celdas('en'), '58,700,374');
  assert.equal(celdas('es'), new Intl.NumberFormat('es').format(58700374));
});

test('construirDemo: con URL hay enlace, sin URL no; pasan las etiquetas de probar y el aviso con su fecha', () => {
  const aviso = { antetitulo: 'Fecha', fecha: '1/1/2030', conector: 'a las', hora: '09:00', zona: 'UTC' };
  const textos = { probar: 'Ir a probar', probarCorto: 'Probar', aviso, sobrante: 'no pasa' };
  const prueba = { iso: '2030-01-01T09:00:00Z', ...aviso };
  assert.deepEqual(construirDemo('', textos, '2030-01-01T09:00:00Z'), {
    disponible: false,
    url: '',
    probar: 'Ir a probar',
    probarCorto: 'Probar',
    prueba,
  });
  assert.equal(construirDemo('  ', textos, '').disponible, false);
  assert.deepEqual(construirDemo('https://ejemplo.org/demo', textos, '2030-01-01T09:00:00Z'), {
    disponible: true,
    url: 'https://ejemplo.org/demo',
    probar: 'Ir a probar',
    probarCorto: 'Probar',
    prueba,
  });
});

test('las etiquetas de la demo y el aviso de la fecha de prueba son los acordados en los dos idiomas', () => {
  assert.deepEqual(construirContexto('es').demo, {
    disponible: false,
    url: '',
    probar: 'Ir a probar la demo',
    probarCorto: 'Probar demo',
    prueba: { iso: PRUEBA_DEMO, ...AVISO.es },
  });
  assert.deepEqual(construirContexto('en').demo, {
    disponible: false,
    url: '',
    probar: 'Try the demo',
    probarCorto: 'Try demo',
    prueba: { iso: PRUEBA_DEMO, ...AVISO.en },
  });
});

test('las rutas de idioma respetan la base de publicación', () => {
  assert.equal(construirContexto('es').idioma.otro.ruta, '/en/');
  assert.equal(construirContexto('es', '/betaN/').idioma.otro.ruta, '/betaN/en/');
  assert.equal(construirContexto('en', '/betaN/').idioma.otro.ruta, '/betaN/');
  assert.equal(construirContexto('en', '/betaN/').base, '/betaN/');
});

for (const codigo of ['es', 'en']) {
  test(`${codigo}: los 11 recursos del reto van por agencia y cada uno tiene nombre y descripción`, () => {
    const { agencias } = construirContexto(codigo).datos;
    assert.deepEqual(
      agencias.map((a) => [a.id, a.recursos.length]),
      [
        ['nasa', 5],
        ['csa', 3],
        ['esa', 2],
        ['jaxa', 1],
      ],
    );
    for (const recurso of agencias.flatMap((a) => a.recursos)) {
      assert.ok(recurso.nombre && recurso.descripcion, recurso.id);
    }
  });
}

for (const codigo of ['es', 'en']) {
  test(`${codigo}: el equipo tiene 6 integrantes con nombre y correo, y solo uno sin LinkedIn`, () => {
    const { integrantes } = construirContexto(codigo).equipo;
    assert.equal(integrantes.length, 6);
    for (const integrante of integrantes) {
      assert.ok(integrante.nombre, integrante.id);
      assert.ok(integrante.correo, integrante.id);
    }
    assert.equal(integrantes.filter((i) => i.linkedin !== '').length, 5);
    assert.equal(integrantes.find((i) => i.id === 'david').linkedin, '');
  });

  test(`${codigo}: el correo del equipo es admin@j4kssolutions.com`, () => {
    assert.equal(construirContexto(codigo).equipo.textos.correo, 'admin@j4kssolutions.com');
  });

  test(`${codigo}: los integrantes van de Armando a Guillermo`, () => {
    const { integrantes } = construirContexto(codigo).equipo;
    assert.equal(integrantes[0].id, 'armando');
    assert.equal(integrantes.at(-1).id, 'guillermo');
  });
}
