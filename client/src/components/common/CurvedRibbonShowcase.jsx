import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { HiArrowNarrowRight, HiSparkles } from 'react-icons/hi';
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
  { id: 13, title: 'Hilltop Cottage Haven', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&auto=format&fit=crop&q=85' },
  { id: 14, title: 'Scandinavian Wood Haven', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&auto=format&fit=crop&q=85' },
];

/**
 * Creates rounded rectangle geometry with normalized UVs [0, 1]
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

  // Compute exact normalized UVs [0, 1] for distortion-free textures
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

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 16.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping; // Preserve exact image contrast & colors without washout

    // 2. Texture Loader with sRGBColorSpace for pristine, vibrant clarity
    const textureLoader = new THREE.TextureLoader();
    const cardWidth = 2.45;
    const cardHeight = 2.45;
    const cardRadius = 0.45;

    const cardGeometry = createRoundedPlaneGeometry(cardWidth, cardHeight, cardRadius, 16);
    const borderGeometry = createRoundedPlaneGeometry(cardWidth + 0.08, cardHeight + 0.08, cardRadius + 0.04, 16);

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

    // 3. Dense Card Stream (28 cards for distinct, perfectly separated cascading ribbon)
    const totalCards = 28;
    const cardMeshes = [];
    const ribbonGroup = new THREE.Group();
    scene.add(ribbonGroup);

    const borderMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
    });

    for (let i = 0; i < totalCards; i++) {
      const tex = textures[i % textures.length];

      // MeshBasicMaterial gives 100% faithful, razor-sharp photographic reproduction
      const imgMaterial = new THREE.MeshBasicMaterial({
        map: tex,
        side: THREE.DoubleSide,
      });

      const cardGroup = new THREE.Group();

      // Backing / border plate for crisp separation when cards overlap
      const borderMesh = new THREE.Mesh(borderGeometry, borderMaterial);
      borderMesh.position.z = -0.01;
      cardGroup.add(borderMesh);

      // Main image mesh
      const imgMesh = new THREE.Mesh(cardGeometry, imgMaterial);
      cardGroup.add(imgMesh);

      ribbonGroup.add(cardGroup);

      cardMeshes.push({
        group: cardGroup,
        index: i,
        phase: i / totalCards,
      });
    }

    // 4. Fixed Spatial Curve Function (Matches Exact Arc Ribbon from Screenshot)
    // The curve is anchored to the screen:
    // Left: high crest (~7.0)
    // Center: graceful dip trough (~1.8) dipping just above the headline
    // Right: high crest (~7.0)
    const trackWidth = 32.0;

    const evaluateFixedTrack = (x) => {
      const absX = Math.abs(x);
      
      // Fixed spatial curve: center trough at x = 0, rising up on left & right
      const waveFreq = 0.22;
      const angle = Math.min(Math.PI, absX * waveFreq);
      
      // Smooth cosine valley: lowest at x = 0, highest at |x| >= 14
      const troughY = 1.6;
      const crestHeight = 5.2;
      const y = troughY + (1.0 - Math.cos(angle)) * 0.5 * crestHeight;

      // Derivative for accurate tangent tilt
      const dy_dx = Math.sign(x) * 0.5 * crestHeight * waveFreq * Math.sin(angle);
      const tiltZ = Math.atan(dy_dx) * 0.78;
      const tiltY = -Math.sign(x) * Math.sin(angle) * 0.18;

      // Z-depth: center cards push slightly forward for layered 3D depth
      const z = (1.0 - (absX / 16.0)) * 1.5 - 0.4;

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
      targetMouseX = nx * 0.35;
      targetMouseY = ny * 0.2;
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

      // Smooth horizontal travel speed
      const flowSpeed = isHovered ? 0.025 : 0.052;
      time += delta * flowSpeed;

      // Smooth mouse follow
      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      camera.position.x = currentMouseX;
      camera.position.y = 2.4 + currentMouseY;
      camera.lookAt(0, 2.4, 0);

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
        const centerProximity = 1.0 - Math.min(1.0, Math.abs(x) / 14.0);
        const cardScale = 0.94 + centerProximity * 0.14;
        item.group.scale.set(cardScale, cardScale, 1);
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 7. Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      camera.aspect = width / height;
      camera.fov = width < 768 ? 46 : 36;
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
      borderMaterial.dispose();
      textures.forEach((t) => t.dispose());
      cardMeshes.forEach((c) => {
        c.group.children.forEach((child) => child.material?.dispose());
      });
    };
  }, [isHovered]);

  return (
    <section 
      id="ribbon-showcase"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-[920px] lg:min-h-[980px] bg-[#fbfbfa] text-[#141517] flex flex-col items-center justify-start overflow-hidden pt-4 pb-24 sm:pb-32 border-t border-[#e3e3de]"
    >
      {/* 1. Interactive CursorGrid Background + Subtle Dot Pattern */}
      <div className="absolute inset-0 z-0">
        <CursorGrid
          cellSize={64}
          color="#141517"
          radius={150}
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

      {/* 2. Three.js Curved Ribbon of Floating 3D Cards */}
      <div 
        className="absolute top-0 left-0 w-full h-[520px] sm:h-[560px] pointer-events-none z-10"
      >
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>

      {/* 3. Foreground Editorial Content & Headline (Exact styling from Screenshot) */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center mt-[360px] sm:mt-[380px] md:mt-[400px]">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e3e3de] text-xs font-semibold text-[#141517] mb-6 shadow-sm">
          <HiSparkles className="w-3.5 h-3.5 text-[#ff4b18]" />
          <span>Bespoke Architecture &amp; Prefab Timber</span>
        </div>

        {/* Big Editorial Headline */}
        <h2 className="font-heading font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-normal tracking-tight text-[#141517] leading-[1.0] mb-6">
          The picture in your head,<br />by lunch.
        </h2>

        {/* Subtitle */}
        <p className="font-body text-sm sm:text-base md:text-lg text-[#666] font-light max-w-xl mx-auto leading-relaxed mb-10">
          Start on your dream plan, bring a real brief, and see your custom timber sanctuary designed with master craftsmanship. No hassle needed.
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
