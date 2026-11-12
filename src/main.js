/**
 * Raíz de composición: crea cada módulo y los conecta con eventos.
 * Los módulos nunca se importan entre sí; este es el único archivo que los conoce a todos.
 */
import './estilos/principal.less';

import { variables, destinos, perfiles } from './contenido/comparador.ejemplo.js';
import es from './contenido/es/index.js';
import en from './contenido/en/index.js';
import { buscar } from './utilidades/dom.js';
import { escuchar, EVENTOS } from './utilidades/eventos.js';
import { prefiereMovimientoReducido, alCambiarMovimientoReducido } from './utilidades/movimiento.js';
import { seguirPuntero } from './utilidades/puntero.js';
import { crearTerreno } from './modulos/terreno/renderizador-terreno.js';
import { usarFondoEstatico } from './modulos/terreno/respaldo.js';
import { crearSonda } from './modulos/sonda/sonda.js';
import { crearPresentacion } from './modulos/presentacion/presentacion.js';
import { vincularTeclado } from './modulos/presentacion/teclado.js';
import { crearProgreso } from './modulos/presentacion/progreso.js';
import { crearComparador } from './modulos/comparador/comparador.js';
import { vincularCambioIdioma } from './modulos/idioma/idioma.js';

// Cada página se genera en un idioma; el atributo lang dice cuál.
const textos = document.documentElement.lang === 'en' ? en : es;
vincularCambioIdioma();

// Fondo
const lienzo = /** @type {HTMLCanvasElement} */ (buscar('[data-terreno]'));
const terreno = crearTerreno(lienzo, {
  movimientoReducido: prefiereMovimientoReducido(),
  alFallar: () => usarFondoEstatico(lienzo),
});
if (!terreno) usarFondoEstatico(lienzo);
alCambiarMovimientoReducido((reducido) => terreno?.fijarMovimientoReducido(reducido));

// Sonda
const sonda = crearSonda(/** @type {HTMLElement} */ (buscar('[data-sonda]')), {
  etiquetasMundo: textos.mundos,
  puntos: textos.interfaz.sonda.puntos,
});
seguirPuntero((puntero) => {
  terreno?.fijarPuntero(puntero);
  sonda.actualizar(puntero);
});

// Marco de la página y cambios de mundo. Se suscribe antes de que arranque la presentación para reflejar la primera diapositiva.
let progreso;
function mostrarMundo(mundo) {
  terreno?.fijarMundo(mundo);
  sonda.fijarMundo(mundo);
  progreso?.mostrarMundo(mundo);
}
escuchar(EVENTOS.PEDIDO_MUNDO, ({ mundo }) => mostrarMundo(mundo));

const raizPresentacion = /** @type {HTMLElement} */ (buscar('[data-presentacion]'));
escuchar(EVENTOS.CAMBIO_DIAPOSITIVA, (diapositiva) => {
  progreso?.mostrarDiapositiva(diapositiva);
  mostrarMundo(diapositiva.mundo);
});

// El comparador se suscribe después del manejador de mundo, así su pedido de mundo gana en su diapositiva.
const raizComparador = buscar('[data-comparador]');
if (raizComparador) {
  crearComparador(/** @type {HTMLElement} */ (raizComparador), {
    variables: variables.map((v) => ({ ...v, etiqueta: textos.comparador.variables[v.id] })),
    destinos: destinos.map((d) => ({ ...d, ...textos.comparador.destinos[d.id] })),
    perfiles,
    textos: textos.comparador.textos,
  });
}

// La presentación necesita el marco listo; el marco necesita la presentación para navegar.
const presentacion = crearPresentacion(raizPresentacion);
progreso = crearProgreso(presentacion);
const primera = raizPresentacion.querySelectorAll('[data-diapositiva]')[presentacion.indice];
progreso.mostrarDiapositiva({ indice: presentacion.indice, id: primera.id, tono: primera.dataset.tono });
progreso.mostrarMundo(primera.dataset.mundo);
vincularTeclado(presentacion);

document.documentElement.classList.add('esta-listo');
