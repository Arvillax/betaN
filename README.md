# Análogos Tierra · Luna · Marte — landing de J4K

Presentación interactiva del proyecto de J4K para el NASA Space Apps Challenge 2026: buscar en la Tierra lugares
análogos a sitios de la Luna y de Marte, comparando varias variables físicas a la vez.

El fondo es un campo de curvas de nivel en WebGL. El cursor funciona como sonda y levanta el relieve. Cada
diapositiva muestra el terreno de su mundo: Tierra en papel claro, Luna y Marte de noche.

## Uso

```bash
npm install
npm run dev       # servidor local con recarga
npm run build     # genera dist/
npm run preview   # sirve dist/
npm test          # pruebas con node --test
```

Requiere Node 20 o superior.

## Cómo está organizado

```
src/
├─ main.js        # arranca todo y conecta las features
├─ content/       # QUÉ se dice: textos y datos, sin lógica
├─ views/         # CÓMO se ve: Handlebars (layouts, pages, components, helpers.js)
├─ styles/        # Less en orden ITCSS: settings → tools → base → components → pages
├─ features/      # comportamiento, una carpeta por feature
│  ├─ terrain/    # fondo WebGL, mundos y respaldo sin WebGL
│  ├─ probe/      # lectura que sigue al cursor
│  ├─ deck/       # diapositivas, teclado y progreso
│  └─ comparator/ # demo del parecido (score.js es puro y tiene pruebas)
├─ lib/           # utilidades sin conocimiento del dominio
└─ assets/brand/  # logo
```

Reglas que mantienen el orden:

- **Las dependencias van en un solo sentido:** `main.js → features → lib`. El contenido llega a las vistas por
  el contexto de Handlebars (`vite.config.js`).
- **Las features no se importan entre sí.** Se comunican con eventos del DOM (`src/lib/events.js`). Por ejemplo,
  el comparador pide un mundo con `world:request` y el terreno lo dibuja.
- **Los colores viven solo en `styles/settings/tokens.less`.** El shader los lee como variables CSS
  (`features/terrain/worlds.js`).

## Tareas comunes

**Cambiar un texto:** edita el archivo correspondiente en `src/content/`. Con `npm run dev` andando, el servidor se
reinicia solo.

**Agregar una diapositiva:**

1. Crea `src/views/pages/<nombre>.hbs` y envuelve su contenido en `{{#> components/slide}} … {{/components/slide}}`.
2. Crea `src/styles/pages/<nombre>.less` e impórtalo en `src/styles/main.less`.
3. Agrega la entrada en `src/content/slides.js` con `world` (`earth`, `moon` o `mars`) y `tone` (`light` o `dark`).

**Agregar integrantes:** completa `members` en `src/content/team.js`.

**Cambiar el relieve de un mundo:** las formas están en `features/terrain/shaders/terrain.frag.glsl` (funciones
`earthHeight`, `moonHeight` y `marsHeight`) y los colores en `features/terrain/worlds.js`.

## Datos

- Los valores del comparador son **de ejemplo** y la página lo dice. Cuando exista el motor real (ADR-006), se
  reemplaza `src/content/comparator.sample.js`.
- Los nombres de datasets y la cobertura de las 8 dimensiones salen de
  `analogos-space-apps-2026/contexto/10-reto/dimensiones-innegociables.md` (2026-11-05). Faltan versión, licencia
  y URL de cada uno.
- Las coordenadas de la sonda son simuladas: el relieve es procedural, no es un dato.

## Accesibilidad

- Se puede navegar con flechas, Re Pág/Av Pág, espacio, Inicio y Fin. El foco de teclado es visible.
- Con `prefers-reduced-motion` el relieve queda quieto y no hay animaciones de entrada.
- Sin WebGL2 se muestra un fondo estático hecho con la misma paleta.

## Pendientes

- `src/assets/brand/j4k.svg` es un PNG dentro de un SVG (268 KB). Conviene vectorizarlo: pesaría menos, se vería
  nítido en cualquier tamaño y permitiría una versión de un solo color.
