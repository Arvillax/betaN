/** Textos del comparador de ejemplo, por id de variable, destino y perfil. */
export const comparador = {
  variables: {
    pendiente: 'Slope',
    rugosidad: 'Roughness',
    relieve: 'Relative relief',
    emisividad: 'Emissivity',
    permafrost: 'Permafrost',
    viento: 'Wind',
  },
  destinos: {
    luna: {
      etiqueta: 'Moon',
      sitio: 'Lunar base site (example)',
      tierraNoPuede: ['Gravity: about 1/6 of Earth’s', 'No atmosphere and no pressure', 'Nights lasting about 14 Earth days'],
    },
    marte: {
      etiqueta: 'Mars',
      sitio: 'Mars exploration site (example)',
      tierraNoPuede: [
        'Gravity: about 0.38 of Earth’s',
        'CO₂ atmosphere at less than 1% of Earth’s pressure',
        'Surface radiation with no global magnetic field',
      ],
    },
  },
  perfiles: {
    rover: 'Rover',
    habitat: 'Habitat',
    agua: 'Water',
  },
  textos: {
    antetitulo: 'Comparator',
    titulo: 'Move the weights, watch the similarity',
    entradilla: 'One cell on Earth against a destination. Pick a use or tune each variable.',
    etiquetaEjemplo: 'Example — data pending',
    etiquetaPuntaje: 'Similarity S, from 0 to 1',
    nota: 'Simplified version of ADR-006: weighted distance, no correlation between variables. When a value is missing, that variable does not count and its weight is shared out among the rest.',
    leyendaDestino: 'Destination',
    leyendaUso: 'Use',
    leyendaPesos: 'Weight of each variable',
    resultado: 'Result',
    coincide: 'Matches',
    difiere: 'Differs',
    tierraNoPuede: 'Earth cannot reproduce',
    vacio: '—',
    sinDato: 'no data',
    usadas: (usadas, total) => `Uses ${usadas} of ${total} weighted variables`,
    sinPeso: 'Give at least one variable some weight',
  },
};
