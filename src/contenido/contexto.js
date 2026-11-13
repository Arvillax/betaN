/**
 * Arma el contexto de Handlebars para un idioma. Se ejecuta en Node (vite.config.js), así que no debe usar APIs
 * del navegador. Une los datos compartidos (ids, mundos, cifras, datasets) con los textos del idioma, por id.
 * Ninguna clave de primer nivel puede ser una función: el plugin las llamaría con la ruta de la página.
 */
import { sitio, idsMundos } from './sitio.js';
import { diapositivas } from './diapositivas.js';
import { sitiosObjetivo } from './sitios.js';
import { conjuntosDatos, idsCuerpos, herramientas } from './datos.js';
import { cifras, fuenteSitios, fechaEnsayo } from './alcance.js';
import { integrantes } from './equipo.js';
import es from './es/index.js';
import en from './en/index.js';

export const idiomas = { es, en };

/** Página de cada idioma y a cuál lleva el botón del encabezado. */
const paginas = {
  es: { ruta: '/', otro: 'en' },
  en: { ruta: '/en/', otro: 'es' },
};

/**
 * Estado del botón de la demo: enlace si hay URL, pendiente si no.
 * @param {string} urlDemo
 * @param {{ probar: string, pendiente: string, pendienteCorto: string }} textos
 */
export function construirDemo(urlDemo, textos) {
  const url = (urlDemo ?? '').trim();
  return { disponible: url !== '', url, ...textos };
}

/** @param {'es'|'en'} [codigo] */
export function construirContexto(codigo = 'es') {
  const t = idiomas[codigo] ?? es;
  const otro = paginas[t.codigo].otro;
  const formato = new Intl.NumberFormat(t.codigo);
  const cifra = (c) => ({ ...c, texto: formato.format(c.valor), ...t.alcance.cifras[c.id] });
  const sitiosDe = (cuerpo) => sitiosObjetivo.filter((s) => s.cuerpo === cuerpo);

  return {
    idioma: {
      codigo: t.codigo,
      otro: { codigo: otro, etiqueta: otro.toUpperCase(), ruta: paginas[otro].ruta },
    },
    interfaz: t.interfaz,
    sitio: { ...sitio, ...t.sitio },
    demo: construirDemo(sitio.urlDemo, t.interfaz.demo),
    mundos: idsMundos.map((id) => ({ id, etiqueta: t.mundos[id] })),
    diapositivas: diapositivas.map((d) => ({ ...d, etiqueta: t.diapositivas[d.id] })),
    inicio: t.inicio,
    reto: t.reto,
    sitios: { luna: sitiosDe('luna'), marte: sitiosDe('marte'), textos: t.sitios },
    metodo: t.metodo,
    datos: {
      cuerpos: idsCuerpos.map((id) => ({
        id,
        etiqueta: t.mundos[id],
        conjuntos: conjuntosDatos
          .filter((c) => c.cuerpo === id)
          .map((c) => ({ ...c, version: c.version ?? t.datos.textos.versionPendiente, licencia: t.datos.licencias[c.licencia] })),
      })),
      herramientas: herramientas.map((h) => ({ ...h, detalle: t.datos.herramientas[h.id] })),
      textos: t.datos.textos,
    },
    alcance: {
      // Los sitios objetivo van antes de los análogos de control.
      cifras: [...cifras.slice(0, -1), { id: 'sitios', valor: sitiosObjetivo.length, fuente: fuenteSitios }, ...cifras.slice(-1)].map(
        (c) => cifra(c),
      ),
      etiquetaEnsayo: `${t.alcance.textos.ensayo}, ${fechaEnsayo}`,
      textos: t.alcance.textos,
    },
    equipo: {
      integrantes: integrantes.map((i) => ({ ...i, rol: t.equipo.roles[i.id] })),
      textos: t.equipo.textos,
    },
    cierre: t.cierre,
    anio: new Date().getFullYear(),
  };
}
