import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { construirContexto } from './src/contenido/contexto.js';
import { ayudantes } from './src/vistas/ayudantes.js';

const carpetaVistas = fileURLToPath(new URL('./src/vistas', import.meta.url));

// Los archivos que se importan aquí (contenido, ayudantes) reinician el servidor de desarrollo cuando cambian.
export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: carpetaVistas,
      context: construirContexto(),
      helpers: ayudantes,
    }),
  ],
});
