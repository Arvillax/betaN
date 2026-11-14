import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { construirContexto } from './src/contenido/contexto.js';
import { ayudantes } from './src/vistas/ayudantes.js';

const desdeRaiz = (ruta) => fileURLToPath(new URL(ruta, import.meta.url));
const carpetaVistas = desdeRaiz('./src/vistas');

// GitHub Pages sirve el repo Arvillax/betaN bajo /betaN/; en desarrollo se sigue usando la raíz.
const basePublicacion = '/betaN/';

// Los archivos que se importan aquí (contenido, ayudantes) reinician el servidor de desarrollo cuando cambian.
export default defineConfig(({ command }) => {
  const base = command === 'build' ? basePublicacion : '/';

  return {
    base,
    plugins: [
      handlebars({
        partialDirectory: carpetaVistas,
        // Una página por idioma: / en español y /en/ en inglés.
        context: (ruta) => construirContexto(ruta.startsWith('/en/') ? 'en' : 'es', base),
        helpers: ayudantes,
      }),
    ],
    build: {
      rollupOptions: {
        input: {
          es: desdeRaiz('./index.html'),
          en: desdeRaiz('./en/index.html'),
        },
      },
    },
  };
});
