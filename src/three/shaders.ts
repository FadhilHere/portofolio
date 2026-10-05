// 3D simplex noise — Ashima Arts / Stefan Gustavson (MIT).
const noise = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`

export const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uFrom;
uniform float uTo;
uniform float uMix;
uniform float uIntro;
uniform float uSize;
uniform float uPixelRatio;
uniform float uScatter;
uniform vec3 uMouse;
uniform float uMouseStrength;

attribute vec3 aS0;
attribute vec3 aS1;
attribute vec3 aS2;
attribute vec3 aS3;
attribute vec3 aS4;
attribute vec3 aS5;
attribute float aRandom;
attribute float aSize;

varying float vRandom;

${noise}

vec3 shapeAt(float i) {
  if (i < 0.5) return aS0;
  if (i < 1.5) return aS1;
  if (i < 2.5) return aS2;
  if (i < 3.5) return aS3;
  if (i < 4.5) return aS4;
  return aS5;
}

void main() {
  // Each particle starts its journey at a slightly different moment, so a morph
  // ripples through the cloud instead of moving as one rigid block.
  float t = clamp((uMix - aRandom * 0.4) / 0.6, 0.0, 1.0);
  t = t * t * (3.0 - 2.0 * t);
  vec3 p = mix(shapeAt(uFrom), shapeAt(uTo), t);

  // Mid-flight particles get pushed off their straight path by noise.
  float flight = sin(t * 3.14159265);
  vec3 q = p * 0.55 + vec3(uTime * 0.08);
  vec3 drift = vec3(snoise(q), snoise(q + 17.3), snoise(q + 41.7));
  p += drift * (0.05 + flight * 0.75 + uScatter * 0.35);

  // Intro: the cloud condenses out of a wide scatter.
  float intro = clamp((uIntro - aRandom * 0.35) / 0.65, 0.0, 1.0);
  intro = 1.0 - pow(1.0 - intro, 3.0);
  p *= mix(3.5 + aRandom * 5.0, 1.0, intro);

  vec4 world = modelMatrix * vec4(p, 1.0);

  // Pointer repulsion in world space.
  vec2 d = world.xy - uMouse.xy;
  // (smoothstep needs edge0 < edge1 — reversed edges are undefined on ANGLE.)
  float force = (1.0 - smoothstep(0.0, 1.4, length(d))) * uMouseStrength;
  world.xy += normalize(d + 1e-4) * force * 0.55;
  world.z += force * 0.6;

  vec4 mv = viewMatrix * world;
  gl_Position = projectionMatrix * mv;

  // Halftone: dot size swells and shrinks in slow patches across the shape,
  // and dots excited by a morph or the pointer print a little bigger.
  float tone = 0.45 + 0.95 * (snoise(p * 0.8 + vec3(0.0, uTime * 0.05, 3.0)) * 0.5 + 0.5);
  float energy = clamp(flight + force, 0.0, 1.0);
  gl_PointSize = uSize * aSize * tone * (1.0 + energy * 0.5) * uPixelRatio * (1.0 / -mv.z);

  vRandom = aRandom;
}
`

export const fragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uBalance;
uniform float uOpacity;

varying float vRandom;

void main() {
  // Crisp printed dot with a one-pixel-ish soft edge.
  float d = length(gl_PointCoord - 0.5);
  float alpha = 1.0 - smoothstep(0.38, 0.5, d);
  if (alpha < 0.01) discard;

  // uBalance is the share of the second colour; ~15% of dots take the third.
  float pick = fract(vRandom * 91.7);
  vec3 color = mix(uColorA, uColorB, 1.0 - step(uBalance, pick));
  color = mix(color, uColorC, step(0.85, fract(vRandom * 13.1)));

  gl_FragColor = vec4(color, alpha * uOpacity);
  // Uniform colours are linear; convert so dots match the CSS hex values.
  #include <colorspace_fragment>
}
`
