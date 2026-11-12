/**
 * Demo del comparador: destino + pesos → puntaje de parecido y desglose.
 * La matemática vive en puntaje.js; este módulo solo lee los controles y escribe el resultado.
 */
import { puntuarSitio } from './puntaje.js';
import { buscar, buscarTodos, formatearNumero } from '../../utilidades/dom.js';
import { emitir, escuchar, EVENTOS } from '../../utilidades/eventos.js';

/**
 * @param {HTMLElement} raiz `[data-comparador]`
 * @param {{ variables: {id:string,etiqueta:string}[], destinos: any[], perfiles: any[], textos: Record<string, any> }} datos
 *   `textos` trae las cadenas del idioma de la página, incluida `usadas(usadas, total)`.
 */
export function crearComparador(raiz, datos) {
  const formulario = buscar('[data-formulario-comparador]', raiz);
  const deslizadores = buscarTodos('input[data-variable]', raiz);
  const botonesPerfil = buscarTodos('[data-perfil]', raiz);
  const etiquetaDe = Object.fromEntries(datos.variables.map((v) => [v.id, v.etiqueta]));
  const idDiapositiva = raiz.closest('[data-diapositiva]')?.id;
  const { textos } = datos;

  const salida = {
    sitio: buscar('[data-sitio]', raiz),
    puntaje: buscar('[data-puntaje]', raiz),
    usadas: buscar('[data-usadas]', raiz),
    listas: {
      coincide: buscar('[data-lista="coincide"]', raiz),
      difiere: buscar('[data-lista="difiere"]', raiz),
      tierraNoPuede: buscar('[data-lista="tierra-no-puede"]', raiz),
    },
  };

  const destino = () => {
    const id = /** @type {HTMLInputElement} */ (buscar('input[name="destino"]:checked', raiz)).value;
    return datos.destinos.find((d) => d.id === id) ?? datos.destinos[0];
  };

  const leerPesos = () => Object.fromEntries(deslizadores.map((d) => [d.dataset.variable, Number(d.value)]));

  function llenarLista(lista, elementos) {
    lista.replaceChildren(
      ...(elementos.length ? elementos : [textos.vacio]).map((texto) => {
        const li = document.createElement('li');
        li.textContent = texto;
        return li;
      }),
    );
  }

  function pintar() {
    const objetivo = destino();
    const resultado = puntuarSitio(objetivo.diferencias, leerPesos());

    salida.sitio.textContent = objetivo.sitio;
    salida.puntaje.textContent = resultado.puntaje === null ? textos.vacio : formatearNumero(resultado.puntaje);
    salida.usadas.textContent = resultado.total
      ? textos.usadas(resultado.usadas, resultado.total)
      : textos.sinPeso;

    resultado.desglose.forEach(({ id, similitud, veredicto, peso }) => {
      const fila = buscar(`[data-barra="${id}"]`, raiz);
      fila.dataset.veredicto = veredicto;
      fila.classList.toggle('esta-atenuada', peso === 0);
      fila.style.setProperty('--valor', String(similitud ?? 0));
      buscar('[data-barra-valor]', fila).textContent = similitud === null ? textos.sinDato : formatearNumero(similitud);
    });

    const contadas = resultado.desglose.filter((v) => v.peso > 0);
    llenarLista(salida.listas.coincide, contadas.filter((v) => v.veredicto === 'coincide').map((v) => etiquetaDe[v.id]));
    llenarLista(salida.listas.difiere, contadas.filter((v) => v.veredicto === 'difiere').map((v) => etiquetaDe[v.id]));
    llenarLista(salida.listas.tierraNoPuede, objetivo.tierraNoPuede);
  }

  function marcarPerfilActivo(id) {
    botonesPerfil.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.perfil === id)));
  }

  function aplicarPerfil(id) {
    const perfil = datos.perfiles.find((p) => p.id === id);
    if (!perfil) return;
    deslizadores.forEach((deslizador) => {
      deslizador.value = String(perfil.pesos[deslizador.dataset.variable] ?? 0);
      sincronizarSalidaDeslizador(deslizador);
    });
    marcarPerfilActivo(id);
    pintar();
  }

  function sincronizarSalidaDeslizador(deslizador) {
    const salidaPeso = buscar(`[data-salida-peso="${deslizador.dataset.variable}"]`, raiz);
    if (salidaPeso) salidaPeso.textContent = deslizador.value;
    deslizador.style.setProperty('--relleno', `${deslizador.value}%`);
  }

  const pedirMundo = () => emitir(EVENTOS.PEDIDO_MUNDO, { mundo: destino().mundo });

  formulario.addEventListener('submit', (evento) => evento.preventDefault());
  formulario.addEventListener('input', (evento) => {
    const objetivo = /** @type {HTMLInputElement} */ (evento.target);
    if (objetivo.matches('input[data-variable]')) {
      sincronizarSalidaDeslizador(objetivo);
      marcarPerfilActivo(null); // los pesos manuales ya no coinciden con un perfil
    }
    if (objetivo.name === 'destino') pedirMundo();
    pintar();
  });
  botonesPerfil.forEach((boton) => boton.addEventListener('click', () => aplicarPerfil(boton.dataset.perfil)));

  // Al entrar a esta diapositiva se muestra el terreno del destino elegido, no el de la diapositiva.
  const cancelar = escuchar(EVENTOS.CAMBIO_DIAPOSITIVA, ({ id }) => {
    if (id === idDiapositiva) pedirMundo();
  });

  deslizadores.forEach(sincronizarSalidaDeslizador);
  pintar();

  return { destruir: cancelar };
}
