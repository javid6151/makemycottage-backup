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
  const tipRef = useRef(null);
  const dotRefs = useRef([]);
  const cardRefs = useRef([]);
  const dotProgressOffsets = useRef([]);
  const ctxRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const spine = spineRef.current;
    const progressLine = progressLineRef.current;
    if (!container || !spine || !progressLine) return;

    const measureAndAnimate = () => {
      const dots = dotRefs.current.filter(Boolean);
      if (dots.length < 2) return;

      const containerRect = container.getBoundingClientRect();
      const firstDotRect = dots[0].getBoundingClientRect();
      const lastDotRect = dots[dots.length - 1].getBoundingClientRect();

      // Top and bottom positions relative to container
      const topOffset = firstDotRect.top - containerRect.top + firstDotRect.height / 2;
      const bottomOffset = lastDotRect.top - containerRect.top + lastDotRect.height / 2;
      const totalHeight = Math.max(0, bottomOffset - topOffset);

      if (totalHeight === 0) return;

      // Synchronously set spine dimensions on the DOM element
      spine.style.top = `${topOffset}px`;
      spine.style.height = `${totalHeight}px`;

      // Precalculate threshold progress for each milestone dot
      dotProgressOffsets.current = dots.map((dot) => {
        const dotRect = dot.getBoundingClientRect();
        const dotCenter = dotRect.top - containerRect.top + dotRect.height / 2;
        return Math.min(1, Math.max(0, (dotCenter - topOffset) / totalHeight));
      });

      if (ctxRef.current) {
        ctxRef.current.revert();
      }

      ctxRef.current = gsap.context(() => {
        // Windows scroll animation:
        // The orange line grows strictly according to the window scroll.
        // It starts drawing when Dot 01 hits the viewport center,
        // its luminous tip tracks the center of the window down to Dot 06,
        // and each dot illuminates in vivid orange as the line tip touches it.
        gsap.fromTo(
          progressLine,
          { height: 0 },
          {
            height: totalHeight,
            ease: 'none',
            scrollTrigger: {
              trigger: spine,
              start: 'top center',
              end: 'bottom center',
              scrub: true,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const p = self.progress;
                const offsets = dotProgressOffsets.current;

                dots.forEach((dot, idx) => {
                  if (!dot) return;
                  const target = offsets[idx] ?? idx / (dots.length - 1);
                  if (p > 0 && p >= target - 0.008) {
                    dot.classList.add('is-active');
                  } else {
                    dot.classList.remove('is-active');
                  }
                });

                if (tipRef.current) {
                  tipRef.current.style.opacity = p > 0.002 ? '1' : '0';
                }
              },
            },
          }
        );

        // Subtle entrance fade for content cards (without moving the dots)
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

      ScrollTrigger.refresh();
    };

    let resizeTimer;
    const debouncedMeasure = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measureAndAnimate, 60);
    };

    // Initial measurement
    const initTimer = setTimeout(measureAndAnimate, 100);

    // Observer to detect layout changes (images, responsive layout, DOM shifts)
    const resizeObserver = new ResizeObserver(() => {
      debouncedMeasure();
    });
    resizeObserver.observe(container);

    // Remeasure once images finish loading
    const images = container.querySelectorAll('img');
    images.forEach((img) => {
      if (img.complete) return;
      img.addEventListener('load', debouncedMeasure, { once: true });
    });

    // Remeasure once custom fonts finish rendering
    if (document.fonts?.ready) {
      document.fonts.ready.then(debouncedMeasure);
    }

    window.addEventListener('resize', debouncedMeasure);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      window.removeEventListener('resize', debouncedMeasure);
      if (ctxRef.current) ctxRef.current.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="timeline-container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
    >
      {/* =========================================================================
          STRAIGHT VERTICAL CENTER SPINE & SCROLL-DRIVEN PROGRESS LINE
      ========================================================================= */}
      <div
        ref={spineRef}
        className="timeline-spine left-6 md:left-1/2 -translate-x-1/2"
      >
        {/* Neutral background track line */}
        <div className="timeline-track-line" />

        {/* Real-time scroll progress orange line */}
        <div
          ref={progressLineRef}
          className="timeline-progress-line"
        >
          {/* Luminous glowing tracer tip bead */}
          <div ref={tipRef} className="timeline-progress-tip" />
        </div>
      </div>

      {/* =========================================================================
          TIMELINE MILESTONES 01 TO 06 (Seamless Staggered Alternating Flow)
      ========================================================================= */}
      <div className="relative z-10 w-full flex flex-col">
        {VALUES_DATA.map((item, idx) => {
          const isLeft = idx % 2 === 0;

          return (
            <div
              key={item.num}
              className="relative w-full flex flex-col md:flex-row items-start justify-between mb-12 md:-mt-8 lg:-mt-12 first:mt-0 last:mb-0"
            >
              {/* Stable Milestone Dot Node on Spine */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-1.5 md:top-2 z-10 flex items-center justify-center">
                <div
                  ref={(el) => (dotRefs.current[idx] = el)}
                  className="timeline-dot"
                />
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
