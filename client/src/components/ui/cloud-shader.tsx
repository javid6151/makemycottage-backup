"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type CloudShaderProps = {
  className?: string;
  children?: React.ReactNode;
  /** Animation speed multiplier. 1 = default natural drift. */
  speed?: number;
  /** Number of clouds (1-4). */
  count?: number;
  /** Cloud tint color (hex or rgb string). */
  cloudColor?: string;
  /** Sky color at the top (hex or rgb string). */
  skyTopColor?: string;
  /** Sky color at the bottom (hex or rgb string). */
  skyBottomColor?: string;
};

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

varying vec2 v_uv;

uniform vec2 u_res;
uniform float u_time;
uniform float u_count;
uniform vec3 u_cloud;
uniform vec3 u_skyTop;
uniform vec3 u_skyBottom;

// Rotation matrix helper (avoids global const constructor for WebGL 1.0 compatibility)
mat2 getRot() {
  return mat2(0.80, 0.60, -0.60, 0.80);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(41.31, 289.17))) * 26737.367);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  mat2 R = getRot();
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    sum += amp * vnoise(p);
    p = R * p * 2.03 + 19.19;
    amp *= 0.5;
  }
  return sum;
}

// Billow noise: sharp puffy cauliflower ridges for realistic cloud crowns
float billow(vec2 p) {
  mat2 R = getRot();
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    sum += amp * (1.0 - abs(2.0 * vnoise(p) - 1.0));
    p = R * p * 2.11 + 13.37;
    amp *= 0.5;
  }
  return sum;
}

// Cloud density calculation with sculpted cauliflower tops and flat wispy base
float cloudDensity(vec2 p, vec2 c, vec2 r, float seed, float t) {
  vec2 q = p - c;

  // Asymmetric envelope: dome top, flatter base
  float ry = q.y > 0.0 ? r.y : r.y * 0.44;
  float env = 1.0 - length(vec2(q.x / r.x, q.y / ry));
  if (env < -0.15) return 0.0;

  // Domain-warped billow noise with gentle internal evolution
  vec2 dp = q * (2.2 / r.x) + seed;
  dp += 0.5 * vec2(
    fbm(dp * 1.3 + t * 0.03),
    fbm(dp * 1.3 + 7.7 - t * 0.02)
  );
  float detail = billow(dp * 1.5);

  return env + (detail - 0.60) * 0.65;
}

// Shades a single 3D cloud with sunlit rim, internal self-shadows, and sky blending
vec3 shadeCloud(vec3 color, vec3 sky, vec2 p, vec2 c, vec2 r, float seed, float t, float dist) {
  float d = cloudDensity(p, c, r, seed, t);
  if (d < 0.02) return color;

  // Sample density toward sun (up and slightly right) for realistic self-shadowing
  float dUp = cloudDensity(p + vec2(r.x * 0.15, r.y * 0.50), c, r, seed, t);
  float occl = clamp((dUp - d) * 1.2 + d * 0.50, 0.0, 1.0);

  vec3 lit = u_cloud * 1.03;
  vec3 shadow = mix(u_cloud * 0.70, sky, 0.30);
  vec3 cloudCol = mix(lit, shadow, occl * 0.75);

  float alpha = smoothstep(0.03, 0.40, d);

  // Silver lining on sunlit cloud rim
  float rim = smoothstep(0.02, 0.14, d) * (1.0 - smoothstep(0.14, 0.38, d));
  cloudCol += rim * 0.14;

  // Atmospheric perspective
  cloudCol = mix(cloudCol, sky, dist * 0.28);
  alpha *= mix(1.0, 0.85, dist);

  return mix(color, cloudCol, alpha);
}

// Horizontal drift across screen with infinite seamless wrap
vec3 cloudPass(vec3 color, vec3 sky, vec2 p, float aspect, float t,
               float spd, float phase, float y, vec2 r, float seed, float dist) {
  float trackWidth = aspect + r.x * 2.5 + 0.6;
  float cx = fract(t * spd + phase) * trackWidth - r.x * 1.25 - 0.3;
  float cy = y + sin(t * 0.08 + phase * 6.2831) * 0.015;
  return shadeCloud(color, sky, p, vec2(cx, cy), r, seed, t, dist);
}

