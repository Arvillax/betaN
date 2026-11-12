/**
 * Arma el contexto de Handlebars para un idioma. Se ejecuta en Node (vite.config.js), así que no debe usar APIs
 * del navegador. Une los datos compartidos (ids, mundos, pesos, fechas) con los textos del idioma, por id.
 * Ninguna clave de primer nivel puede ser una función: el plugin las llamaría con la ruta de la página.
 */
import { sitio, idsMundos } from './sitio.js';
import { diapositivas } from './diapositivas.js';
import { dimensiones } from './dimensiones.js';
import { variables, destinos, perfiles } from './comparador.ejemplo.js';
import { filasDatos } from './datos.js';
import { hitos } from './hoja-de-ruta.js';
import { integrantes } from './equipo.js';
import es from './es/index.js';
import en from './en/index.js';

export const idiomas = { es, en };

/** Página de cada idioma y a cuál lleva el botón del encabezado. */
const paginas = {
  es: { ruta: '/', otro: 'en' },
  en: { ruta: '/en/', otro: 'es' },
};

/** @param {'es'|'en'} [codigo] */
export function construirContexto(codigo = 'es') {
  const t = idiomas[codigo] ?? es;
  const otro = paginas[t.codigo].otro;
  const nombreConjunto = (c) => ({ ...c, nombre: c.nombre ?? t.datos.conjuntos[c.clave] });

  return {
    idioma: {
      codigo: t.codigo,
      otro: { codigo: otro, etiqueta: otro.toUpperCase(), ruta: paginas[otro].ruta },
    },
    interfaz: t.interfaz,
    sitio: { ...sitio, ...t.sitio },
    mundos: idsMundos.map((id) => ({ id, etiqueta: t.mundos[id] })),
    diapositivas: diapositivas.map((d) => ({ ...d, etiqueta: t.diapositivas[d.id] })),
    portada: t.portada,
    reto: t.reto,
    loQueNo: t.loQueNo,
    metodo: t.metodo,
    dimensiones: dimensiones.map((d) => ({
      ...d,
      ...t.dimensiones.elementos[d.id],
      etiquetaCobertura: t.dimensiones.coberturas[d.cobertura],
    })),
    textosDimensiones: t.dimensiones.textos,
    comparador: {
      // Los deslizadores arrancan con el primer perfil.
      variables: variables.map((v) => ({
        ...v,
        etiqueta: t.comparador.variables[v.id],
        peso: perfiles[0].pesos[v.id] ?? 0,
      })),
      destinos: destinos.map((d) => ({ ...d, ...t.comparador.destinos[d.id] })),
      perfiles: perfiles.map((p, i) => ({ ...p, etiqueta: t.comparador.perfiles[p.id], activo: i === 0 })),
      textos: t.comparador.textos,
    },
    datos: {
      filas: filasDatos.map((f) => ({
        ...f,
        variable: t.datos.variables[f.id],
        tierra: f.tierra.map(nombreConjunto),
        luna: f.luna.map(nombreConjunto),
        marte: f.marte.map(nombreConjunto),
      })),
      textos: t.datos.textos,
    },
    hojaDeRuta: {
      hitos: hitos.map((h) => ({ ...h, ...t.hojaDeRuta.hitos[h.id], etiquetaEstado: t.hojaDeRuta.estados[h.estado] })),
      textos: t.hojaDeRuta.textos,
    },
    equipo: {
      integrantes: integrantes.map((i) => ({ ...i, rol: t.equipo.roles[i.id] })),
      textos: t.equipo.textos,
    },
    anio: new Date().getFullYear(),
  };
}
