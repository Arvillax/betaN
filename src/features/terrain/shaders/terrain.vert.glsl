#version 300 es
// Full-screen triangle pair; all the work happens in the fragment shader.
in vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
