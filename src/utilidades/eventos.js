/**
 * Eventos de toda la aplicación. Los módulos nunca se importan entre sí; se comunican con estos.
 * Cada evento lleva sus datos en `event.detail`.
 */
export const EVENTOS = Object.freeze({
  /** detail: { indice: number, id: string, mundo: string, tono: string } */
  CAMBIO_DIAPOSITIVA: 'presentacion:cambio',
  /** detail: { mundo: string } — un módulo pide al terreno que muestre un mundo por un tiempo */
  PEDIDO_MUNDO: 'mundo:pedido',
});

export function emitir(nombre, detalle) {
  document.dispatchEvent(new CustomEvent(nombre, { detail: detalle }));
}

/** @returns {() => void} cancela la suscripción */
export function escuchar(nombre, manejador) {
  const oyente = (evento) => manejador(evento.detail);
  document.addEventListener(nombre, oyente);
  return () => document.removeEventListener(nombre, oyente);
}
