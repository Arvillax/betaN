import { test } from 'node:test';
import assert from 'node:assert/strict';
import { similitudDesdeDistancia, puntuarSitio, veredictoPara } from './puntaje.js';

test('una variable idéntica da similitud 1', () => {
  assert.equal(similitudDesdeDistancia(0), 1);
});

test('la similitud baja a medida que crece la distancia', () => {
  assert.ok(similitudDesdeDistancia(0.5) > similitudDesdeDistancia(1));
  assert.ok(similitudDesdeDistancia(3) < 0.02);
});

test('umbrales del veredicto', () => {
  assert.equal(veredictoPara(0.9), 'coincide');
  assert.equal(veredictoPara(0.5), 'parcial');
  assert.equal(veredictoPara(0.1), 'difiere');
});

test('los pesos se normalizan y el puntaje usa la distancia con pesos', () => {
  const resultado = puntuarSitio({ a: 1, b: 1 }, { a: 10, b: 30 });
  // D² = 0.25·1 + 0.75·1 = 1 → S = e^(-1/2)
  assert.ok(Math.abs(resultado.puntaje - Math.exp(-0.5)) < 1e-9);
  assert.equal(resultado.desglose.find((v) => v.id === 'a').peso, 0.25);
});

test('el dato faltante se omite y su peso se reparte (Gower)', () => {
  const resultado = puntuarSitio({ a: 0, b: null }, { a: 50, b: 50 });
  assert.equal(resultado.puntaje, 1);
  assert.equal(resultado.usadas, 1);
  assert.equal(resultado.total, 2);
  const faltante = resultado.desglose.find((v) => v.id === 'b');
  assert.equal(faltante.similitud, null);
  assert.equal(faltante.veredicto, 'sin-dato');
});

test('las variables con peso cero no cuentan', () => {
  const resultado = puntuarSitio({ a: 0, b: 5 }, { a: 1, b: 0 });
  assert.equal(resultado.puntaje, 1);
  assert.equal(resultado.total, 1);
});

test('sin variables utilizables el puntaje es null', () => {
  assert.equal(puntuarSitio({ a: null }, { a: 1 }).puntaje, null);
  assert.equal(puntuarSitio({ a: 1 }, { a: 0 }).puntaje, null);
});
