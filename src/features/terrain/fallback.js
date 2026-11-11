/**
 * Static background for browsers without WebGL2 (or when the GL context is lost).
 * The look lives in CSS (`.no-webgl` in src/styles/base/base.less); this only switches it on.
 */
export function useStaticBackground(canvas) {
  canvas.hidden = true;
  document.documentElement.classList.add('no-webgl');
}
