import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowNarrowRight, HiX, HiExternalLink, HiPlay } from 'react-icons/hi';
import { FaInstagram } from 'react-icons/fa';
import { BUSINESS_INFO } from '../../utils/constants';

// High-definition Instagram reels and photography from Make My Cottage
const INSTAGRAM_ITEMS = [
  {
    id: 1,
    type: 'video',
    title: 'On-Site Heavy Timber Post & Beam Assembly',
    caption: 'Precision interlocking mortise-and-tenon joints going up on-site in Shamshabad. 100% vacuum-pressure treated pine.',
    views: '24.8K',
    likes: '1.9K',
    location: 'Shamshabad, Hyderabad',
    videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
    poster: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=1600&auto=format&fit=crop&q=85',
    link: 'https://www.instagram.com/makemycottageinfrapvtltd/',
  },
  {
    id: 2,
    type: 'image',
    title: 'Sunset Hues on Cedar Verandah Cladding',
    caption: 'Sunset hitting the hand-rubbed cedar cladding of our Chevella farmstead project. Natural thermal efficiency in full view.',
    views: '18.2K',
    likes: '1.4K',
    location: 'Chevella, Telangana',
    poster: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&h=1600&auto=format&fit=crop&q=85',
    link: 'https://www.instagram.com/makemycottageinfrapvtltd/',
  },
  {
    id: 3,
    type: 'video',
    title: 'Morning Mist Around Ananthagiri Pine Cabin',
    caption: 'Highland morning mist surrounding the Pine Valley A-Frame retreat build in Ananthagiri Hills.',
    views: '42.5K',
    likes: '3.8K',
    location: 'Ananthagiri Hills, Vikarabad',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&h=1600&auto=format&fit=crop&q=85',
    link: 'https://www.instagram.com/makemycottageinfrapvtltd/',
  },
  {
    id: 4,
    type: 'image',
    title: 'Lakeside Timber Deck & Pergola Walkthrough',
    caption: 'Custom composite-timber waterfront deck installation in progress at Shamirpet. Built to withstand Indian monsoons.',
    views: '15.6K',
    likes: '1.1K',
    location: 'Shamirpet, Hyderabad',
    poster: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1200&h=1600&auto=format&fit=crop&q=85',
    link: 'https://www.instagram.com/makemycottageinfrapvtltd/',
  },
  {
    id: 5,
    type: 'image',
    title: 'Completed Luxury Resort Wooden Cottages',
    caption: 'Completed modular wooden cottage units ready for luxury hospitality handover. Prefabricated in 45 days.',
    views: '38.1K',
    likes: '2.9K',
    location: 'Nagarjuna Sagar',
    poster: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=1200&h=1600&auto=format&fit=crop&q=85',
    link: 'https://www.instagram.com/makemycottageinfrapvtltd/',
  },
  {
    id: 6,
    type: 'video',
    title: 'Modular Prefab Villa Assembly Timelapse',
    caption: 'Modular prefabricated timber assembly achieved in just 45 days. Watch how precision joinery slots together seamlessly.',
    views: '56.3K',
    likes: '4.7K',
    location: 'Vikarabad, Telangana',
    videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
    poster: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=1600&auto=format&fit=crop&q=85',
    link: 'https://www.instagram.com/makemycottageinfrapvtltd/',
  },
  {
    id: 7,
    type: 'image',
    title: 'Nordic Alpine Chalet Architecture & Living',
    caption: 'High-ceiling Canadian spruce timber cottage. Natural thermal insulation keeps it 8° cooler in peak summer.',
    views: '29.7K',
    likes: '2.2K',
    location: 'Experience Center, Shamshabad',
    poster: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&h=1600&auto=format&fit=crop&q=85',
    link: 'https://www.instagram.com/makemycottageinfrapvtltd/',
  },
  {
    id: 8,
    type: 'image',
    title: 'Master Carpentry & Ceiling Beam Detailing',
    caption: 'Handcrafted mortise and tenon timber roof truss joinery. Master carpentry perfected across decades.',
    views: '21.4K',
    likes: '1.7K',
    location: 'Workshop, Shamshabad',
    poster: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&h=1600&auto=format&fit=crop&q=85',
    link: 'https://www.instagram.com/makemycottageinfrapvtltd/',
  },
];

