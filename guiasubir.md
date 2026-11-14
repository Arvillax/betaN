# Subir la landing a otro repositorio desde dos PC

Dos personas suben este proyecto a **un mismo repositorio nuevo** de GitHub: la PC 1 sube la mitad 1 y la PC 2 la
mitad 2. El sitio solo compila con las dos mitades, y GitHub Pages se publica cuando sube la segunda.

Esta guía y `scripts/subir/` no se suben al repositorio nuevo.

## Requisitos

- Node 20 o superior y git en cada PC.
- Una cuenta de GitHub en cada PC, con git autenticado (ver [Problemas comunes](#problemas-comunes)).
- Un repositorio **vacío** en GitHub (sin README, sin licencia, sin `.gitignore`). Quien lo crea es el dueño.
- La persona de la PC 2 debe ser el dueño o colaboradora con permiso de escritura (Settings → Collaborators).

## Orden

1. La PC 1 sube la mitad 1 al repositorio vacío.
2. Después, la PC 2 sube la mitad 2 al mismo repositorio.

El script se niega a subir la mitad 1 a un repositorio con commits y a subir la mitad 2 si falta la mitad 1 o si ya
estaba subida.

## Comando

En cada PC, desde una copia de este proyecto (la carpeta recibida o un
`git clone https://github.com/Arvillax/betaN.git`):

```bash
cd betaN
node scripts/subir/subir-mitad.mjs
```

El script hace dos preguntas:

1. `¿Es la PC 1 o la PC 2? (1/2):`
2. `URL del repositorio destino (https://github.com/usuario/repo):`

También acepta las respuestas como opciones: `--pc 1 --repo https://github.com/usuario/repo`.

Qué hace:

- Revisa que git tenga `user.name` y `user.email`.
- Copia los archivos de su mitad a una carpeta temporal, crea un commit por módulo (ver
  [Commits de cada PC](#commits-de-cada-pc)) y los sube juntos. La copia original no cambia.
- No usa `--force`, no reescribe historial y no guarda credenciales: usa la autenticación de git de esa PC.
- Al subir la mitad 2, si `gh` (GitHub CLI) está instalado y autenticado, activa GitHub Pages con GitHub Actions y
  lanza el flujo "Publicar en GitHub Pages". Si no, muestra los pasos manuales.
- Al final muestra la mitad subida, cuántos archivos, los commits y, tras la mitad 2, la dirección de la página:
  `https://<usuario>.github.io/<repo>/`.

La ruta base de la página sale sola del nombre del repositorio (`GITHUB_REPOSITORY` en GitHub Actions), así que no
hay que editar `vite.config.js`.

## Qué lleva cada mitad

La lista exacta está en `scripts/subir/mitades.js`; `npm test` comprueba que no se repita ni falte ningún archivo.

| Mitad | PC | Archivos |
| :-- | :-- | :-- |
| 1 · estructura y estilo | PC 1 | `package.json`, `package-lock.json`, `vite.config.js`, `jsconfig.json`, `.gitignore`, `index.html`, `en/index.html`, `public/`, `src/main.js`, `src/estilos/`, `src/utilidades/`, `src/recursos/` |
| 2 · contenido y comportamiento | PC 2 | `src/contenido/`, `src/vistas/`, `src/modulos/`, `README.md`, `.github/workflows/pages.yml` |

No se suben: `guiasubir.md`, `scripts/` (el script de subida), `odd/` (seguimiento interno), `dist/` y
`node_modules/`. El `README.md` se sube sin la sección "Subir a otro repositorio", que enlaza a esta guía.

El flujo de Pages va en la mitad 2 para que el primer despliegue ocurra con el repositorio completo.

## Commits de cada PC

Cada PC crea estos commits, en este orden, y los sube con un solo push.

PC 1:

1. `chore: configuración del proyecto con Vite, Less y Handlebars`
2. `feat(utilidades): funciones de matemática, eventos, DOM, movimiento y puntero`
3. `feat(estilos): tokens, base y componentes`
4. `feat(estilos): estilos de cada diapositiva`
5. `feat: páginas en español e inglés, logo y punto de entrada`

PC 2:

1. `feat(contenido): textos en español e inglés y datos compartidos`
2. `feat(vistas): plantilla, componentes y diapositivas`
3. `feat(terreno): fondo WebGL interactivo con relieve de la Tierra, la Luna y Marte`
4. `feat(presentacion): navegación entre diapositivas, sonda, idioma y aviso de la demo`
5. `ci(pages): publicación en GitHub Pages`
6. `docs: README del proyecto`

## Publicación a mano

Si el script no pudo activar Pages:

1. En el repositorio: Settings → Pages → Source: **GitHub Actions**.
2. Actions → "Publicar en GitHub Pages" → **Run workflow** sobre `main`.

Si Pages estaba antes en modo "Deploy from a branch" (legacy), una compilación legacy puede terminar después del
despliegue de Actions y reemplazarlo. Después de cambiar a GitHub Actions, vuelva a lanzar el flujo.

## Problemas comunes

| Mensaje o síntoma | Qué hacer |
| :-- | :-- |
| "El repositorio ya tiene commits: la mitad 1 va en un repositorio vacío" | Cree un repositorio nuevo sin README ni archivos, o confirme que la PC 1 no lo subió ya. |
| "Primero tiene que subir la PC 1" | La PC 1 aún no subió la mitad 1 a ese repositorio, o la URL no es la misma. |
| "La mitad 2 ya está en el repositorio" | Ya se subió. No hay que repetirlo. |
| `Permission denied` o `403` al hacer push | La cuenta de esa PC no tiene permiso de escritura. El dueño la agrega en Settings → Collaborators y la persona acepta la invitación. |
| Git pide usuario y contraseña, o falla la autenticación | Ejecute `gh auth login` (y luego `gh auth setup-git`), o use Git Credential Manager, que viene con Git para Windows. GitHub no acepta la contraseña de la cuenta: use el navegador o un token. |
| "Git no sabe quién firma los commits" | `git config --global user.name "Su nombre"` y `git config --global user.email "su-correo@ejemplo.com"`. |

## Para agentes de IA

Antes de ejecutar el script, **pregunte al usuario** si esta es la PC 1 o la PC 2 y cuál es la URL del repositorio
destino. Nunca los deduzca del entorno, del remoto de git ni de conversaciones anteriores. Luego páselos con opciones:

```bash
node scripts/subir/subir-mitad.mjs --pc <1|2> --repo <url que dio el usuario>
```

Si el script se detiene, muestre el mensaje al usuario y no intente forzar la subida.
