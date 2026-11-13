/** Textos de la portada, el reto y el método. */

// Fuente: analogos-space-apps-2026/README.md:5-6
export const inicio = {
  antetitulo: 'NASA Space Apps 2026 · Tegucigalpa',
  lineasTitulo: ['La Tierra ya ensayó', 'la Luna y Marte.'],
  acento: 'Falta encontrar dónde.',
  entradilla:
    'Buscamos lugares de la Tierra que se parezcan, por procesos físicos y no por su aspecto, a los sitios de bases permanentes en la Luna y a Marte. Y explicamos en qué coinciden y en qué difieren.',
  accion: 'Ver el reto',
  pista: 'Mueve el cursor: es una sonda sobre el relieve.',
};

// Fuente: analogos-space-apps-2026/contexto/10-reto/dimensiones-innegociables.md:24-30 y contexto/INDEX-sitios.md
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
  tituloNoBuscamos: 'Lo que no buscamos',
  entradillaNoBuscamos: 'El reto pide no redescubrir los análogos conocidos ni lugares que solo se vean parecidos.',
  conocidos: ['Antártida', 'Atacama', 'Islandia', 'Hawái', 'Haughton', 'Death Valley', 'Mojave'],
  etiquetaLista: 'Análogos ya conocidos, fuera del alcance',
  control:
    'Los 43 análogos ya documentados (ST-01 a ST-43) no son la respuesta: sirven de control para comprobar que el método los encuentra.',
};

// Fuente: contexto/70-bitacora/2026-11/2026-11-11-fernando-etl-de-ensayo-y-vectores-objetivo.md, ADR-002, ADR-006,
// ADR-008, ADR-010, ADR-011, ADR-013 y motor/LEEME.md (repo analogos-space-apps-2026)
export const metodo = {
  antetitulo: 'Cómo funciona',
  titulo: 'De capas de datos a una lista de lugares',
  entradilla: 'La Tierra entera se compara con cada sitio, variable por variable. Nada se calcula en vivo: todo llega preparado.',
  pasos: [
    {
      titulo: 'Entrada',
      cuerpo:
        'Datos abiertos de NASA, USGS y ESA, procesados antes en una computadora. La Tierra queda en una tabla de celdas HEALPix de nivel 12 y cada sitio objetivo en un vector: 9 regiones de la Luna y 12 sitios de Marte.',
      etiquetas: ['ADR-002', 'ADR-011'],
    },
    {
      titulo: 'Proceso',
      cuerpo:
        'Cada celda se mide contra el sitio con una distancia de Mahalanobis con pesos, sobre mediana y dispersión resistentes a extremos y con un margen de tolerancia por variable. Si falta un dato, esa variable no cuenta. La nota es S = e^(−γ·D²), de 0 a 1. Solo entran celdas con el terreno completo y NDVI ≤ 0,30, y se prueban muchos escenarios para ver qué candidatos se sostienen.',
      etiquetas: ['ADR-006', 'ADR-008', 'ADR-013'],
    },
    {
      titulo: 'Resultado',
      cuerpo:
        'Un metrics.json y una lista de candidatos por perfil y por sitio, con la nota, los valores medidos, la nota de cada variable y lo que la Tierra no reproduce.',
      etiquetas: ['ADR-010'],
    },
  ],
  capas: ['Pendiente', 'Rugosidad', 'Relieve relativo', 'Sílice', 'Rango térmico', 'Iluminación', 'Viento', '+ k'],
  fuente: 'Variables N1 a N7: ADR-008',
  etiquetaCapas: 'Capas que se comparan a la vez',
};
