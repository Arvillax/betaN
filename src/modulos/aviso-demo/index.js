/**
 * Aviso de la demo: mientras no hay URL, el botón de la demo abre un aviso con la fecha de prueba.
 * El clic alterna; Escape cierra y devuelve el foco al botón; un clic fuera cierra. Solo queda uno abierto.
 * Con URL el botón es un enlace sin `aria-controls` y aquí no se vincula nada.
 */
import { buscarTodos } from '../../utilidades/dom.js';

export function vincularAvisoDemo(raiz = document) {
  const pares = buscarTodos('button[data-boton-demo][aria-controls]', raiz)
    .map((boton) => ({ boton, aviso: document.getElementById(boton.getAttribute('aria-controls')) }))
    .filter(({ aviso }) => aviso);
  if (pares.length === 0) return;

  const fijar = (par, abierto) => {
    par.boton.setAttribute('aria-expanded', String(abierto));
    par.aviso.hidden = !abierto;
    if (abierto) orientar(par);
  };
  // Se abre hacia abajo; si no cabe en la pantalla y arriba sí hay lugar, se abre hacia arriba.
  const orientar = ({ boton, aviso }) => {
    aviso.classList.remove('aviso-demo--arriba');
    const { bottom, height } = aviso.getBoundingClientRect();
    const espacioArriba = boton.getBoundingClientRect().top;
    aviso.classList.toggle('aviso-demo--arriba', bottom > innerHeight && espacioArriba > height + 16);
  };
  const abierto = () => pares.find(({ aviso }) => !aviso.hidden);

  pares.forEach((par) => {
    par.boton.addEventListener('click', () => {
      const abrir = par.aviso.hidden;
      pares.forEach((otro) => otro !== par && fijar(otro, false));
      fijar(par, abrir);
    });
  });

  document.addEventListener('keydown', (evento) => {
    const par = evento.key === 'Escape' && abierto();
    if (!par) return;
    fijar(par, false);
    par.boton.focus();
  });

  document.addEventListener('click', (evento) => {
    const par = abierto();
    const destino = /** @type {Node} */ (evento.target);
    if (par && !par.boton.contains(destino) && !par.aviso.contains(destino)) fijar(par, false);
  });
}
