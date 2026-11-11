/**
 * Puntaje de parecido simplificado de ADR-006: distancia con pesos sin el término de correlación,
 * regla de Gower para datos faltantes y una campana que convierte la distancia en un puntaje de 0..1.
 * Funciones puras: sin DOM, se pueden probar con `node --test`.
 */

/** @typedef {'coincide'|'parcial'|'difiere'|'sin-dato'} Veredicto */

const UMBRAL_COINCIDE = 0.75;
const UMBRAL_PARCIAL = 0.4;

/** Campana: distancia 0 → 1; al crecer → 0. */
export function similitudDesdeDistancia(distancia) {
  return Math.exp(-(distancia * distancia) / 2);
}

/** @returns {Veredicto} */
export function veredictoPara(similitud) {
  if (similitud >= UMBRAL_COINCIDE) return 'coincide';
  if (similitud >= UMBRAL_PARCIAL) return 'parcial';
  return 'difiere';
}

/**
 * @param {Record<string, number|null>} diferencias distancia normalizada por variable; null = sin dato
 * @param {Record<string, number>} pesos pesos crudos por variable (cualquier escala)
 */
export function puntuarSitio(diferencias, pesos) {
  const conPeso = Object.keys(diferencias).filter((id) => (pesos[id] ?? 0) > 0);
  const disponibles = conPeso.filter((id) => diferencias[id] !== null);
  const sumaPesos = disponibles.reduce((suma, id) => suma + pesos[id], 0);

  const desglose = Object.keys(diferencias).map((id) => {
    const diferencia = diferencias[id];
    const tienePeso = (pesos[id] ?? 0) > 0;
    if (diferencia === null) {
      return { id, peso: 0, similitud: null, veredicto: /** @type {Veredicto} */ ('sin-dato') };
    }
    const similitud = similitudDesdeDistancia(diferencia);
    const peso = tienePeso && sumaPesos > 0 ? pesos[id] / sumaPesos : 0;
    return { id, peso, similitud, veredicto: veredictoPara(similitud) };
  });

  if (sumaPesos === 0) {
    return { puntaje: null, usadas: disponibles.length, total: conPeso.length, desglose };
  }

  const distanciaCuadrada = desglose.reduce(
    (suma, v) => (v.similitud === null ? suma : suma + v.peso * diferencias[v.id] ** 2),
    0,
  );

  return {
    puntaje: Math.exp(-distanciaCuadrada / 2),
    usadas: disponibles.length,
    total: conPeso.length,
    desglose,
  };
}
