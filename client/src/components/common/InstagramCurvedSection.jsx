import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowNarrowRight, HiX, HiExternalLink, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { BUSINESS_INFO } from '../../utils/constants';

// 14 Alternating Media Items: Instagram Reels & YouTube Videos
export const CURVED_MEDIA_ITEMS = [
  // 1. Instagram Reel
  {
    id: 1,
    platform: 'instagram',
    type: 'reel',
    title: 'On-Site Heavy Timber Framing & Craftsmanship',
    caption: 'Precision interlocking mortise-and-tenon joints going up on-site in Shamshabad. 100% vacuum-pressure treated pine.',
    views: '32.4K',
    likes: '2.6K',
    location: 'Shamshabad, Hyderabad',
    reelId: 'DCrAQP0zvh1',
    url: 'https://www.instagram.com/reel/DCrAQP0zvh1/',
    embedUrl: 'https://www.instagram.com/reel/DCrAQP0zvh1/embed/',
    poster: '/reels/reel-1.jpg',
  },
  // 2. YouTube Video
  {
    id: 2,
    platform: 'youtube',
    type: 'video',
    title: 'Film Nagar Project Making Video Part - 1',
    caption: 'Makmycottage Film Nagar Project Making Video Part -1 || Wooden Home Builders || #woodenhome',
    views: '45.1K',
    likes: '3.2K',
    location: 'Film Nagar, Hyderabad',
    videoId: 'tdq5MfOGj1k',
    url: 'https://youtu.be/tdq5MfOGj1k',
    embedUrl: 'https://www.youtube.com/embed/tdq5MfOGj1k?autoplay=1&mute=0&controls=1&rel=0&playsinline=1',
    poster: '/reels/yt-1.jpg',
  },
  // 3. Instagram Reel
  {
    id: 3,
    platform: 'instagram',
    type: 'reel',
    title: 'Architectural Timber Siding & Roof Joinery',
    caption: 'Sunset hitting the hand-rubbed cedar cladding of our Chevella farmstead project. Natural thermal efficiency in full view.',
    views: '28.9K',
    likes: '2.1K',
    location: 'Chevella, Telangana',
    reelId: 'DS2oLBXke0c',
    url: 'https://www.instagram.com/reel/DS2oLBXke0c/',
    embedUrl: 'https://www.instagram.com/reel/DS2oLBXke0c/embed/',
    poster: '/reels/reel-2.jpg',
  },
  // 4. YouTube Short
  {
    id: 4,
    platform: 'youtube',
    type: 'short',
    title: 'ఇంటి అందం మొత్తం కారిడార్లోనే ఉంది.. Corridor Aesthetics',
    caption: 'ఇంటి అందం మొత్తం కారిడార్లోనే ఉంది.. #home #homedesign #viralshorts #abngruhajyothy',
    views: '82.3K',
    likes: '6.4K',
    location: 'Hyderabad, Telangana',
    videoId: 'EPC0g2MIZBA',
    url: 'https://youtube.com/shorts/EPC0g2MIZBA',
    embedUrl: 'https://www.youtube.com/embed/EPC0g2MIZBA?autoplay=1&mute=0&controls=1&rel=0&playsinline=1',
    poster: '/reels/yt-2.jpg',
  },
  // 5. Instagram Reel
  {
    id: 5,
    platform: 'instagram',
    type: 'reel',
    title: 'Handcrafted Wooden Columns & Verandah Detailing',
    caption: 'Classic verandah pillars and artisan wood craftsmanship for luxury farmhouse cottages.',
    views: '34.7K',
    likes: '2.8K',
    location: 'Vikarabad, Telangana',
    reelId: 'DS2oLBXke0c',
    url: 'https://www.instagram.com/reel/DS2oLBXke0c/',
    embedUrl: 'https://www.instagram.com/reel/DS2oLBXke0c/embed/',
    poster: '/reels/reel-2.jpg',
  },
  // 6. YouTube Video
  {
    id: 6,
    platform: 'youtube',
    type: 'video',
    title: 'చెట్టినాడ్ శైలి ఒక వైపు..ఇంగ్లీష్ ఎంట్రీ ఒకవైపు.. | One House, Two Doors',
    caption: 'చెట్టినాడ్ శైలి ఒక వైపు..ఇంగ్లీష్ ఎంట్రీ ఒకవైపు..| One House, Two Doors | Wooden House | ABN Digital',
    views: '64.0K',
    likes: '4.9K',
    location: 'Chettinad & English Style Cottage',
    videoId: 'ajJKAf4a4w0',
    url: 'https://youtu.be/ajJKAf4a4w0',
    embedUrl: 'https://www.youtube.com/embed/ajJKAf4a4w0?autoplay=1&mute=0&controls=1&rel=0&playsinline=1',
    poster: '/reels/yt-3.jpg',
  },
  // 7. Instagram Reel
  {
    id: 7,
    platform: 'instagram',
    type: 'reel',
    title: 'Precision Pine Wood Joinery & Prefab Assembly',
    caption: 'Fast-track modular assembly with interlocking Scandinavian timber joinery at Shamirpet.',
    views: '41.2K',
    likes: '3.4K',
    location: 'Shamirpet, Hyderabad',
    reelId: 'DQauKRvD5_Q',
    url: 'https://www.instagram.com/reel/DQauKRvD5_Q/',
    embedUrl: 'https://www.instagram.com/reel/DQauKRvD5_Q/embed/',
    poster: '/reels/reel-3.jpg',
  },
  // 8. YouTube Short
  {
    id: 8,
    platform: 'youtube',
    type: 'short',
    title: 'ఇది కేవలం టేబుల్ కాదు.. నవ్వులు పంచుకునే ప్రదేశం | Handcrafted Living',
    caption: 'ఇది కేవలం టేబుల్ కాదు.. నవ్వులు పంచుకునే ప్రదేశం | #woodenhouse #shorts #abnshorts #abngruhajyothy',
    views: '51.8K',
    likes: '4.1K',
    location: 'Hyderabad, Telangana',
    videoId: 'a0EGCiFeeKM',
    url: 'https://youtube.com/shorts/a0EGCiFeeKM',
    embedUrl: 'https://www.youtube.com/embed/a0EGCiFeeKM?autoplay=1&mute=0&controls=1&rel=0&playsinline=1',
    poster: '/reels/yt-4.jpg',
  },
  // 9. Instagram Reel
  {
    id: 9,
    platform: 'instagram',
    type: 'reel',
    title: 'Luxury Wooden Cottage Living Experience',
    caption: 'Step inside our bespoke resort cottage with vaulted high wood ceilings and ambient natural lighting.',
    views: '39.5K',
    likes: '3.1K',
    location: 'Ananthagiri Hills',
    reelId: 'DNLZc59TRdf',
    url: 'https://www.instagram.com/reel/DNLZc59TRdf/',
    embedUrl: 'https://www.instagram.com/reel/DNLZc59TRdf/embed/',
    poster: '/reels/reel-4.jpg',
  },
  // 10. YouTube Video
  {
    id: 10,
    platform: 'youtube',
    type: 'video',
    title: 'గతంలోకి తీసుకెళ్లే మండువా లోగిలి ప్రకృతికి దగ్గరగా.. | Traditional Manduva',
    caption: 'గతంలోకి తీసుకెళ్లే మండువా లోగిలి ప్రకృతికి దగ్గరగా.. | Wooden House | Peaceful House Nature | ABN',
    views: '73.4K',
    likes: '5.8K',
    location: 'Manduva Courtyard Cottage',
    videoId: 'feLxcihSFJQ',
    url: 'https://youtu.be/feLxcihSFJQ',
    embedUrl: 'https://www.youtube.com/embed/feLxcihSFJQ?autoplay=1&mute=0&controls=1&rel=0&playsinline=1',
    poster: '/reels/yt-5.jpg',
  },
  // 11. Instagram Reel
  {
    id: 11,
    platform: 'instagram',
    type: 'reel',
    title: 'Sustainable Treated Pine Cabin Construction',
    caption: 'Eco-friendly vacuum pressure treated pine that naturally resists termites, moisture, and summer heat.',
    views: '26.1K',
    likes: '2.0K',
    location: 'Nagarjuna Sagar',
    reelId: 'DLNYTBsz39-',
    url: 'https://www.instagram.com/reel/DLNYTBsz39-/',
    embedUrl: 'https://www.instagram.com/reel/DLNYTBsz39-/embed/',
    poster: '/reels/reel-5.jpg',
  },
  // 12. YouTube Video
  {
    id: 12,
    platform: 'youtube',
    type: 'video',
    title: 'Woodhouse Specials : పాతకాలపు మండువా.. కొత్తగా తిరిగొచ్చింది! Lifestyle Home',
    caption: 'Woodhouse Specials : పాతకాలపు మండువా.. కొత్తగా తిరిగొచ్చింది! ఇది ఇల్లు కాదు.. ఒక జీవనశైలి! | ABN',
    views: '91.2K',
    likes: '7.3K',
    location: 'Heritage Wooden Villa',
    videoId: 'Oc3QARdxQqw',
    url: 'https://youtu.be/Oc3QARdxQqw',
    embedUrl: 'https://www.youtube.com/embed/Oc3QARdxQqw?autoplay=1&mute=0&controls=1&rel=0&playsinline=1',
    poster: '/reels/yt-6.jpg',
  },
  // 13. Instagram Reel
  {
    id: 13,
    platform: 'instagram',
    type: 'reel',
    title: 'Eco-Friendly Resort Cottage Handover',
    caption: 'Client walkthrough and handover of custom modular holiday cottage ready in 45 days.',
    views: '30.8K',
    likes: '2.4K',
    location: 'Experience Center, Shamshabad',
    reelId: 'DLNYTBsz39-',
    url: 'https://www.instagram.com/reel/DLNYTBsz39-/',
    embedUrl: 'https://www.instagram.com/reel/DLNYTBsz39-/embed/',
    poster: '/reels/reel-5.jpg',
  },
  // 14. YouTube Video
  {
    id: 14,
    platform: 'youtube',
    type: 'video',
    title: 'Make My Cottage | Best Wood House Construction at Low Prices in Hyderabad',
    caption: 'Make My Cottage | Best Wood House Construction at Low Prices in Hyderabad | Haritha Talks',
    views: '115.4K',
    likes: '9.6K',
    location: 'Hyderabad Experience Center',
    videoId: 'gdebWSU3Mi0',
    url: 'https://youtu.be/gdebWSU3Mi0',
    embedUrl: 'https://www.youtube.com/embed/gdebWSU3Mi0?autoplay=1&mute=0&controls=1&rel=0&playsinline=1',
    poster: '/reels/yt-7.jpg',
  },
];