export const InstagramCurvedSection = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [selectedReel, setSelectedReel] = useState(null);

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
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    // 4. Texture & Video Loader
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');

    const videoElements = [];
    const textures = INSTAGRAM_ITEMS.map((item) => {
      if (item.type === 'video' && item.videoUrl) {
        try {
          const video = document.createElement('video');
          video.src = item.videoUrl;
          video.crossOrigin = 'anonymous';
          video.loop = true;
          video.muted = true;
          video.playsInline = true;
          video.setAttribute('playsinline', '');
          video.setAttribute('webkit-playsinline', '');
          video.autoplay = true;
          video.play().catch(() => {});
          videoElements.push(video);

          const tex = new THREE.VideoTexture(video);
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.generateMipmaps = false;
          return tex;
        } catch (e) {
          const fallback = textureLoader.load(item.poster);
          fallback.minFilter = THREE.LinearFilter;
          return fallback;
        }
      }

      const imgTex = textureLoader.load(item.poster);
      imgTex.minFilter = THREE.LinearFilter;
      imgTex.generateMipmaps = false;
      return imgTex;
    });

    // 5. 3D Cylindrical Geometry matching the About Us CurvedSlider
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
      uniform float uIsVideo;

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

        // Subtle gradient vignette on bottom for reel aesthetic
        float bottomGrad = smoothstep(0.35, 0.0, vUv.y) * 0.40;
        color.rgb = mix(color.rgb, color.rgb * 0.4, bottomGrad);

        gl_FragColor = color;
      }
    `;

    const meshes = [];
    for (let i = 0; i < numMeshes; i++) {
      const item = INSTAGRAM_ITEMS[i % INSTAGRAM_ITEMS.length];
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: textures[i % textures.length] },
          uRadius: { value: radius },
          uIsVideo: { value: item.type === 'video' ? 1.0 : 0.0 },
        },
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData = { reelIndex: i % INSTAGRAM_ITEMS.length };
      scene.add(mesh);
      meshes.push(mesh);
    }

    // 7. Mouse & Touch Drag Controls with Click Detection
    const mouse = {
      x: 0,
      y: 0,
      startX: 0,
      prevX: 0,
      isDown: false,
      hasDragged: false,
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
      mouse.startX = e.clientX;
      mouse.prevX = e.clientX;
      mouse.hasDragged = false;
      autoSlide.enabled = false;
    };

    const onMouseMove = (e) => {
      if (!mouse.isDown) return;
      const deltaX = e.clientX - mouse.prevX;
      if (Math.abs(e.clientX - mouse.startX) > 8) {
        mouse.hasDragged = true;
      }
      targetX += deltaX * 0.007;
      mouse.prevX = e.clientX;
    };

    const onMouseUp = (e) => {
      if (mouse.isDown && !mouse.hasDragged) {
        // Raycast click on 3D card
        const rect = canvas.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);
        const intersects = raycaster.intersectObjects(meshes);
        if (intersects.length > 0) {
          const itemIdx = intersects[0].object.userData.reelIndex;
          if (itemIdx !== undefined && INSTAGRAM_ITEMS[itemIdx]) {
            setSelectedReel(INSTAGRAM_ITEMS[itemIdx]);
          }
        }
      }

      mouse.isDown = false;
      setTimeout(() => {
        autoSlide.enabled = true;
      }, 1200);
    };

    const onTouchStart = (e) => {
      mouse.isDown = true;
      mouse.startX = e.touches[0].clientX;
      mouse.prevX = e.touches[0].clientX;
      mouse.hasDragged = false;
      autoSlide.enabled = false;
    };

    const onTouchMove = (e) => {
      if (!mouse.isDown) return;
      const deltaX = e.touches[0].clientX - mouse.prevX;
      if (Math.abs(e.touches[0].clientX - mouse.startX) > 8) {
        mouse.hasDragged = true;
      }
      targetX += deltaX * 0.007;
      mouse.prevX = e.touches[0].clientX;
    };

    const onTouchEnd = (e) => {
      if (mouse.isDown && !mouse.hasDragged && e.changedTouches?.length > 0) {
        const touch = e.changedTouches[0];
        const rect = canvas.getBoundingClientRect();
        const nx = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);
        const intersects = raycaster.intersectObjects(meshes);
        if (intersects.length > 0) {
          const itemIdx = intersects[0].object.userData.reelIndex;
          if (itemIdx !== undefined && INSTAGRAM_ITEMS[itemIdx]) {
            setSelectedReel(INSTAGRAM_ITEMS[itemIdx]);
          }
        }
      }

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

    // 8. Responsive Resize
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

      videoElements.forEach((v) => {
        v.pause();
        v.src = '';
        v.load();
      });

      meshes.forEach((m) => {
        m.geometry.dispose();
        m.material.dispose();
      });
      textures.forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto border-t border-[#e3e3de] overflow-hidden">
      {/* 1. Header (Exact Match to Bildora & MMC Layout) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
        <div>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#141517] text-white border border-white/10 text-[11px] font-medium uppercase tracking-[0.2em] shadow-md mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff4b18] shadow-[0_0_8px_rgba(255,75,24,0.8)]" />
            <span>Follow The Journey</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl text-[#141517] uppercase leading-[0.95]">
            On Site &amp; Instagram.
          </h2>
          <p className="text-sm sm:text-base text-[#666] font-light mt-3 max-w-xl">
            See our latest wooden builds, framing stages, and behind-the-scenes video reels.
          </p>
        </div>

        <a
          href={BUSINESS_INFO.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#141517] text-white hover:bg-black text-xs uppercase tracking-widest font-semibold transition-all duration-300 self-start md:self-auto shadow-md group cursor-pointer"
        >
          <FaInstagram className="w-4 h-4 text-[#ff4b18]" />
          <span>Follow {BUSINESS_INFO.social.instagramHandle}</span>
          <HiArrowNarrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>

      {/* 2. Interactive 3D Cylindrical Perspective Carousel Slider with Live Videos & Images */}
      <div className="relative w-full">
        <div 
          ref={containerRef} 
          className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[320px] sm:h-[370px] md:h-[420px] lg:h-[450px] flex items-center justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing"
        >
          <canvas ref={canvasRef} className="block w-full h-full" />
        </div>

        {/* Drag Hint */}
        <div className="flex items-center justify-center gap-2 mt-2 text-xs text-[#888] font-light uppercase tracking-widest">
          <span>&larr; Drag to explore site reels &amp; builds &rarr;</span>
        </div>
      </div>

      {/* 3. Interactive Reel / Video Preview Modal */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedReel(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141517] text-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-white/10 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedReel(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close"
              >
                <HiX className="w-5 h-5" />
              </button>

              {/* Media Container */}
              <div className="relative aspect-[9/16] max-h-[60vh] w-full bg-black flex items-center justify-center overflow-hidden">
                {selectedReel.type === 'video' && selectedReel.videoUrl ? (
                  <video
                    src={selectedReel.videoUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={selectedReel.poster}
                    alt={selectedReel.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Reel Info */}
              <div className="p-6">
                <div className="flex items-center justify-between gap-3 mb-2 text-xs text-white/70">
                  <span className="flex items-center gap-1.5 font-medium text-accent-terracotta">
                    <FaInstagram className="w-3.5 h-3.5" />
                    <span>{selectedReel.location}</span>
                  </span>
                  <span>{selectedReel.views} views</span>
                </div>

                <h3 className="font-heading text-lg font-semibold text-white mb-2">
                  {selectedReel.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-6">
                  {selectedReel.caption}
                </p>

                <a
                  href={selectedReel.link || BUSINESS_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#ff4b18] to-[#f53803] hover:brightness-110 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <FaInstagram className="w-4 h-4" />
                  <span>View on Instagram (@makemycottageinfrapvtltd)</span>
                  <HiExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InstagramCurvedSection;
