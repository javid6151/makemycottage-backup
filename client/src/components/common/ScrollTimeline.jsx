import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollTimeline.css';

gsap.registerPlugin(ScrollTrigger);

const VALUES_DATA = [
  {
    num: '01',
    category: 'Quality First',
    title: 'Custom Architecture',
    desc: 'Every project begins with your unique vision and landscape topography. We combine honest communication and precision craftsmanship to build homes that stand strong.',
    image: 'https://framerusercontent.com/images/CLmCsdh7AwPcBQ3vC46NXF6xx1I.jpg',
    alt: 'Vibrant blue cottage with red entrance and blooming flowers',
  },
  {
    num: '02',
    category: 'Reliability',
    title: 'Reliable Partnership',
    desc: 'From conversation to delivery, we ensure clear communication, dependable scheduling, and promises kept at every milestone.',
    image: 'https://framerusercontent.com/images/USomtnNx14oYfAnxeOJ8hrr0A.jpg',
    alt: 'Vibrant architectural facade with warm tones and balconies',
  },
  {
    num: '03',
    category: 'Precision',
    title: 'Every Detail Matters',
    desc: 'Thoughtful planning and precise execution ensure quality at every stage of construction, from interlocking timber joinery to weatherproof finishes.',
    image: 'https://framerusercontent.com/images/T4e0Xpo4pW6qftc9WUaOHuqi1Ts.jpg',
    alt: 'Geometric modern architectural building with arched entry',
  },
  {
    num: '04',
    category: 'Integrity',
    title: 'Built on Integrity',
    desc: 'Strong projects begin with honest relationships, transparent pricing, and doing things right from foundation to key handover.',
    image: 'https://framerusercontent.com/images/ZhJhV3gSPlTtS9AvPePLsIAjHn0.jpg',
    alt: 'Warm terracotta building with artisan balcony',
  },
  {
    num: '05',
    category: 'Innovation',
    title: 'Better Building',
    desc: 'We use modern techniques and practical solutions to make construction more efficient.',
    image: 'https://framerusercontent.com/images/B2M54hVabRSe3CMSxEJb5pYVlJs.jpg',
    alt: 'Modern architectural building with vibrant tree and red blossoms',
  },
  {
    num: '06',
    category: 'Craftsmanship',
    title: 'Expertise in Every Detail',
    desc: "Our skilled team brings experience and craftsmanship to every project, creating spaces you're proud of.",
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80',
    alt: 'Artisan coastal architecture with flowers and handcrafted detailing',
  },
];

