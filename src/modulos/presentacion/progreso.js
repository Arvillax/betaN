/**
 * Refleja la diapositiva activa en el marco de la página: riel lateral, contador del encabezado,
 * indicador de mundo y el tono de la página (claro/oscuro) del que dependen los colores del encabezado.
 */
import { buscarTodos, buscar } from '../../utilidades/dom.js';

/** @param {{ irA(i: number): void }} presentacion */
export function crearProgreso(presentacion) {
  const enlaces = buscarTodos('[data-ir-a]');
  const etiquetasMundo = buscarTodos('[data-etiqueta-mundo]');
  const contador = buscar('[data-diapositiva-actual]');

  enlaces.forEach((enlace) =>
    enlace.addEventListener('click', (evento) => {
      evento.preventDefault();
      presentacion.irA(Number(enlace.dataset.irA));
    }),
  );

  return {
    /** @param {{ indice: number, id: string, tono: string }} diapositiva */
    mostrarDiapositiva({ indice, id, tono }) {
      enlaces.forEach((enlace, i) => {
        if (i === indice) enlace.setAttribute('aria-current', 'step');
        else enlace.removeAttribute('aria-current');
      });
      if (contador) contador.textContent = String(indice + 1).padStart(2, '0');
      document.documentElement.dataset.tono = tono;
      history.replaceState(null, '', `#${id}`);
    },
    /** El mundo puede ser distinto al de la diapositiva (el comparador puede pedir uno). */
    mostrarMundo(mundo) {
      document.documentElement.dataset.mundo = mundo;
      etiquetasMundo.forEach((etiqueta) => etiqueta.classList.toggle('es-actual', etiqueta.dataset.etiquetaMundo === mundo));
    },
  };
}
