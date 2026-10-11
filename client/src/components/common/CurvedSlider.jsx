import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const DEFAULT_SLIDER_IMAGES = [
  'https://framerusercontent.com/images/5e2PRqfiR0GkpyCY3atvlPSeQ.jpg',
  'https://framerusercontent.com/images/MYmdhDGEe2D4fRHyWEaBmO1tms.jpg',
  'https://framerusercontent.com/images/g08gQShcLnWaRDc7aCIRYsWxo.jpg',
  'https://framerusercontent.com/images/RAjSlrNzr4UegdX8R3PMn3IlgX0.jpg',
  'https://framerusercontent.com/images/hljBRUPFdB1QAjBLOT2qb9hbsAI.jpg',
  'https://framerusercontent.com/images/gbfrMQ8OuM7DaGaIoR5quFax5Gk.jpg',
  'https://framerusercontent.com/images/km6CGX5VeLEEoW39ZIcGbhw8nfA.jpg',
  'https://framerusercontent.com/images/MYmdhDGEe2D4fRHyWEaBmO1tms.jpg',
];

const CurvedSlider = ({ images = DEFAULT_SLIDER_IMAGES }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = window.innerWidth;
    let height = container.clientHeight || 480;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera with responsive horizontal lock (always spans 100% of window screen)
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 30);
    camera.position.z = 5.2;

    const updateCameraFov = (w, h) => {
      const aspect = w / h;
      // 1.76 locks horizontal span across all aspect ratios so leftmost and rightmost cards bleed off screen edges
      const targetTan = 1.76 / aspect;
      camera.fov = (2 * Math.atan(targetTan) * 180) / Math.PI;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    };

    updateCameraFov(width, height);

    // 3. Renderer with transparent background
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    // 4. Texture Loader with crossOrigin
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');
    const textures = images.map((url) => {
      const tex = textureLoader.load(url);
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      return tex;
    });

    // 5. Geometry & Curve Settings: 3D globe cylindrical curvature matching screenshot
    const planeWidth = 1.55;
    const planeHeight = 2.2;
    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 36, 1);

    const numVisible = 8;
    const radius = 4.8;
    const arcSpread = 0.70 * Math.PI;
    const angleStep = arcSpread / (numVisible - 1);
    const numMeshes = 32;
    const centerIndex = Math.floor(numMeshes / 2);

    // 6. Shader Material with Card Curvature and Rounded Corners
    const vertexShader = `
      varying vec2 vUv;
      uniform float uRadius;
      void main() {
        vUv = uv;
        vec3 p = position;
        float theta = p.x / uRadius;
        float c = cos(theta);
        float s = sin(theta);
        vec3 curvedPosition = vec3(
          uRadius * s,
          p.y,
          uRadius * (1.0 - c)
        );
        gl_Position = projectionMatrix * modelViewMatrix * vec4(curvedPosition, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      uniform sampler2D uTexture;

      // Rounded rectangle SDF for smooth rounded card corners
      float roundedBox(vec2 p, vec2 b, float r) {
        vec2 q = abs(p) - b + r;
        return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
      }

      void main() {
        vec4 color = texture2D(uTexture, vUv);
        // Correct for plane aspect ratio (1.55 / 2.2 = 0.705)
        vec2 p = (vUv - 0.5) * vec2(0.705, 1.0) * 2.0;
        float d = roundedBox(p, vec2(0.705 - 0.075, 1.0 - 0.075), 0.075);
        if (d > 0.0) discard;
        gl_FragColor = color;
      }
    `;

    const meshes = [];
    for (let i = 0; i < numMeshes; i++) {
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: textures[i % textures.length] },
          uRadius: { value: radius },
        },
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      meshes.push(mesh);
    }

    // 7. Mouse & Touch Drag Controls
    const mouse = {
      x: 0,
      y: 0,
      prevX: 0,
      isDown: false,
    };

    const autoSlide = {
      enabled: true,
      speed: 0.35,
      range: 2.8,
      direction: 1,
      pauseTime: 1800,
      isPaused: false,
      pauseStartTime: 0,
    };

    let targetX = 0;
    let currentX = 0;
    const ease = 0.06;

    const onMouseDown = (e) => {
      mouse.isDown = true;
      mouse.prevX = e.clientX;
      autoSlide.enabled = false;
    };

    const onMouseMove = (e) => {
      if (!mouse.isDown) return;
      const deltaX = e.clientX - mouse.prevX;
      targetX += deltaX * 0.007;
      mouse.prevX = e.clientX;
    };

    const onMouseUp = () => {
      mouse.isDown = false;
      setTimeout(() => {
        autoSlide.enabled = true;
      }, 1200);
    };

    const onTouchStart = (e) => {
      mouse.isDown = true;
      mouse.prevX = e.touches[0].clientX;
      autoSlide.enabled = false;
    };

    const onTouchMove = (e) => {
      if (!mouse.isDown) return;
      const deltaX = e.touches[0].clientX - mouse.prevX;
      targetX += deltaX * 0.007;
      mouse.prevX = e.touches[0].clientX;
    };

    const onTouchEnd = () => {
      mouse.isDown = false;
      setTimeout(() => {
        autoSlide.enabled = true;
      }, 1200);
    };

    const el = container;
    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd);

    // 8. Resize Listener
    const onResize = () => {
      if (!container) return;
      width = window.innerWidth;
      height = container.clientHeight || 480;

      updateCameraFov(width, height);

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', onResize);

    // 9. Animation Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (autoSlide.enabled && !mouse.isDown) {
        if (autoSlide.isPaused) {
          if (Date.now() - autoSlide.pauseStartTime >= autoSlide.pauseTime) {
            autoSlide.isPaused = false;
          }
        } else {
          targetX += autoSlide.speed * autoSlide.direction * 0.008;
          if (Math.abs(targetX) >= autoSlide.range) {
            autoSlide.direction *= -1;
            autoSlide.isPaused = true;
            autoSlide.pauseStartTime = Date.now();
          }
        }
      } else if (!mouse.isDown) {
        targetX *= 0.98;
      }

      currentX += (targetX - currentX) * ease;

      for (let i = 0; i < meshes.length; i++) {
        const offset = i - centerIndex + currentX;
        const angle = offset * angleStep;

        if (Math.abs(offset) > 4.2) {
          meshes[i].visible = false;
          continue;
        } else {
          meshes[i].visible = true;
        }

        meshes[i].position.x = radius * Math.sin(angle);
        meshes[i].position.z = radius * (1 - Math.cos(angle));
        meshes[i].position.y = 0.05;

        meshes[i].lookAt(camera.position.x, meshes[i].position.y, camera.position.z);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);

      meshes.forEach((m) => {
        m.geometry.dispose();
        m.material.dispose();
      });
      textures.forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, [images]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[290px] sm:h-[340px] md:h-[380px] lg:h-[410px] -mt-2 sm:-mt-4 md:-mt-6 flex items-center justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default CurvedSlider;
