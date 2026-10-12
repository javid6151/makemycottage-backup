"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowNarrowRight, HiOutlineInformationCircle } from "react-icons/hi";
import { TextRotate, TextRotateRef } from "@/components/ui/text-rotate";
import { SERVICES, BUSINESS_INFO } from "@/utils/constants";

export interface ServicesTextRotateProps {
  onSelectServiceModal?: (service: any) => void;
}

export const ServicesTextRotate: React.FC<ServicesTextRotateProps> = ({
  onSelectServiceModal,
}) => {
  const textRotateRef = useRef<TextRotateRef>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const currentService = SERVICES[activeIndex] || SERVICES[0];

  const jumpToIndex = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, SERVICES.length - 1));
    if (clampedIndex === activeIndexRef.current) return;
    activeIndexRef.current = clampedIndex;
    setActiveIndex(clampedIndex);
    textRotateRef.current?.jumpTo(clampedIndex);

    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable > 0) {
        const targetScroll =
          window.scrollY +
          rect.top +
          (clampedIndex / (SERVICES.length - 1)) * totalScrollable;
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(targetScroll, { duration: 0.5 });
        } else {
          window.scrollTo({ top: targetScroll, behavior: "smooth" });
        }
      }
    }
  };

  // 1. Synchronize window scrolling with active item & text rotation
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const totalScrollable = rect.height - window.innerHeight;
          if (totalScrollable <= 0) return;

          const currentScroll = -rect.top;
          if (currentScroll < 0) {
            if (activeIndexRef.current !== 0) {
              activeIndexRef.current = 0;
              setActiveIndex(0);
              textRotateRef.current?.jumpTo(0);
            }
            ticking = false;
            return;
          }

          const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
          const newIndex = Math.min(
            SERVICES.length - 1,
            Math.floor(progress * SERVICES.length)
          );

          if (newIndex !== activeIndexRef.current) {
            activeIndexRef.current = newIndex;
            setActiveIndex(newIndex);
            textRotateRef.current?.jumpTo(newIndex);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    let lenisTimer: NodeJS.Timeout;
    if ((window as any).lenis) {
      (window as any).lenis.on("scroll", onScroll);
    } else {
      lenisTimer = setInterval(() => {
        if ((window as any).lenis) {
          (window as any).lenis.on("scroll", onScroll);
          clearInterval(lenisTimer);
        }
      }, 100);
    }

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(lenisTimer);
      if ((window as any).lenis) {
        (window as any).lenis.off("scroll", onScroll);
      }
    };
  }, []);

  // 2. Active wheel interceptor for smooth stepping when pinned
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let lastWheelTime = 0;
    const onWheelNative = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime < 280) return;

      const rect = el.getBoundingClientRect();
      if (rect.top <= 80 && rect.bottom >= window.innerHeight - 80) {
        if (e.deltaY > 15 && activeIndexRef.current < SERVICES.length - 1) {
          e.preventDefault();
          e.stopPropagation();
          lastWheelTime = now;
          jumpToIndex(activeIndexRef.current + 1);
        } else if (e.deltaY < -15 && activeIndexRef.current > 0) {
          e.preventDefault();
          e.stopPropagation();
          lastWheelTime = now;
          jumpToIndex(activeIndexRef.current - 1);
        }
      }
    };

    el.addEventListener("wheel", onWheelNative, { passive: false });

    // Touch swipe support for mobile
    let touchStartY = 0;
    let lastTouchTime = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchTime < 350) return;
      const touchY = e.touches[0].clientY;
      const diffY = touchStartY - touchY;
      const rect = el.getBoundingClientRect();

      if (rect.top <= 80 && rect.bottom >= window.innerHeight - 80) {
        if (diffY > 40 && activeIndexRef.current < SERVICES.length - 1) {
          e.preventDefault();
          lastTouchTime = now;
          jumpToIndex(activeIndexRef.current + 1);
        } else if (diffY < -40 && activeIndexRef.current > 0) {
          e.preventDefault();
          lastTouchTime = now;
          jumpToIndex(activeIndexRef.current - 1);
        }
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheelNative);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-white text-[#141517]"
      style={{ height: `${SERVICES.length * 60}vh` }}
    >
      {/* Sticky viewport pinned while scrolling through the services */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-between overflow-hidden bg-white select-none">
        
        {/* LEFT COLUMN: Vertical sliding service architectural images */}
        <div className="w-1/2 h-full relative overflow-hidden flex items-start justify-center">
          <div
            className="w-full flex flex-col items-center transition-transform duration-500 ease-out"
            style={{
              transform: `translateY(-${activeIndex * 100}vh)`,
            }}
          >
            {SERVICES.map((srv, index) => (
              <div
                key={srv.id}
                className="h-screen w-full flex-shrink-0 flex justify-center items-center px-4 sm:px-8 lg:px-12"
              >
                <div
                  className="group relative w-full max-w-md lg:max-w-xl aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-[#e3e3de] cursor-pointer bg-neutral-100 transition-all duration-300"
                  onClick={() => {
                    if (onSelectServiceModal) {
                      onSelectServiceModal(srv);
                    } else if (index !== activeIndex) {
                      jumpToIndex(index);
                    }
                  }}
                  title={`View details for ${srv.title}`}
                >
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                  {/* Top floating badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#141517] shadow-sm">
                      {srv.title}
                    </span>
                    <span className="font-heading text-base text-white font-light drop-shadow">
                      {srv.num}
                    </span>
                  </div>

                  {/* Hover action prompt */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                    <span className="inline-flex items-center gap-1.5 text-white text-[11px] font-sans uppercase tracking-widest font-semibold bg-black/80 px-4 py-2 rounded-full backdrop-blur-sm shadow-md">
                      <span>Quick Preview</span>
                      <HiArrowNarrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Rotating Service Name & Details matching the design */}
        <div className="w-1/2 h-full flex flex-col items-start justify-center pl-6 sm:pl-12 lg:pl-20 pr-8 sm:pr-12 select-none max-w-xl">
          {/* Eyebrow matching the design screenshot */}
          <div className="flex items-center gap-3 mb-4">
            <span className="font-heading text-3xl sm:text-4xl text-accent-terracotta font-medium">
              {currentService.num}
            </span>
            <span className="w-12 h-[1px] bg-black/15" />
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-black/50 font-semibold">
              TURNKEY CONSTRUCTION
            </span>
          </div>

          {/* Animated Rotating Headline with TextRotate */}
          <div className="w-full mb-4">
            <TextRotate
              ref={textRotateRef}
              texts={SERVICES.map((s) => s.title.toUpperCase())}
              mainClassName="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading uppercase font-normal tracking-tight text-[#141517]"
              splitLevelClassName="overflow-hidden pb-2"
              staggerFrom={"first"}
              animatePresenceMode="wait"
              loop={false}
              auto={false}
              staggerDuration={0.005}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0 }}
            />
          </div>

          {/* Description matching the screenshot */}
          <p className="font-sans text-black/75 text-sm sm:text-base font-light leading-relaxed mb-8 min-h-[4rem]">
            {currentService.description}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#141517] text-white hover:bg-black text-xs uppercase tracking-widest font-semibold transition-all shadow-md group"
            >
              <span>Enquire for {currentService.title}</span>
              <HiArrowNarrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            <button
              type="button"
              onClick={() => onSelectServiceModal && onSelectServiceModal(currentService)}
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-[#e3e3de] hover:border-[#141517] text-xs uppercase tracking-wider font-semibold text-[#141517] shadow-sm transition-all"
            >
              <HiOutlineInformationCircle className="w-4 h-4 text-[#888]" />
              <span>Quick Overview</span>
            </button>
          </div>

          {/* Step indicator */}
          <div className="mt-8 flex items-center gap-2 text-xs text-[#999] font-mono">
            <span>{currentService.num}</span>
            <span>/</span>
            <span>0{SERVICES.length}</span>
            <span className="mx-2">&middot;</span>
            <span className="uppercase text-[10px] tracking-widest font-sans text-[#777]">
              {currentService.title}
            </span>
          </div>
        </div>

        {/* Right edge navigation dots */}
        <div className="absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-10">
          {SERVICES.map((srv, i) => (
            <button
              key={srv.id}
              type="button"
              onClick={() => jumpToIndex(i)}
              className={`w-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === i
                  ? "h-8 bg-[#141517]"
                  : "h-2 bg-black/20 hover:bg-black/40"
              }`}
              title={srv.title}
              aria-label={`Jump to ${srv.title}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ServicesTextRotate;
