/** Textos del comparador de ejemplo, por id de variable, destino y perfil. */
export const comparador = {
  variables: {
    pendiente: 'Pendiente',
    rugosidad: 'Rugosidad',
    relieve: 'Relieve relativo',
    emisividad: 'Emisividad',
    permafrost: 'Permafrost',
    viento: 'Viento',
  },
  destinos: {
    luna: {
      etiqueta: 'Luna',
      sitio: 'Sitio de base lunar (ejemplo)',
      tierraNoPuede: ['Gravedad: cerca de 1/6 de la terrestre', 'Sin atmósfera ni presión', 'Noches de unos 14 días terrestres'],
    },
    marte: {
      etiqueta: 'Marte',
      sitio: 'Sitio de exploración en Marte (ejemplo)',
      tierraNoPuede: [
        'Gravedad: cerca de 0,38 de la terrestre',
        'Atmósfera de CO₂ a menos del 1 % de la presión terrestre',
        'Radiación en superficie sin campo magnético global',
      ],
    },
  },
  perfiles: {
    rover: 'Rover',
    habitat: 'Hábitat',
    agua: 'Agua',
  },
  textos: {
    antetitulo: 'Comparador',
    titulo: 'Mueve los pesos, mira el parecido',
    entradilla: 'Una celda de la Tierra contra un destino. Elige el uso o ajusta cada variable.',
    etiquetaEjemplo: 'Ejemplo — dato pendiente',
    etiquetaPuntaje: 'Parecido S, de 0 a 1',
    nota: 'Versión simplificada de ADR-006: distancia con pesos, sin correlación entre variables. Si falta un dato, la variable no cuenta y su peso se reparte.',
    leyendaDestino: 'Destino',
    leyendaUso: 'Uso',
    leyendaPesos: 'Peso de cada variable',
    resultado: 'Resultado',
    coincide: 'Coincide',
    difiere: 'Difiere',
    tierraNoPuede: 'La Tierra no reproduce',
    vacio: '—',
    sinDato: 'sin dato',
    usadas: (usadas, total) => `Usa ${usadas} de ${total} variables con peso`,
    sinPeso: 'Dale peso a al menos una variable',
  },
};
