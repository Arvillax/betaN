/**
 * WebGL2 renderer for the contour-line background.
 * Owns the GL context, the animation loop and the transitions between worlds.
 */
import vertexSource from './shaders/terrain.vert.glsl?raw';
import fragmentSource from './shaders/terrain.frag.glsl?raw';
import { WORLDS, DEFAULT_WORLD } from './worlds.js';
import { damp, hexToRgb } from '../../lib/math.js';
import { cssVar } from '../../lib/dom.js';

const MAX_PIXEL_RATIO = 1.5;
const TRANSITION_SPEED = 2.4; // higher = faster world morph
const PROBE_SPEED = 6;
const POINTER_SPEED = 14;

const UNIFORMS = [
  'u_resolution', 'u_pointer', 'u_probe', 'u_time', 'u_world',
  'u_bg', 'u_lineLow', 'u_lineHigh', 'u_lineAlpha',
];

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Terrain shader failed to compile: ${log}`);
  }
  return shader;
}

function createProgram(gl) {
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`Terrain program failed to link: ${gl.getProgramInfoLog(program)}`);
  }
  return program;
}

function createQuad(gl, program) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const location = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
}

const color = (token) => hexToRgb(cssVar(token) || '#000000');

/** Resolves a preset's token names into numeric targets. */
function targetsFor(worldId) {
  const preset = WORLDS[worldId] ?? WORLDS[DEFAULT_WORLD];
  return {
    blend: [...preset.blend],
    bg: color(preset.bg),
    lineLow: color(preset.lineLow),
    lineHigh: color(preset.lineHigh),
    lineAlpha: preset.lineAlpha,
  };
}

const dampArray = (current, target, lambda, dt) => current.map((v, i) => damp(v, target[i], lambda, dt));

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{ reducedMotion: boolean, onFailure?: () => void }} options
 * @returns {{ setWorld(id: string): void, setPointer(p: {x:number,y:number,active:boolean}): void, setReducedMotion(v: boolean): void, destroy(): void } | null}
 *   null when WebGL2 is unavailable, so the caller can fall back.
 */
export function createTerrain(canvas, options) {
  const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return null;

  let program;
  try {
    program = createProgram(gl);
  } catch (error) {
    console.error(error);
    return null;
  }

  gl.useProgram(program);
  createQuad(gl, program);
  const loc = Object.fromEntries(UNIFORMS.map((name) => [name, gl.getUniformLocation(program, name)]));

  let reducedMotion = options.reducedMotion;
  let target = targetsFor(DEFAULT_WORLD);
  let current = structuredClone(target);
  const pointer = { x: 0, y: 0, tx: 0, ty: 0, probe: 0, targetProbe: 0 };
  let scale = 1;
  let frame = 0;
  let last = performance.now();
  let elapsed = 0;
  let dirty = true;

  function resize() {
    scale = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    const width = Math.max(1, Math.round(canvas.clientWidth * scale));
    const height = Math.max(1, Math.round(canvas.clientHeight * scale));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      dirty = true;
    }
  }

  function step(dt) {
    const speed = reducedMotion ? 1e3 : TRANSITION_SPEED;
    current.blend = dampArray(current.blend, target.blend, speed, dt);
    current.bg = dampArray(current.bg, target.bg, speed, dt);
    current.lineLow = dampArray(current.lineLow, target.lineLow, speed, dt);
    current.lineHigh = dampArray(current.lineHigh, target.lineHigh, speed, dt);
    current.lineAlpha = damp(current.lineAlpha, target.lineAlpha, speed, dt);
    pointer.probe = damp(pointer.probe, pointer.targetProbe, PROBE_SPEED, dt);
    pointer.x = damp(pointer.x, pointer.tx, POINTER_SPEED, dt);
    pointer.y = damp(pointer.y, pointer.ty, POINTER_SPEED, dt);
    if (!reducedMotion) elapsed += dt;
  }

  function isSettled() {
    const near = (a, b) => a.every((v, i) => Math.abs(v - b[i]) < 1e-3);
    return (
      near(current.blend, target.blend) &&
      near(current.bg, target.bg) &&
      Math.abs(pointer.probe - pointer.targetProbe) < 1e-3 &&
      Math.abs(pointer.x - pointer.tx) < 0.5 &&
      Math.abs(pointer.y - pointer.ty) < 0.5
    );
  }

  function draw() {
    gl.uniform2f(loc.u_resolution, canvas.width, canvas.height);
    gl.uniform2f(loc.u_pointer, pointer.x * scale, canvas.height - pointer.y * scale);
    gl.uniform1f(loc.u_probe, pointer.probe);
    gl.uniform1f(loc.u_time, elapsed);
    gl.uniform3fv(loc.u_world, current.blend);
    gl.uniform3fv(loc.u_bg, current.bg);
    gl.uniform3fv(loc.u_lineLow, current.lineLow);
    gl.uniform3fv(loc.u_lineHigh, current.lineHigh);
    gl.uniform1f(loc.u_lineAlpha, current.lineAlpha);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  function tick(now) {
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    resize();
    step(dt);
    // With reduced motion the relief is static: draw only when something changed.
    if (!reducedMotion || dirty || !isSettled()) {
      draw();
      dirty = false;
    }
    frame = requestAnimationFrame(tick);
  }

  function start() {
    if (frame) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  }

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
  }

  const onVisibility = () => (document.hidden ? stop() : start());
  const onContextLost = (event) => {
    event.preventDefault();
    stop();
    options.onFailure?.();
  };

  document.addEventListener('visibilitychange', onVisibility);
  canvas.addEventListener('webglcontextlost', onContextLost);
  start();

  return {
    setWorld(id) {
      target = targetsFor(id);
      dirty = true;
    },
    setPointer({ x, y, active }) {
      pointer.targetProbe = active ? 1 : 0;
      if (active) {
        if (pointer.probe < 0.01) {
          pointer.x = x;
          pointer.y = y;
        }
        pointer.tx = x;
        pointer.ty = y;
      }
      dirty = true;
    },
    setReducedMotion(value) {
      reducedMotion = value;
      dirty = true;
    },
    destroy() {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onContextLost);
    },
  };
}