const ScrollTimeline = () => {
  const containerRef = useRef(null);
  const spineRef = useRef(null);
  const progressLineRef = useRef(null);
  const lorrySpineRef = useRef(null);
  const lorryRef = useRef(null);
  const lorryInnerRef = useRef(null);
  const idleTimerRef = useRef(null);
  const dotRefs = useRef([]);
  const cardRefs = useRef([]);
  const dotProgressOffsets = useRef([]);
  const ctxRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const spine = spineRef.current;
    const progressLine = progressLineRef.current;
    const lorrySpine = lorrySpineRef.current;
    if (!container || !spine || !progressLine) return;

    let rafId = null;
    let currentProgress = 0;
    let targetProgress = 0;

    const updateMeasurements = () => {
      const dots = dotRefs.current.filter(Boolean);
      if (dots.length < 2 || !container || !spine) return null;

      const containerRect = container.getBoundingClientRect();
      const firstDotRect = dots[0].getBoundingClientRect();
      const lastDotRect = dots[dots.length - 1].getBoundingClientRect();

      const topOffset = firstDotRect.top - containerRect.top + firstDotRect.height / 2;
      const bottomOffset = lastDotRect.top - containerRect.top + lastDotRect.height / 2;
      const totalHeight = Math.max(0, bottomOffset - topOffset);

      if (totalHeight === 0) return null;

      spine.style.top = `${topOffset}px`;
      spine.style.height = `${totalHeight}px`;

      if (lorrySpine) {
        lorrySpine.style.top = `${topOffset}px`;
        lorrySpine.style.height = `${totalHeight}px`;
      }

      dotProgressOffsets.current = dots.map((dot) => {
        const dotRect = dot.getBoundingClientRect();
        const dotCenter = dotRect.top - containerRect.top + dotRect.height / 2;
        return Math.min(1, Math.max(0, (dotCenter - topOffset) / totalHeight));
      });

      return { totalHeight, dots, firstDot: dots[0], lastDot: dots[dots.length - 1] };
    };

    const tick = () => {
      const dots = dotRefs.current.filter(Boolean);
      if (dots.length >= 2) {
        const firstDot = dots[0];
        const lastDot = dots[dots.length - 1];
        const firstDotRect = firstDot.getBoundingClientRect();
        const lastDotRect = lastDot.getBoundingClientRect();

        // Target center reading line in the viewport (52% from top)
        const viewportCenter = window.innerHeight * 0.52;
        const dot1Y = firstDotRect.top + firstDotRect.height / 2;
        const dot6Y = lastDotRect.top + lastDotRect.height / 2;
        const totalDistance = dot6Y - dot1Y;

        if (totalDistance > 50) {
          // Direct real-time progress based on actual on-screen position of milestone nodes
          const rawProgress = (viewportCenter - dot1Y) / totalDistance;
          targetProgress = Math.min(1, Math.max(0, rawProgress));

          // Silky smooth damping interpolation
          const diff = targetProgress - currentProgress;
          currentProgress += diff * 0.16;
          if (Math.abs(diff) < 0.0003) currentProgress = targetProgress;

          // Apply percentage height directly to the orange line
          progressLine.style.height = `${(currentProgress * 100).toFixed(3)}%`;

          // Synchronize vehicle vertical position
          if (lorryRef.current) {
            lorryRef.current.style.top = `${(currentProgress * 100).toFixed(3)}%`;
          }

          // Synchronize wood delivery to milestone nodes
          const offsets = dotProgressOffsets.current;
          dots.forEach((dot, idx) => {
            if (!dot) return;
            const target = offsets[idx] ?? idx / (dots.length - 1);
            // Wood drops right as lorry pulls up to node
            const isReached = idx === 0 ? currentProgress >= 0.005 : currentProgress >= (target - 0.015);
            if (isReached) {
              dot.classList.add('is-active');
            } else {
              dot.classList.remove('is-active');
            }
          });

          // Dynamic vehicle driving states (bounce, tilt, headlights, smoke)
          const lorry = lorryRef.current;
          if (lorry) {
            const isMoving = Math.abs(diff) > 0.0003;
            if (isMoving) {
              lorry.classList.add('is-moving');
              lorry.classList.remove('is-idle');

              if (diff < -0.0003) {
                lorry.classList.add('is-reversing');
                lorry.classList.remove('is-forward');
              } else {
                lorry.classList.add('is-forward');
                lorry.classList.remove('is-reversing');
              }
            } else {
              lorry.classList.remove('is-moving', 'is-reversing', 'is-forward');
              lorry.classList.add('is-idle');
            }
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    // Initial measurements and start loop
    updateMeasurements();
    rafId = requestAnimationFrame(tick);

    // Cards entrance animation with GSAP ScrollTrigger
    ctxRef.current = gsap.context(() => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0.35, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, containerRef);

    // ResizeObserver and resize listeners to maintain correct spine coordinates
    let resizeObserver;
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        updateMeasurements();
      });
      resizeObserver.observe(container);
    }

    const handleResize = () => {
      updateMeasurements();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      if (ctxRef.current) ctxRef.current.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="timeline-container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
    >
      {/* =========================================================================
          1. STRAIGHT VERTICAL CENTER SPINE & PROGRESS LINE (BEHIND WOOD - z-10)
      ========================================================================= */}
      <div
        ref={spineRef}
        className="timeline-spine left-6 md:left-1/2 -translate-x-1/2"
      >
        {/* Neutral background track line */}
        <div className="timeline-track-line" />

        {/* Real-time scroll progress orange line (runs strictly behind wood & cottage) */}
        <div
          ref={progressLineRef}
          className="timeline-progress-line"
        />
      </div>

      {/* =========================================================================
          2. ANIMATED TIMBER LORRY (ON TOP OF WOOD & MILESTONES - z-40)
      ========================================================================= */}
      <div
        ref={lorrySpineRef}
        className="timeline-lorry-track left-6 md:left-1/2 -translate-x-1/2"
      >
        <div
          ref={lorryRef}
          className="timeline-lorry is-idle"
          aria-label="MakeMyCottage Timber Delivery Truck"
        >
          {/* Dual Headlight Light Cone Beams projecting down the track */}
          <div className="lorry-headlight-beams">
            <div className="headlight-beam beam-left" />
            <div className="headlight-beam beam-right" />
          </div>

          {/* Micro Exhaust Smoke Puffs */}
          <div className="lorry-exhaust-wrap">
            <span className="exhaust-puff puff-1" />
            <span className="exhaust-puff puff-2" />
            <span className="exhaust-puff puff-3" />
          </div>

          {/* Lorry Body with dynamic steering rotation */}
          <div ref={lorryInnerRef} className="lorry-body">
            {/* Lorry Graphic */}
            <img
              src="/lorry-cropped.png"
              alt="MakeMyCottage Delivery Truck"
              className="lorry-image"
              draggable={false}
            />

            {/* Headlight Flares on Front Bumper */}
            <div className="lorry-front-flares">
              <span className="front-flare flare-left" />
              <span className="front-flare flare-right" />
            </div>

            {/* Tail Light Flares at Rear Bed */}
            <div className="lorry-rear-flares">
              <span className="tail-flare flare-left" />
              <span className="tail-flare flare-right" />
            </div>
          </div>

          {/* Ground shadow & road underglow */}
          <div className="lorry-ground-shadow" />
        </div>
      </div>

      {/* =========================================================================
          TIMELINE MILESTONES 01 TO 06 (z-20 IN FRONT OF SPINE LINE)
      ========================================================================= */}
      <div className="relative z-20 w-full flex flex-col">
        {VALUES_DATA.map((item, idx) => {
          const isLeft = idx % 2 === 0;

          return (
            <div
              key={item.num}
              className="relative w-full flex flex-col md:flex-row items-start justify-between mb-12 md:-mt-8 lg:-mt-12 first:mt-0 last:mb-0"
            >
              {/* Milestone Node on Spine - Wood Logs that morph into Cottage */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-1.5 md:top-2 z-20 flex items-center justify-center pointer-events-none">
                <div
                  ref={(el) => (dotRefs.current[idx] = el)}
                  className="timeline-wood-node"
                >
                  {/* Subtle target base landing marker */}
                  <div className="wood-base-marker" />

                  {/* 1. Delivered fallen timber logs (animates dropping into place when lorry nears) */}
                  <div className="fallen-wood-wrap">
                    <img
                      src="/wood-logs.png"
                      alt={`Delivered timber wood ${item.num}`}
                      className="fallen-wood-img"
                      draggable={false}
                    />
                    {/* Shockwave impact ripple on landing */}
                    <span className="wood-impact-ripple" />
                    {/* Wood dust chips */}
                    <span className="wood-chip chip-1" />
                    <span className="wood-chip chip-2" />
                    <span className="wood-chip chip-3" />
                  </div>

                  {/* 2. Magical Transformation into Wooden Cottage */}
                  <div className="transformed-cottage-wrap">
                    {/* Magical sawdust & golden construction spark burst */}
                    <span className="transform-burst" />
                    <span className="transform-spark spark-1" />
                    <span className="transform-spark spark-2" />
                    <span className="transform-spark spark-3" />
                    <span className="transform-spark spark-4" />

                    {/* Wooden Cottage Miniature */}
                    <div className="cottage-model-inner">
                      <img
                        src="/wooden-cottage.png"
                        alt={`MakeMyCottage Crafted Wooden Cottage ${item.num}`}
                        className="cottage-img"
                        draggable={false}
                      />
                      {/* Chimney Smoke Puffs */}
                      <div className="cottage-chimney-smoke">
                        <span className="chimney-puff cp-1" />
                        <span className="chimney-puff cp-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Left Column Content (Items 0, 2, 4 on Desktop) */}
              {isLeft ? (
                <div
                  ref={(el) => (cardRefs.current[idx] = el)}
                  className="w-full md:w-[44%] lg:w-[42%] pl-14 md:pl-0 md:pr-4"
                >
                  <div className="text-xs uppercase tracking-widest text-[#555] font-semibold mb-2">
                    {item.num} — {item.category}
                  </div>
                  <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl text-[#1E2530] font-normal leading-tight mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#666] font-light leading-relaxed mb-5">
                    {item.desc}
                  </p>
                  <div className="timeline-image-wrap aspect-[4/3] w-full">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      className="timeline-image"
                    />
                  </div>
                </div>
              ) : (
                <div className="hidden md:block md:w-[44%] lg:w-[42%]" />
              )}

              {/* Right Column Content (Items 1, 3, 5 on Desktop) */}
              {!isLeft ? (
                <div
                  ref={(el) => (cardRefs.current[idx] = el)}
                  className="w-full md:w-[44%] lg:w-[42%] pl-14 md:pl-0 md:pl-4"
                >
                  <div className="text-xs uppercase tracking-widest text-[#555] font-semibold mb-2">
                    {item.num} — {item.category}
                  </div>
                  <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl text-[#1E2530] font-normal leading-tight mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#666] font-light leading-relaxed mb-5">
                    {item.desc}
                  </p>
                  <div className="timeline-image-wrap aspect-[4/3] w-full">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      className="timeline-image"
                    />
                  </div>
                </div>
              ) : (
                <div className="hidden md:block md:w-[44%] lg:w-[42%]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollTimeline;
