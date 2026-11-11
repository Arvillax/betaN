import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { buildContext } from './src/content/index.js';
import { helpers } from './src/views/helpers.js';

const viewsDir = fileURLToPath(new URL('./src/views', import.meta.url));

// Files imported here (content, helpers) restart the dev server when they change.
export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: viewsDir,
      context: buildContext(),
      helpers,
    }),
  ],
});
