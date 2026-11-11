/**
 * Arma el contexto de Handlebars. Se ejecuta en Node (vite.config.js), así que no debe usar APIs del navegador.
 */
import { sitio, mundos } from './sitio.js';
import { diapositivas } from './diapositivas.js';
import { portada, reto, loQueNo, metodo } from './reto.js';
import { dimensiones, textosDimensiones, etiquetasCobertura } from './dimensiones.js';
import { variables, destinos, perfiles, textosComparador } from './comparador.ejemplo.js';
import { filasDatos, textosDatos } from './datos.js';
import { hitos, textosHojaDeRuta, etiquetasEstado } from './hoja-de-ruta.js';
import { integrantes, textosEquipo } from './equipo.js';

export function construirContexto() {
  return {
    sitio,
    mundos,
    diapositivas,
    portada,
    reto,
    loQueNo,
    metodo,
    dimensiones: dimensiones.map((d) => ({ ...d, etiquetaCobertura: etiquetasCobertura[d.cobertura] })),
    textosDimensiones,
    comparador: {
      // Los deslizadores arrancan con el primer perfil.
      variables: variables.map((v) => ({ ...v, peso: perfiles[0].pesos[v.id] ?? 0 })),
      destinos,
      perfiles: perfiles.map((p, i) => ({ ...p, activo: i === 0 })),
      textos: textosComparador,
    },
    datos: { filas: filasDatos, textos: textosDatos },
    hojaDeRuta: {
      hitos: hitos.map((h) => ({ ...h, etiquetaEstado: etiquetasEstado[h.estado] })),
      textos: textosHojaDeRuta,
    },
    equipo: { integrantes, textos: textosEquipo },
    anio: new Date().getFullYear(),
  };
}
