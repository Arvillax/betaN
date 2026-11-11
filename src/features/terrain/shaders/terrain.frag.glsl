#version 300 es
// Procedural terrain drawn as contour lines.
// Three height models (Earth, Moon, Mars) are blended by u_world, so slides can morph between them.
// The pointer acts as a probe: it raises the terrain locally and brightens the lines around it.
precision highp float;

uniform vec2 u_resolution;   // drawing buffer size in pixels
uniform vec2 u_pointer;      // pointer in buffer pixels, origin bottom-left
uniform float u_probe;       // 0..1, eases in while the pointer is over the page
uniform float u_time;        // seconds
uniform vec3 u_world;        // blend weights: earth, moon, mars (sum = 1)
uniform vec3 u_bg;           // background color
uniform vec3 u_lineLow;      // line color at low elevation
uniform vec3 u_lineHigh;     // line color at high elevation
uniform float u_lineAlpha;   // overall line strength

out vec4 outColor;

const mat2 OCTAVE = mat2(1.6, 1.2, -1.2, 1.6);
const float LEVELS = 10.0;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec2 hash2(vec2 p) {
  float n = hash(p);
  return vec2(n, hash(p + n));
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = OCTAVE * p;
    amplitude *= 0.5;
  }
  return value;
}

// Sharp crests, like mountain ranges and eroded ridges.
float ridged(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    float n = 1.0 - abs(noise(p) * 2.0 - 1.0);
    value += amplitude * n * n;
    p = OCTAVE * p;
    amplitude *= 0.5;
  }
  return value;
}

// One crater per cell: a bowl below ground plus a raised rim.
float craters(vec2 p) {
  vec2 cell = floor(p);
  vec2 local = fract(p);
  float h = 0.0;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 center = g + 0.15 + hash2(cell + g) * 0.7;
      float radius = mix(0.12, 0.42, hash(cell + g + 7.1));
      float d = length(local - center) / radius;
      float bowl = d < 1.0 ? (d * d - 1.0) * 0.55 : 0.0;
      float rim = exp(-pow((d - 1.0) * 3.5, 2.0)) * 0.3;
      h += (bowl + rim) * radius * 2.2;
    }
  }
  return h;
}

float earthHeight(vec2 p) {
  return ridged(p * 0.85) * 1.1 + fbm(p * 2.1) * 0.22;
}

float moonHeight(vec2 p) {
  return fbm(p * 0.6) * 0.45 + craters(p * 1.25) * 0.85 + craters(p * 3.2 + 11.0) * 0.3;
}

float marsHeight(vec2 p) {
  vec2 stretched = vec2(p.x * 0.55 + p.y * 0.3, p.y * 1.5);
  float dunes = sin(stretched.y * 3.2 + fbm(p * 1.1) * 4.5) * 0.1;
  return fbm(p * 0.75) * 0.85 + dunes + craters(p * 0.8 + 3.0) * 0.45;
}

float height(vec2 p) {
  float h = 0.0;
  // Uniform branches: cheap, and skip models that are not visible.
  if (u_world.x > 0.001) h += u_world.x * earthHeight(p);
  if (u_world.y > 0.001) h += u_world.y * moonHeight(p);
  if (u_world.z > 0.001) h += u_world.z * marsHeight(p);
  return h;
}

// 1 on a contour line, 0 between lines; anti-aliased with screen-space derivatives.
float contour(float value, float width) {
  float distanceToLine = abs(fract(value + 0.5) - 0.5);
  return 1.0 - smoothstep(0.0, fwidth(value) * width, distanceToLine);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;
  vec2 drift = vec2(u_time * 0.012, u_time * 0.006);
  vec2 p = uv * 2.6 + drift;

  vec2 probeUv = (u_pointer - 0.5 * u_resolution) / u_resolution.y;
  float probeDistance = length(uv - probeUv);
  float lift = exp(-probeDistance * probeDistance * 26.0) * 0.42 * u_probe;
  float glow = exp(-probeDistance * probeDistance * 9.0) * u_probe;

  float h = height(p) + lift;
  float v = h * LEVELS;

  float minor = contour(v, 1.1);
  float major = contour(v / 5.0, 1.6);

  float elevation = clamp(h * 0.9, 0.0, 1.0);
  vec3 lineColor = mix(u_lineLow, u_lineHigh, elevation);

  float strength = (minor * 0.45 + major * 0.75) * u_lineAlpha * (0.55 + glow * 0.8);

  // Faint hypsometric tint so the relief reads even between lines.
  vec3 color = mix(u_bg, lineColor, elevation * 0.06);
  color = mix(color, lineColor, clamp(strength, 0.0, 1.0));

  // Soft vignette toward the background color.
  float vignette = smoothstep(1.25, 0.35, length(uv));
  color = mix(u_bg, color, 0.35 + 0.65 * vignette);

  outColor = vec4(color, 1.0);
}
