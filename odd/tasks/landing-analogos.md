# Landing interactiva — Análogos Tierra · Luna · Marte (J4K)

## Objetivo

Presentación interactiva del objetivo del proyecto. Debe ser muy visual, con un fondo que reaccione al mouse, la
paleta `#028EFD #0F63FC #243CF8 #521DF9` más blanco y negro, y servir como plantilla para el resto del proyecto.

## Alcance y restricciones

- Stack: Vite 8 + JavaScript (ES modules) + Less + Handlebars. Sin TypeScript (decisión del usuario).
- Separación por capas: content / views / styles / features / lib.
- Sin cifras inventadas: los datos de ejemplo llevan su etiqueta.

## Tareas

| ID | Tarea | Ruta | Estado |
| :-- | :-- | :-- | :-- |
| T1 | Base del proyecto: configs, index, layout, tokens, logo | inline | [x] |
| T2 | Fondo WebGL, presets de mundos y respaldo | inline | [x] |
| T3 | Sonda del mouse | inline | [x] |
| T4 | Diapositivas: snap, teclado, progreso, movimiento reducido | inline | [x] |
| T5 | Diapositivas 1 a 5 | inline | [x] |
| T6 | Comparador (score puro con pruebas) y diapositivas 6 a 9 | inline | [x] |
| T7 | Pulido responsive y accesibilidad, README | inline | [x] |
| T8 | Código en español: variables, comentarios, archivos y carpetas (salvo lo que exige el build) | delegada | [x] |
| T9 | Botón ES / EN arriba a la derecha: páginas `/` y `/en/`, contenido por idioma | delegada | [x] |
| T10 | Estructura de 8 diapositivas con contenido real del repo de análogos (1b93007) | delegada | [x] |

T8, ruta delegada: toca unos 80 archivos (disparador de escritor). Reglas: sin tildes ni ñ en identificadores ni
rutas; se mantienen `package.json`, `vite.config.js`, `index.html`, `jsconfig.json`, `public/`, `src/main.js`,
los sufijos `.test.js` y las APIs del navegador, WebGL y GLSL.

Ruta: todo inline en una sola sesión. El diseño visual dependía del contexto ya cargado, y un trabajador nuevo
hubiera empezado sin él.

## Evidencia (2026-11-10)

- `npm test`: 11/11 en verde. RED antes de implementar (módulos inexistentes) y GREEN después.
- `npm run build`: sin errores. JS 17.6 kB, CSS 25 kB; el logo pesa 268 kB.
- Capturas por CDP con Chrome sin ventana a 1440×900 y 390×844: las 9 diapositivas se dibujan y no hay errores
  en consola.
- Interacción por CDP: flecha abajo, Inicio y Fin navegan; al elegir Marte el fondo cambia a `mars`; el perfil
  Agua aplica sus pesos; al mover un peso a mano se desmarcan los perfiles.
- Con `--disable-3d-apis` se aplica `.no-webgl` y el fondo estático.

## Correcciones durante el trabajo

- Less 4 calcula `0.8rem + 5.2vw` como `6rem` dentro de `clamp()`. Las sumas fluidas van envueltas en `calc()`.
- Las diapositivas más altas que la pantalla nunca llegaban a un 55 % visible. La activa ahora se detecta con una
  franja en el centro de la pantalla.
- Al entrar con un ancla (`#reto`), el primer cálculo marcaba la portada y reescribía la URL. Ahora salta a la
  diapositiva del ancla antes de observar.

## Siguiente paso

- Vectorizar el logo.
- Completar versión, licencia y URL de los datasets en `src/contenido/datos.js`.
- Agregar los integrantes en `src/contenido/equipo.js`.

## Evidencia T8 (2026-11-10)

- 74 renombres con `git mv`; `npm test` 11/11; `npm run build` sin errores; la vista previa responde con
  `data-mundo="tierra"`; sin restos de nombres viejos al buscar con `rg`.

## Evidencia T9 (2026-11-11)

- RED: `formatearNumero(0.62, 2, "en")` daba `0,62`; la paridad es/en fallaba con `en` vacío. GREEN: `npm test` 16/16.
- `npm run build` genera `dist/index.html` y `dist/en/index.html`; en la versión en inglés no queda texto en español.
- CDP: `/#comparador` → EN → `/en/#comparador` (`lang=en`, puntaje `0.83`) → ES → `/#comparador`. Sin errores.
- A 390 px el botón mide 44×44 y no tapa el logo ni el indicador de mundos.

## Evidencia T10 (2026-11-12)

- RED: `contexto.test.js` fallaba sin `sitios.js`. GREEN: `npm test` 20/20 (las pruebas de `puntaje` se fueron con el comparador).
- Build con `/` y `/en/`. CDP: 8 diapositivas, 8 puntos en el riel, 3 botones de demo pendientes, ES/EN conserva el ancla y no hay errores.
- Muestreo contra el repo de análogos: SL-03, SL-09, SL-10 y SL-17, dos licencias, 58 700 374 celdas y la mención de Artemis (9 fichas). Todo coincide.
- Pendiente: decidir si se publica (ADR-005), nombres completos, contacto y 14 licencias sin verificar.
