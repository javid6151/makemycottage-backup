import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { HiArrowNarrowRight } from 'react-icons/hi';
import CursorGrid from './CursorGrid';

// Vibrant, ultra-clear high-res imagery of luxury wooden homes, cottages, and timber architecture
const SHOWCASE_CARDS = [
  { id: 1, title: 'Woodland Timber Retreat', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900&auto=format&fit=crop&q=85' },
  { id: 2, title: 'Alpine Pine Cottage', image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=900&auto=format&fit=crop&q=85' },
  { id: 3, title: 'Heritage Farmstead Villa', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=900&auto=format&fit=crop&q=85' },
  { id: 4, title: 'Cedar A-Frame Sanctuary', image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=900&auto=format&fit=crop&q=85' },
  { id: 5, title: 'Lakefront Timber Residence', image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=900&auto=format&fit=crop&q=85' },
  { id: 6, title: 'Eco Resort Wooden Cabin', image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=900&auto=format&fit=crop&q=85' },
  { id: 7, title: 'Prefab Modular Timber Villa', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&auto=format&fit=crop&q=85' },
  { id: 8, title: 'Warm Wood Living Interior', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=85' },
  { id: 9, title: 'Precision Master Joinery', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900&auto=format&fit=crop&q=85' },
  { id: 10, title: 'Forest Log Sanctuary', image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=900&auto=format&fit=crop&q=85' },
  { id: 11, title: 'Glass & Cedar Modern Villa', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&auto=format&fit=crop&q=85' },
  { id: 12, title: 'Timber Structural Framing', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&auto=format&fit=crop&q=85' },
];

/**
 * Creates custom rounded rectangle plane geometry with normalized UVs [0, 1]
 */
function createRoundedPlaneGeometry(width, height, radius, segments = 16) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  const w = width;
  const h = height;
  const r = Math.min(radius, w / 2, h / 2);

  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  const geom = new THREE.ShapeGeometry(shape, segments);
  geom.computeBoundingBox();

  const { min, max } = geom.boundingBox;
  const posAttr = geom.attributes.position;
  const uvArray = new Float32Array(posAttr.count * 2);

  for (let i = 0; i < posAttr.count; i++) {
    const px = posAttr.getX(i);
    const py = posAttr.getY(i);
    uvArray[i * 2] = (px - min.x) / (max.x - min.x);
    uvArray[i * 2 + 1] = (py - min.y) / (max.y - min.y);
  }
  geom.setAttribute('uv', new THREE.BufferAttribute(uvArray, 2));

  return geom;
}

export const CurvedRibbonShowcase = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const canvasParent = canvas.parentElement;
    let width = canvasParent.clientWidth || window.innerWidth;
    let height = canvasParent.clientHeight || 600;

    // 1. Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 16.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;

    // 2. Texture Loader with sRGBColorSpace
    const textureLoader = new THREE.TextureLoader();
    // Calibrated card dimensions for elegant ribbon cascade
    const cardWidth = 2.10;
    const cardHeight = 2.10;
    const cardRadius = 0.40;

    const cardGeometry = createRoundedPlaneGeometry(cardWidth, cardHeight, cardRadius, 16);
    const borderGeometry = createRoundedPlaneGeometry(cardWidth + 0.07, cardHeight + 0.07, cardRadius + 0.035, 16);
    const shadowGeometry = createRoundedPlaneGeometry(cardWidth + 0.14, cardHeight + 0.14, cardRadius + 0.07, 16);

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    const textures = SHOWCASE_CARDS.map((card) => {
      const tex = textureLoader.load(card.image);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.anisotropy = maxAnisotropy;
      return tex;
    });

    // Dedicated White Shade Gradient Texture for ethereal bottom-fade in the trough
    const createWhiteShadeTexture = () => {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 256;
      const ctx = c.getContext('2d');
      const grad = ctx.createLinearGradient(0, 256, 0, 0);
      grad.addColorStop(0.0, 'rgba(255, 255, 255, 0.98)');
      grad.addColorStop(0.32, 'rgba(255, 255, 255, 0.88)');
      grad.addColorStop(0.58, 'rgba(255, 255, 255, 0.50)');
      grad.addColorStop(0.82, 'rgba(255, 255, 255, 0.15)');
      grad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };
    const whiteShadeTexture = createWhiteShadeTexture();

    // 3. Dense Continuous Ribbon Stream (32 cards for uninterrupted flowing ribbon)
    const totalCards = 32;
    const cardMeshes = [];
    const ribbonGroup = new THREE.Group();
    scene.add(ribbonGroup);

    for (let i = 0; i < totalCards; i++) {
      const tex = textures[i % textures.length];

      // White backing plate for crisp card frame
      const borderMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.96,
        side: THREE.DoubleSide,
      });

      // Subtle drop shadow plate for realistic physical layering
      const shadowMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
      });

      // Main photographic image material
      const imgMaterial = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide,
      });

      // White shade overlay material that activates when card dips into the trough
      const whiteShadeMaterial = new THREE.MeshBasicMaterial({
        map: whiteShadeTexture,
        transparent: true,
        opacity: 0.0,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const cardGroup = new THREE.Group();

      const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial);
      shadowMesh.position.set(0.035, -0.05, -0.025);
      cardGroup.add(shadowMesh);

      const borderMesh = new THREE.Mesh(borderGeometry, borderMaterial);
      borderMesh.position.z = -0.01;
      cardGroup.add(borderMesh);

      const imgMesh = new THREE.Mesh(cardGeometry, imgMaterial);
      cardGroup.add(imgMesh);

      const whiteShadeMesh = new THREE.Mesh(cardGeometry, whiteShadeMaterial);
      whiteShadeMesh.position.z = 0.005;
      cardGroup.add(whiteShadeMesh);

      ribbonGroup.add(cardGroup);

      cardMeshes.push({
        group: cardGroup,
        imgMesh,
        borderMesh,
        shadowMesh,
        whiteShadeMesh,
        index: i,
        phase: i / totalCards,
      });
    }

    // 4. Fixed Spatial Sinusoidal Wave Track
    // Matches the reference composition:
    // - Center (X = 0): deep trough dipping gracefully above the headline (Y ~ 0.58)
    // - Left & Right Crests (X ~ ±5.9): rise up to elegant peaks (Y ~ 3.52)
    // - Outer Edges (X > ±6): curve back down towards the margins
    const trackWidth = 34.0;
    const waveK = Math.PI / 5.9; // crest at |x| = 5.9
    const yMid = 2.05;
    const yAmp = 1.47;

    const evaluateFixedTrack = (x) => {
      // Sinusoidal wave: y = yMid - yAmp * cos(k * x)
      const angle = waveK * x;
      const cosVal = Math.cos(angle);
      const sinVal = Math.sin(angle);

      const y = yMid - yAmp * cosVal;

      // Tangent derivative dy/dx = yAmp * k * sin(k * x)
      const dy_dx = yAmp * waveK * sinVal;
      const tiltZ = Math.atan(dy_dx) * 0.82;
      const tiltY = -sinVal * 0.16;

      // 3D Depth arch: center cards bow slightly forward into the room
      const z = Math.cos(angle * 0.5) * 1.2 - 0.2;

      return { y, z, tiltZ, tiltY };
    };

    // 5. Interactive Mouse Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = nx * 0.30;
      targetMouseY = ny * 0.15;
    };

    container.addEventListener('mousemove', onMouseMove, { passive: true });

    // 6. Animation Loop (Continuous smooth flow through the fixed track)
    let animationFrameId;
    let time = 0;
    let lastTimestamp = performance.now();

    const animate = (timestamp) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
      lastTimestamp = timestamp;

      // Smooth horizontal travel speed (slows down gracefully on hover)
      const flowSpeed = isHovered ? 0.022 : 0.046;
      time += delta * flowSpeed;

      // Smooth mouse follow
      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      camera.position.x = currentMouseX;
      camera.position.y = 1.8 + currentMouseY;
      camera.lookAt(0, 1.8, 0);

      // Place cards along the fixed spatial track
      for (let i = 0; i < cardMeshes.length; i++) {
        const item = cardMeshes[i];

        // Progress advances seamlessly in [0, 1)
        const progress = (item.phase + time) % 1.0;
        
        // Horizontal x position across the track (-trackWidth/2 to +trackWidth/2)
        const x = (progress - 0.5) * trackWidth;

        const pt = evaluateFixedTrack(x);

        item.group.position.set(x, pt.y, pt.z);
        item.group.rotation.z = pt.tiltZ;
        item.group.rotation.y = pt.tiltY;
        item.group.rotation.x = -0.04;

        // Subtle scale enhancement for center cards
        const centerProximity = 1.0 - Math.min(1.0, Math.abs(x) / 13.0);
        const cardScale = 0.94 + centerProximity * 0.12;
        item.group.scale.set(cardScale, cardScale, 1);

        // Soft horizontal fade near outer track edges so cards enter and exit seamlessly
        const absX = Math.abs(x);
        let alpha = 1.0;
        if (absX > 10.2) {
          alpha = Math.max(0, 1.0 - (absX - 10.2) / 3.4);
        }

        // White Shade effect in the trough:
        // When cards dip below Y = 2.1 toward the trough (Y = 0.58), the white shade appears
        const troughDepth = Math.max(0, Math.min(1.0, (2.1 - pt.y) / (2.1 - 0.58)));
        const whiteShadeIntensity = Math.pow(troughDepth, 1.15) * 0.92;

        item.imgMesh.material.opacity = alpha * (1.0 - whiteShadeIntensity * 0.15);
        item.whiteShadeMesh.material.opacity = alpha * whiteShadeIntensity;
        item.borderMesh.material.opacity = alpha * (0.96 - whiteShadeIntensity * 0.20);
        item.shadowMesh.material.opacity = alpha * (0.12 - whiteShadeIntensity * 0.07);
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 7. Responsive Resize Handler
    const handleResize = () => {
      if (!canvasParent) return;
      width = canvasParent.clientWidth || window.innerWidth;
      height = canvasParent.clientHeight || 600;
      camera.aspect = width / height;
      camera.fov = width < 768 ? 44 : 35;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      cardGeometry.dispose();
      borderGeometry.dispose();
      shadowGeometry.dispose();
      whiteShadeTexture.dispose();
      textures.forEach((t) => t.dispose());
      cardMeshes.forEach((c) => {
        c.imgMesh.material.dispose();
        c.borderMesh.material.dispose();
        c.shadowMesh.material.dispose();
        c.whiteShadeMesh.material.dispose();
      });
    };
  }, [isHovered]);

  return (
    <section 
      id="ribbon-showcase"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-[960px] lg:min-h-[1020px] bg-[#fbfbfa] text-[#141517] flex flex-col items-center justify-start overflow-hidden pt-12 sm:pt-16 pb-24 sm:pb-32 border-t border-[#e3e3de]"
    >
      {/* 1. Interactive CursorGrid Background */}
      <div className="absolute inset-0 z-0">
        <CursorGrid
          cellSize={64}
          color="#141517"
          radius={160}
          falloff="smooth"
          holdTime={350}
          fadeDuration={700}
          lineWidth={1.0}
          maxOpacity={0.12}
          fillOpacity={0.03}
          gridOpacity={0.03}
          cellRadius={4}
          clickPulse={true}
          pulseSpeed={600}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* 2. Three.js Curved Ribbon of Floating 3D Cards with Generous Edge Margins & Side Masks */}
      <div 
        className="absolute top-10 sm:top-14 md:top-16 left-0 w-full h-[580px] sm:h-[620px] md:h-[660px] pointer-events-none z-10"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>

      {/* 2b. Luminous White Shade Mist Layer kissing the bottom of the dipped cards */}
      <div 
        className="absolute left-0 right-0 top-[280px] sm:top-[310px] md:top-[330px] h-[190px] sm:h-[220px] pointer-events-none z-15"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(251,251,250,0.35) 40%, rgba(251,251,250,0.92) 80%, #fbfbfa 100%)',
        }}
      />

      {/* 3. Foreground Editorial Content & Headline */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center mt-[370px] sm:mt-[400px] md:mt-[430px]">
        {/* Big Editorial Headline */}
        <h2 className="font-heading font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-normal tracking-tight text-[#141517] leading-[1.0] mb-6">
          The picture in your head,<br />by lunch.
        </h2>

        {/* Subtitle */}
        <p className="font-body text-sm sm:text-base md:text-lg text-[#666] font-light max-w-xl mx-auto leading-relaxed mb-10">
          Start on the free plan, bring a real brief, and see the first take.
        </p>

        {/* CTA Button Duo */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#141517] text-white hover:bg-black text-sm font-medium tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group cursor-pointer"
          >
            <span>Start creating for free</span>
            <HiArrowNarrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>

          <Link
            to="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-white border border-[#e3e3de] text-[#141517] hover:bg-[#f3f2ef] hover:border-[#d4d4d0] text-sm font-medium tracking-wide shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            See plans
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CurvedRibbonShowcase;
