import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import HtmlToCanvas from "./HtmlToCanvas";
import { createProjector } from "./ProjectedMaterial";
import { collectDocumentCss } from "./collectDocumentCss";
import { keyframeValue, smoothstep } from "./utils";
import "./services3d.css";

const CAMERA_FOV = 45;
const REST_POSITION = new THREE.Vector3(0, 0, 15);
const LOOK_TARGET = new THREE.Vector3(0, -1, -4);

export const Services3DProjection = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const hostRef = useRef(null);
  const pageRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const pageElement = pageRef.current;
    if (!canvas || !container || !pageElement) return;

    let width = canvas.clientWidth || window.innerWidth;
    let height = canvas.clientHeight || window.innerHeight;
    let aspectRatio = width / height;

    // 1. Setup Three.js Scene & Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // 2. Setup Perspective Camera
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, aspectRatio, 1, 100);
    camera.position.copy(REST_POSITION);
    camera.lookAt(LOOK_TARGET);

    // 3. Lighting Setup
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 50;
    keyLight.shadow.camera.left = -15;
    keyLight.shadow.camera.right = 15;
    keyLight.shadow.camera.top = 15;
    keyLight.shadow.camera.bottom = -15;
    keyLight.shadow.bias = -0.0001;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    // 4. Load 3D Model & Setup Projected Material
    let projector = null;
    let htmlToCanvas = null;
    let loadedModel = null;
    const projectedMeshes = [];

    const standardMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.4,
      metalness: 0.1,
    });
    const basicMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(
      "/model.glb",
      (gltf) => {
        loadedModel = gltf.scene;
        loadedModel.traverse((c) => {
          if (!c.isMesh) return;
          if (c.userData.name === "bg") {
            c.material = basicMaterial;
            c.castShadow = false;
            c.receiveShadow = true;
          } else {
            c.material = standardMaterial;
            c.castShadow = true;
            c.receiveShadow = true;
          }
          projectedMeshes.push(c);
        });

        scene.add(loadedModel);

        // Projector Camera
        const projectorCamera = new THREE.PerspectiveCamera(
          CAMERA_FOV,
          aspectRatio,
          camera.near,
          camera.far
        );
        projectorCamera.position.copy(REST_POSITION);
        projectorCamera.lookAt(LOOK_TARGET);
        projectorCamera.updateMatrixWorld();

        htmlToCanvas = new HtmlToCanvas(pageElement, {
          width: width,
          height: height,
          pixelRatio: Math.min(window.devicePixelRatio, 2),
        });

        projector = createProjector({
          camera: projectorCamera,
          texture: htmlToCanvas.texture,
        });

        for (const mesh of projectedMeshes) {
          projector.applyTo(mesh);
        }
        projector.update();

        // Rasterize the page content into projection texture
        rasterizePage();
        setModelLoaded(true);
      },
      undefined,
      (err) => {
        console.error("Error loading model.glb:", err);
      }
    );

    const rasterizePage = async () => {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      if (htmlToCanvas) {
        if (!htmlToCanvas.extraCss) {
          htmlToCanvas.extraCss = await collectDocumentCss();
        }
        await htmlToCanvas.update();
      }
    };

    // 5. Scroll Progress Animation Loop
    let animationFrameId = null;

    const renderLoop = () => {
      if (container) {
        const rect = container.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        let progress = 0;

        if (totalScrollable > 0) {
          const currentScroll = -rect.top;
          progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
        }

        // Apply camera trajectory keyframes
        const kf = keyframeValue(progress);
        camera.position.set(
          REST_POSITION.x + kf.x,
          REST_POSITION.y + kf.y,
          REST_POSITION.z + kf.z
        );
        camera.lookAt(LOOK_TARGET);
        camera.rotateZ(kf.roll);

        if (projector) {
          const distFromRest = Math.min(progress, 1 - progress) * 2;
          const t = Math.min(distFromRest / 1, 1);
          projector.uniforms.uLitness.value = smoothstep(t);
        }
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    // 6. Resize Handler
    const handleResize = () => {
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;
      aspectRatio = width / height;

      camera.aspect = aspectRatio;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));

      if (projector) {
        projector.camera.aspect = aspectRatio;
        projector.camera.updateProjectionMatrix();
        projector.update();
      }

      if (htmlToCanvas) {
        htmlToCanvas.resize(width, height);
        rasterizePage();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (loadedModel) scene.remove(loadedModel);
      dracoLoader.dispose();
      renderer.dispose();
      if (htmlToCanvas) htmlToCanvas.dispose();
    };
  }, []);

  return (
    <div className="services-3d-wrap">
      {/* 
        Offscreen DOM source to be rasterized into SVG foreignObject canvas texture.
        Positioned offscreen so it doesn't flash in regular document flow.
      */}
      <div ref={hostRef} className="services-3d-host" aria-hidden="true">
        <div
          ref={pageRef}
          id="services-3d-page"
          className="flex flex-col justify-center items-center h-full relative px-6 bg-white"
          style={{ width: "100vw", height: "100vh" }}
        >
          {/* Bottom Prompt */}
          <p className="font-bold text-xs uppercase tracking-[0.25em] text-black absolute bottom-6 left-1/2 -translate-x-1/2">
            SCROLL DOWN
          </p>

          {/* Big Architectural Background Typography matching the video & screenshot */}
          <div className="w-full max-w-5xl flex flex-col gap-10 sm:gap-6 md:gap-0 text-[#141517] select-none">
            <div className="w-full max-w-lg self-center flex flex-col">
              <h1 className="services-3d-heading self-start">Designing</h1>
              <h2 className="services-3d-heading self-end">Motion</h2>
            </div>
            <div className="w-full max-w-md flex flex-col self-start">
              <h2 className="services-3d-heading self-start">Crafting</h2>
              <h2 className="services-3d-heading self-end">Depth</h2>
            </div>
            <div className="w-full max-w-md flex flex-col self-end">
              <h2 className="services-3d-heading self-start">Into</h2>
              <h2 className="services-3d-heading self-end">Living</h2>
              <h2 className="services-3d-heading self-start">Worlds</h2>
            </div>
          </div>

          {/* Center Red/Orange Card matching Cullen Webber™ / Make My Cottage reference */}
          <div className="services-3d-card">
            <div>
              <div className="flex items-center justify-between w-full mb-3">
                <span className="text-white text-xs uppercase tracking-widest font-semibold opacity-90">
                  Services Showcase
                </span>
                <span className="text-white font-mono text-xs opacity-75">
                  &bull; 2026
                </span>
              </div>
              <h3>Make My Cottage &trade;</h3>
            </div>

            <div className="space-y-3">
              <p>
                Custom-designed wooden homes, farmhouses &amp; modular cottages engineered with natural thermal comfort and generational durability.
              </p>
              <p className="opacity-80 text-xs">
                Turnkey timber architecture &amp; structural engineering crafted to endure across India.
              </p>
            </div>

            <div className="w-full pt-2 border-t border-white/20 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider">
              <span>Turnkey Construction</span>
              <span>&rarr;</span>
            </div>
          </div>
        </div>
      </div>

      {/* 
        Scrollable Section: Height is 350vh so user scrolls smoothly through the 3D trajectory.
        Sticky container pins the canvas during the 3D projection scroll.
      */}
      <div
        ref={containerRef}
        className="relative w-full bg-white text-[#141517]"
        style={{ height: "350vh" }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-white">
          <canvas
            ref={canvasRef}
            className="w-full h-full block touch-none"
            style={{ width: "100%", height: "100%" }}
          />

          {/* Floating UI prompt while scrolling */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 backdrop-blur-sm border border-black/10 text-[#141517] text-[11px] uppercase tracking-[0.2em] font-semibold pointer-events-none select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fd453a] animate-pulse" />
            <span>Scroll to orbit 3D architecture</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services3DProjection;
