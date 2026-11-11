/**
 * Copy for the opening slides. Source: official challenge statement, as summarized in
 * analogos-space-apps-2026/contexto/10-reto/dimensiones-innegociables.md (2026-11-05).
 */

export const hero = {
  eyebrow: 'NASA Space Apps 2026 · Tegucigalpa',
  titleLines: ['La Tierra ya ensayó', 'la Luna y Marte.'],
  accent: 'Falta encontrar dónde.',
  lead:
    'Un buscador que recorre la Tierra entera y la compara con un sitio de la Luna o de Marte, variable por variable. Para cada lugar dice qué se parece, cuánto, qué no y para qué sirve.',
  cta: 'Ver el reto',
  hint: 'Mueve el cursor: es una sonda sobre el relieve.',
};

export const challenge = {
  eyebrow: 'El reto',
  title: 'Tres preguntas para cada análogo',
  lead: 'Un análogo no tiene que coincidir en todo. Tiene que decir con claridad en qué sí y en qué no.',
  questions: [
    {
      key: 'coincide',
      title: 'Qué coincide',
      body: 'Las características o procesos físicos que hacen sólida la analogía.',
    },
    {
      key: 'falla',
      title: 'Dónde falla',
      body: 'Gravedad, atmósfera, presión y escala: lo que la Tierra no puede reproducir.',
    },
    {
      key: 'sirve',
      title: 'Para qué sirve',
      body: 'Cómo estudiar ese lugar ayuda a preparar la exploración de la Luna o de Marte.',
    },
  ],
};

export const notThis = {
  eyebrow: 'Fuera del alcance',
  title: 'No buscamos lo que ya se conoce',
  lead:
    'El reto pide salir de los análogos ya estudiados y de los lugares que solo se ven parecidos. La analogía se mide con procesos físicos, no con fotos.',
  known: ['Antártida', 'Atacama', 'Islandia', 'Hawái', 'Haughton', 'Death Valley', 'Mojave'],
  closing: 'Lo que buscamos está en la parte de la Tierra que casi nadie revisó.',
};

export const method = {
  eyebrow: 'El método',
  title: 'Muchas variables a la vez, no una foto',
  lead: 'Cada lugar de la Tierra se compara con el destino usando de 1 a k variables físicas. Sumar variables no cambia la fórmula.',
  steps: [
    { title: 'Elegir el destino', body: 'Un sitio de base lunar permanente o de exploración en Marte.' },
    { title: 'Elegir el uso', body: 'Rover, hábitat o agua: el uso decide cuánto pesa cada variable.' },
    { title: 'Comparar la Tierra entera', body: 'Cada celda se mide contra el destino, con filtros para lo que no se negocia.' },
    { title: 'Explicar el resultado', body: 'Una nota de 0 a 1 con su desglose: qué coincide, cuánto y qué difiere.' },
  ],
  layers: ['Pendiente', 'Rugosidad', 'Relieve relativo', 'Emisividad', 'Permafrost', 'Viento', '+ k'],
  source: 'Fórmula: ADR-006 · Variables: ADR-008',
};
