/**
 * Textos de las diapositivas de apertura. Fuente: enunciado oficial del reto, tal como lo resume
 * analogos-space-apps-2026/contexto/10-reto/dimensiones-innegociables.md (2026-11-05).
 */

export const portada = {
  antetitulo: 'NASA Space Apps 2026 · Tegucigalpa',
  lineasTitulo: ['La Tierra ya ensayó', 'la Luna y Marte.'],
  acento: 'Falta encontrar dónde.',
  entradilla:
    'Un buscador que recorre la Tierra entera y la compara con un sitio de la Luna o de Marte, variable por variable. Para cada lugar dice qué se parece, cuánto, qué no y para qué sirve.',
  accion: 'Ver el reto',
  pista: 'Mueve el cursor: es una sonda sobre el relieve.',
};

export const reto = {
  antetitulo: 'El reto',
  titulo: 'Tres preguntas para cada análogo',
  entradilla: 'Un análogo no tiene que coincidir en todo. Tiene que decir con claridad en qué sí y en qué no.',
  preguntas: [
    {
      clave: 'coincide',
      titulo: 'Qué coincide',
      cuerpo: 'Las características o procesos físicos que hacen sólida la analogía.',
    },
    {
      clave: 'falla',
      titulo: 'Dónde falla',
      cuerpo: 'Gravedad, atmósfera, presión y escala: lo que la Tierra no puede reproducir.',
    },
    {
      clave: 'sirve',
      titulo: 'Para qué sirve',
      cuerpo: 'Cómo estudiar ese lugar ayuda a preparar la exploración de la Luna o de Marte.',
    },
  ],
};

export const loQueNo = {
  antetitulo: 'Fuera del alcance',
  titulo: 'No buscamos lo que ya se conoce',
  entradilla:
    'El reto pide salir de los análogos ya estudiados y de los lugares que solo se ven parecidos. La analogía se mide con procesos físicos, no con fotos.',
  conocidos: ['Antártida', 'Atacama', 'Islandia', 'Hawái', 'Haughton', 'Death Valley', 'Mojave'],
  cierre: 'Lo que buscamos está en la parte de la Tierra que casi nadie revisó.',
};

export const metodo = {
  antetitulo: 'El método',
  titulo: 'Muchas variables a la vez, no una foto',
  entradilla: 'Cada lugar de la Tierra se compara con el destino usando de 1 a k variables físicas. Sumar variables no cambia la fórmula.',
  pasos: [
    { titulo: 'Elegir el destino', cuerpo: 'Un sitio de base lunar permanente o de exploración en Marte.' },
    { titulo: 'Elegir el uso', cuerpo: 'Rover, hábitat o agua: el uso decide cuánto pesa cada variable.' },
    { titulo: 'Comparar la Tierra entera', cuerpo: 'Cada celda se mide contra el destino, con filtros para lo que no se negocia.' },
    { titulo: 'Explicar el resultado', cuerpo: 'Una nota de 0 a 1 con su desglose: qué coincide, cuánto y qué difiere.' },
  ],
  capas: ['Pendiente', 'Rugosidad', 'Relieve relativo', 'Emisividad', 'Permafrost', 'Viento', '+ k'],
  fuente: 'Fórmula: ADR-006 · Variables: ADR-008',
};