void main() {
  float aspect = max(0.1, u_res.x / u_res.y);
  vec2 p = vec2(v_uv.x * aspect, v_uv.y);
  float t = u_time;

  // Vibrant rich blue sky gradient
  vec3 sky = mix(u_skyBottom, u_skyTop, v_uv.y);
  vec3 color = sky;

  // Soft sun radiance in upper right sky
  vec2 sunPos = vec2(aspect * 0.82, 0.92);
  float sunDist = length(p - sunPos);
  color += vec3(1.0, 0.95, 0.85) * exp(-sunDist * sunDist * 4.0) * 0.20;

  // Delicate high-altitude cirrus wisps
  float cirrusBand = smoothstep(0.60, 0.85, v_uv.y) * (1.0 - smoothstep(0.92, 1.0, v_uv.y));
  if (cirrusBand > 0.01) {
    float streak = fbm(vec2(p.x * 1.5 - t * 0.008, p.y * 14.0));
    float wisp = smoothstep(0.55, 0.82, streak) * cirrusBand;
    color = mix(color, vec3(0.98, 0.98, 1.0), wisp * 0.25);
  }

  // Distinct sculpted cumulus clouds drifting across the blue sky:
  // Cloud 1: Distant upper-right accent cloud
  if (u_count > 3.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.012, 0.85, 0.74, vec2(0.20, 0.09), 43.7, 0.65);
  }

  // Cloud 2: Mid-left accent cloud
  if (u_count > 2.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.015, 0.08, 0.46, vec2(0.25, 0.11), 71.3, 0.45);
  }

  // Cloud 3: Upper-middle graceful cumulus cloud
  if (u_count > 1.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.020, 0.58, 0.68, vec2(0.32, 0.13), 29.9, 0.25);
  }

  // Cloud 4: Majestic, prominent lower-middle cumulus cloud (main hero cloud)
  color = cloudPass(color, sky, p, aspect, t, 0.026, 0.22, 0.26, vec2(0.44, 0.19), 57.2, 0.0);

  gl_FragColor = vec4(color, 1.0);
}
`;

function parseHex(color: string): [number, number, number] {
  const value = color.trim();
  if (value.startsWith("#")) {
    const hex = value.slice(1);
    if (hex.length === 3) {
      return [
        parseInt(hex[0] + hex[0], 16) / 255,
        parseInt(hex[1] + hex[1], 16) / 255,
        parseInt(hex[2] + hex[2], 16) / 255,
      ];
    }
    return [
      parseInt(hex.slice(0, 2), 16) / 255,
      parseInt(hex.slice(2, 4), 16) / 255,
      parseInt(hex.slice(4, 6), 16) / 255,
    ];
  }
  const rgb = value.match(/[\d.]+/g);
  if (rgb && rgb.length >= 3) {
    return [Number(rgb[0]) / 255, Number(rgb[1]) / 255, Number(rgb[2]) / 255];
  }
  return [0.95, 0.95, 0.95];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export const CloudShader = ({
  className,
  children,
  speed = 1.0,
  count = 4,
  cloudColor = "#ffffff",
  skyTopColor = "#1d5fa7",
  skyBottomColor = "#5da8ea",
}: CloudShaderProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paramsRef = useRef({
    speed,
    count,
    cloudColor,
    skyTopColor,
    skyBottomColor,
  });

  paramsRef.current = {
    speed,
    count,
    cloudColor,
    skyTopColor,
    skyBottomColor,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) {
      console.warn("WebGL not supported for CloudShader");
      return;
    }

    const vert = compile(gl, gl.VERTEX_SHADER, VERT);
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.bindAttribLocation(program, 0, "a_pos");
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const loc = {
      res: gl.getUniformLocation(program, "u_res"),
      time: gl.getUniformLocation(program, "u_time"),
      count: gl.getUniformLocation(program, "u_count"),
      cloud: gl.getUniformLocation(program, "u_cloud"),
      skyTop: gl.getUniformLocation(program, "u_skyTop"),
      skyBottom: gl.getUniformLocation(program, "u_skyBottom"),
    };

    let frame = 0;
    let running = true;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth || 800;
      const height = canvas.clientHeight || 500;
      const w = Math.max(1, Math.floor(width * dpr));
      const h = Math.max(1, Math.floor(height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const start = performance.now();
    const draw = (now: number) => {
      if (!running) return;
      gl.useProgram(program);

      const p = paramsRef.current;
      const elapsed = reduceMotion ? 0 : ((now - start) / 1000) * p.speed;
      const cloud = parseHex(p.cloudColor);
      const skyTop = parseHex(p.skyTopColor);
      const skyBottom = parseHex(p.skyBottomColor);

      gl.uniform2f(loc.res, canvas.width, canvas.height);
      gl.uniform1f(loc.time, elapsed);
      gl.uniform1f(loc.count, Math.min(4, Math.max(1, p.count)));
      gl.uniform3f(loc.cloud, cloud[0], cloud[1], cloud[2]);
      gl.uniform3f(loc.skyTop, skyTop[0], skyTop[1], skyTop[2]);
      gl.uniform3f(loc.skyBottom, skyBottom[0], skyBottom[1], skyBottom[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative h-full min-h-80 w-full overflow-hidden",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      {children ? (
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default CloudShader;