export const InstagramCurvedSection = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [selectedIdx, setSelectedIdx] = useState(null);

  const selectedMedia = selectedIdx !== null ? CURVED_MEDIA_ITEMS[selectedIdx] : null;

  const handlePrev = (e) => {
    e?.stopPropagation();
    setSelectedIdx((prev) => (prev - 1 + CURVED_MEDIA_ITEMS.length) % CURVED_MEDIA_ITEMS.length);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setSelectedIdx((prev) => (prev + 1) % CURVED_MEDIA_ITEMS.length);
  };

  // Keyboard navigation for cinema modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIdx === null) return;
      if (e.key === 'Escape') setSelectedIdx(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 470;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera with responsive horizontal lock (always spans 100% of window screen)
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 30);
    camera.position.z = 5.2;

    const updateCameraFov = (w, h) => {
      const aspect = w / h;
      const targetTan = 1.62 / aspect;
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

    // 4. Texture Loader with Canvas Compositing (Bespoke Platform Badges & Crisp Posters)
    const textures = CURVED_MEDIA_ITEMS.map((item) => {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = 640;
      offCanvas.height = 910;
      const ctx = offCanvas.getContext('2d');

      ctx.fillStyle = '#181b20';
      ctx.fillRect(0, 0, offCanvas.width, offCanvas.height);

      const texture = new THREE.CanvasTexture(offCanvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = item.poster;
      img.onload = () => {
        const imgRatio = img.width / img.height;
        const canvasRatio = offCanvas.width / offCanvas.height;
        let sWidth, sHeight, sx, sy;
        if (imgRatio > canvasRatio) {
          sHeight = img.height;
          sWidth = img.height * canvasRatio;
          sx = (img.width - sWidth) / 2;
          sy = 0;
        } else {
          sWidth = img.width;
          sHeight = img.width / canvasRatio;
          sx = 0;
          sy = (img.height - sHeight) / 2;
        }
        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, offCanvas.width, offCanvas.height);

        // Top vignette gradient
        const topGrad = ctx.createLinearGradient(0, 0, 0, 150);
        topGrad.addColorStop(0, 'rgba(0,0,0,0.72)');
        topGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = topGrad;
        ctx.fillRect(0, 0, offCanvas.width, 150);

        // Bottom cinematic gradient
        const botGrad = ctx.createLinearGradient(0, offCanvas.height - 270, 0, offCanvas.height);
        botGrad.addColorStop(0, 'rgba(0,0,0,0)');
        botGrad.addColorStop(0.5, 'rgba(0,0,0,0.65)');
        botGrad.addColorStop(1, 'rgba(0,0,0,0.92)');
        ctx.fillStyle = botGrad;
        ctx.fillRect(0, offCanvas.height - 270, offCanvas.width, 270);

        // Platform Badge (Top Left)
        const isInsta = item.platform === 'instagram';
        const pillX = 28;
        const pillY = 28;
        const pillH = 40;
        const pillText = isInsta ? 'REEL' : (item.type === 'short' ? 'SHORT' : 'YOUTUBE');
        ctx.font = '700 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        const textW = ctx.measureText(pillText).width;
        const pillW = textW + (isInsta ? 64 : 58);
        const radius = 20;

        ctx.save();
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(pillX, pillY, pillW, pillH, radius);
        } else {
          ctx.rect(pillX, pillY, pillW, pillH);
        }
        if (isInsta) {
          const g = ctx.createLinearGradient(pillX, pillY, pillX + pillW, pillY + pillH);
          g.addColorStop(0, '#f09433');
          g.addColorStop(0.35, '#e6683c');
          g.addColorStop(0.7, '#dc2743');
          g.addColorStop(1, '#bc1888');
          ctx.fillStyle = g;
        } else {
          ctx.fillStyle = '#E62117';
        }
        ctx.fill();

        // Icon & text in badge
        ctx.fillStyle = '#FFFFFF';
        ctx.textBaseline = 'middle';
        if (isInsta) {
          ctx.beginPath();
          ctx.arc(pillX + 20, pillY + pillH / 2, 6, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          ctx.beginPath();
          ctx.arc(pillX + 20, pillY + pillH / 2, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#dc2743';
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.fillText(pillText, pillX + 36, pillY + pillH / 2 + 1);
        } else {
          ctx.beginPath();
          ctx.moveTo(pillX + 16, pillY + pillH / 2 - 6);
          ctx.lineTo(pillX + 26, pillY + pillH / 2);
          ctx.lineTo(pillX + 16, pillY + pillH / 2 + 6);
          ctx.closePath();
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          ctx.fillText(pillText, pillX + 34, pillY + pillH / 2 + 1);
        }
        ctx.restore();

        // Views count (Top Right)
        if (item.views) {
          ctx.save();
          ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          const vw = ctx.measureText(item.views).width;
          const vPillW = vw + 24;
          const vPillX = offCanvas.width - 28 - vPillW;
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(vPillX, pillY, vPillW, pillH, radius);
          } else {
            ctx.rect(vPillX, pillY, vPillW, pillH);
          }
          ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
          ctx.fill();
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.textBaseline = 'middle';
          ctx.fillText(item.views, vPillX + 12, pillY + pillH / 2);
          ctx.restore();
        }

        // Center Frosted Play Icon
        ctx.save();
        const cx = offCanvas.width / 2;
        const cy = offCanvas.height / 2;
        ctx.beginPath();
        ctx.arc(cx, cy, 46, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.42)';
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx - 11, cy - 16);
        ctx.lineTo(cx + 18, cy);
        ctx.lineTo(cx - 11, cy + 16);
        ctx.closePath();
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.restore();

        // Bottom Info
        ctx.save();
        ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.textBaseline = 'bottom';
        let t = item.title;
        if (ctx.measureText(t).width > offCanvas.width - 56) {
          while (t.length > 3 && ctx.measureText(t + '...').width > offCanvas.width - 56) {
            t = t.slice(0, -1);
          }
          t += '...';
        }
        ctx.fillText(t, 28, offCanvas.height - 48);

        ctx.font = '400 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fillText(item.location, 28, offCanvas.height - 22);
        ctx.restore();

        texture.needsUpdate = true;
      };

      return texture;
    });

    // 5. 3D Cylindrical Geometry
    const planeWidth = 1.55;
    const planeHeight = 2.2;
    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 36, 1);

    const numVisible = 8;
    const radius = 4.8;
    const arcSpread = 0.70 * Math.PI;
    const angleStep = arcSpread / (numVisible - 1);
    const numMeshes = 28; // 2 loops of 14 items
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
      const itemIdx = i % CURVED_MEDIA_ITEMS.length;
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: textures[itemIdx] },
          uRadius: { value: radius },
          uIsVideo: { value: 1.0 },
        },
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData = { reelIndex: itemIdx };
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
        const rect = canvas.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);
        const intersects = raycaster.intersectObjects(meshes);
        if (intersects.length > 0) {
          const itemIdx = intersects[0].object.userData.reelIndex;
          if (itemIdx !== undefined && CURVED_MEDIA_ITEMS[itemIdx]) {
            setSelectedIdx(itemIdx);
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
          if (itemIdx !== undefined && CURVED_MEDIA_ITEMS[itemIdx]) {
            setSelectedIdx(itemIdx);
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
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 470;
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

        if (Math.abs(offset) > 4.6) {
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
        if (m.material.uniforms?.uTexture?.value) {
          m.material.uniforms.uTexture.value.dispose();
        }
        m.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 bg-[#FAFAF8] overflow-hidden select-none">
      {/* 1. Header with Title & Social Channels */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E2530]/5 text-[#1E2530] text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#E62117] animate-pulse" />
              <span>Watch Our Builds &amp; Reels</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#1E2530] font-normal tracking-tight">
              On Site, YouTube &amp; Instagram.
            </h2>
            <p className="text-sm sm:text-base text-[#666] font-light mt-3 max-w-xl">
              See our latest wooden builds, framing stages, home tour walkthroughs, and behind-the-scenes video reels.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.youtube.com/@makemycottage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#E62117] hover:bg-[#c91810] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md group cursor-pointer"
            >
              <FaYoutube className="w-4 h-4" />
              <span>Watch on YouTube</span>
              <HiArrowNarrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href={BUSINESS_INFO.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#141517] hover:bg-black text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md group cursor-pointer"
            >
              <FaInstagram className="w-4 h-4 text-[#ff4b18]" />
              <span>Follow {BUSINESS_INFO.social.instagramHandle}</span>
              <HiArrowNarrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Interactive 3D Cylindrical Perspective Carousel Slider (Edge-to-Edge Bleed) */}
      <div className="relative w-full overflow-hidden">
        <div 
          ref={containerRef} 
          className="relative w-full h-[330px] sm:h-[380px] md:h-[430px] lg:h-[470px] flex items-center justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing"
        >
          <canvas ref={canvasRef} className="block w-full h-full" />
        </div>

        {/* Drag Hint & Navigation */}
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#888] font-light uppercase tracking-widest">
          <span>&larr; Drag or click to play videos &amp; reels &rarr;</span>
        </div>
      </div>

      {/* 3. Cinema Video / Reel Player Modal with Autoplay */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setSelectedIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`bg-[#141517] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative w-full ${
                selectedMedia.type === 'short' || selectedMedia.platform === 'instagram'
                  ? 'max-w-md'
                  : 'max-w-3xl'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIdx(null)}
                className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
                aria-label="Close"
              >
                <HiX className="w-5 h-5" />
              </button>

              {/* Prev / Next Floating Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 shadow-xl hover:scale-105"
                aria-label="Previous Video"
              >
                <HiChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 shadow-xl hover:scale-105"
                aria-label="Next Video"
              >
                <HiChevronRight className="w-6 h-6" />
              </button>

              {/* Player Media Container with Autoplay */}
              <div
                className={`relative w-full bg-black flex items-center justify-center overflow-hidden ${
                  selectedMedia.type === 'short' || selectedMedia.platform === 'instagram'
                    ? 'aspect-[9/16] max-h-[68vh]'
                    : 'aspect-video max-h-[62vh]'
                }`}
              >
                {selectedMedia.platform === 'youtube' ? (
                  <iframe
                    key={selectedMedia.videoId}
                    src={`https://www.youtube.com/embed/${selectedMedia.videoId}?autoplay=1&mute=0&controls=1&rel=0&playsinline=1&modestbranding=1`}
                    title={selectedMedia.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <iframe
                    key={selectedMedia.reelId}
                    src={`https://www.instagram.com/reel/${selectedMedia.reelId}/embed/`}
                    title={selectedMedia.title}
                    className="w-full h-full border-0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>

              {/* Video / Reel Information & Direct Action Buttons */}
              <div className="p-5 sm:p-6 bg-gradient-to-b from-[#141517] to-[#0c0d0e]">
                <div className="flex items-center justify-between gap-3 mb-2 text-xs text-white/70">
                  <span className="flex items-center gap-1.5 font-medium">
                    {selectedMedia.platform === 'youtube' ? (
                      <span className="flex items-center gap-1 text-[#E62117] font-semibold">
                        <FaYoutube className="w-4 h-4" />
                        <span>YouTube {selectedMedia.type === 'short' ? 'Short' : 'Video'}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[#ff4b18] font-semibold">
                        <FaInstagram className="w-4 h-4" />
                        <span>Instagram Reel</span>
                      </span>
                    )}
                    <span className="text-white/40">•</span>
                    <span>{selectedMedia.location}</span>
                  </span>

                  <span className="text-white/50 text-[11px] font-mono">
                    {String(selectedIdx + 1).padStart(2, '0')} / {String(CURVED_MEDIA_ITEMS.length).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="font-heading text-base sm:text-lg font-semibold text-white mb-2 leading-snug">
                  {selectedMedia.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-5 line-clamp-2">
                  {selectedMedia.caption}
                </p>

                {/* Direct Platform Links */}
                {selectedMedia.platform === 'youtube' ? (
                  <a
                    href={selectedMedia.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-6 rounded-xl bg-[#E62117] hover:bg-[#c91810] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
                  >
                    <FaYoutube className="w-4 h-4" />
                    <span>Watch Full Video on YouTube</span>
                    <HiExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <a
                    href={selectedMedia.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#ff4b18] to-[#f53803] hover:brightness-110 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
                  >
                    <FaInstagram className="w-4 h-4" />
                    <span>View Reel on Instagram (@makemycottageinfrapvtltd)</span>
                    <HiExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InstagramCurvedSection;
