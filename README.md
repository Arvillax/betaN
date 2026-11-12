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

Todo el código usa nombres en español. Solo quedan en inglés los nombres que exige la herramienta: `main.js`,
`vite.config.js`, `package.json`, `index.html`, el sufijo `.test.js` y las APIs del navegador, de WebGL y de Handlebars.

```
src/
├─ main.js          # arranca todo y conecta los módulos
├─ contenido/       # QUÉ se dice: datos compartidos; textos en es/ y en/
├─ vistas/          # CÓMO se ve: Handlebars (plantillas, paginas, componentes, ayudantes.js)
├─ estilos/         # Less en orden ITCSS: ajustes → herramientas → base → componentes → paginas
├─ modulos/         # comportamiento, una carpeta por módulo
│  ├─ terreno/      # fondo WebGL, mundos y respaldo sin WebGL
│  ├─ sonda/        # lectura que sigue al cursor
│  ├─ presentacion/ # diapositivas, teclado y progreso
│  └─ comparador/   # demo del parecido (puntaje.js es puro y tiene pruebas)
├─ utilidades/      # ayudantes sin conocimiento del dominio
└─ recursos/marca/  # logo
```

Reglas que mantienen el orden:

- **Las dependencias van en un solo sentido:** `main.js → modulos → utilidades`. El contenido llega a las vistas por
  el contexto de Handlebars (`vite.config.js`).
- **Los módulos no se importan entre sí.** Se comunican con eventos del DOM (`src/utilidades/eventos.js`). Por
  ejemplo, el comparador pide un mundo con `mundo:pedido` y el terreno lo dibuja.
- **Los colores viven solo en `estilos/ajustes/tokens.less`.** El sombreador los lee como variables CSS
  (`modulos/terreno/mundos.js`).

## Tareas comunes

**Cambiar un texto:** edítalo en `src/contenido/es/` y en `src/contenido/en/` (ver [Idiomas](#idiomas)). Con
`npm run dev` andando, el servidor se reinicia solo.

**Agregar una diapositiva:**

1. Crea `src/vistas/paginas/<nombre>.hbs` y envuelve su contenido en
   `{{#> componentes/diapositiva}} … {{/componentes/diapositiva}}`.
2. Crea `src/estilos/paginas/<nombre>.less` e impórtalo en `src/estilos/principal.less`.
3. Agrega la entrada en `src/contenido/diapositivas.js` con `vista` (`paginas/<nombre>`), `mundo` (`tierra`, `luna`
   o `marte`) y `tono` (`claro` u `oscuro`).
4. Agrega su etiqueta y sus textos en `src/contenido/es/` y `src/contenido/en/`.

**Agregar integrantes:** completa `integrantes` en `src/contenido/equipo.js` (`id`, `nombre`, `url`) y su rol en
`roles` de `src/contenido/es/equipo.js` y `src/contenido/en/equipo.js`.

**Cambiar el relieve de un mundo:** las formas están en `modulos/terreno/sombreadores/terreno.frag.glsl` (funciones
`alturaTierra`, `alturaLuna` y `alturaMarte`) y los colores en `modulos/terreno/mundos.js`.

## Idiomas

La página existe en español (`/`) y en inglés (`/en/`). Son dos páginas estáticas que se generan al compilar con el
mismo HTML: `index.html` y `en/index.html`. El botón de la esquina superior derecha lleva a la otra y conserva el
hash, así que quien está en `/#comparador` llega a `/en/#comparador`.

Dónde vive cada cosa:

- `src/contenido/*.js`: lo que no cambia con el idioma (ids, mundos, tonos, fechas, pesos, diferencias, nombres de
  datasets).
- `src/contenido/es/` y `src/contenido/en/`: los textos, con los mismos archivos y la misma forma. Se buscan por
  `id`. `interfaz.js` guarda los textos fijos de la interfaz (etiquetas accesibles, sonda, botón de idioma).
- `src/contenido/contexto.js` une las dos partes para cada página; `main.js` elige los textos del comparador y la
  sonda según el `lang` de la página.

Para cambiar un texto, edítalo en los dos idiomas. Para agregar uno, ponlo con la misma clave en `es/` y en `en/`:
`src/contenido/idiomas.test.js` (`npm test`) falla si a un idioma le falta una clave, un elemento de una lista o si
un texto cambia de tipo (por ejemplo, de cadena a función).

Los ids de las diapositivas (`inicio`, `reto`, `comparador`…) quedan en español a propósito en los dos idiomas: son
el hash de la URL y el id del DOM, y así el botón de idioma puede conservar la diapositiva.

## Datos

- Los valores del comparador son **de ejemplo** y la página lo dice. Cuando exista el motor real (ADR-006), se
  reemplaza `src/contenido/comparador.ejemplo.js`.
- Los nombres de datasets y la cobertura de las 8 dimensiones salen de
  `analogos-space-apps-2026/contexto/10-reto/dimensiones-innegociables.md` (2026-11-05). Faltan versión, licencia
  y URL de cada uno.
- Las coordenadas de la sonda son simuladas: el relieve es procedural, no es un dato.

## Accesibilidad

- Se puede navegar con flechas, Re Pág/Av Pág, espacio, Inicio y Fin. El foco de teclado es visible.
- Con `prefers-reduced-motion` el relieve queda quieto y no hay animaciones de entrada.
- Sin WebGL2 se muestra un fondo estático hecho con la misma paleta.

## Pendientes

- `src/recursos/marca/j4k.svg` es un PNG dentro de un SVG (268 KB). Conviene vectorizarlo: pesaría menos, se vería
  nítido en cualquier tamaño y permitiría una versión de un solo color.
