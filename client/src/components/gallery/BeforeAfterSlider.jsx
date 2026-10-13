import React, { useState, useRef, useCallback } from 'react';
import { Maximize2 } from 'lucide-react';

/**
 * BeforeAfterSlider Component
 * Allows manual dragging/sliding to compare Before and After images side-by-side.
 * Sleek 16:9 aspect ratio so all 3 rows (9 images) fit comfortably in the viewport.
 */
const BeforeAfterSlider = ({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before construction',
  afterAlt = 'Completed project',
  beforeLabel = 'BEFORE',
  afterLabel = 'AFTER',
  title = '',
  initialPosition = 50,
  onOpenLightbox,
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e) => {
    // Prevent slider drag if clicking the expand button or interactive elements
    if (e.target.closest('button') || e.target.closest('input')) {
      return;
    }
    setIsDragging(true);
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch {
      // Fallback if pointer capture not supported
    }
    handleMove(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore if pointer capture was already released
    }
  };

  // Dedicated touch event handlers for bulletproof mobile swipe support
  const handleTouchStart = (e) => {
    if (e.target.closest('button') || e.target.closest('input')) return;
    if (e.touches && e.touches[0]) {
      setIsDragging(true);
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Label visibility logic:
  // When in middle (25% to 75%): both labels show.
  // When moved to left (< 25%): only After label shows.
  // When moved to right (> 75%): only Before label shows.
  const showBeforeBadge = sliderPosition >= 25;
  const showAfterBadge = sliderPosition <= 75;

  return (
    <div className={`group relative rounded-2xl sm:rounded-[22px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-charcoal/25 hover:border-charcoal/50 bg-charcoal/5 ${className}`}>
      {/* Slider Visual Container with 16:9 widescreen aspect ratio and touchAction: none */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        style={{ touchAction: 'none' }}
        className="relative aspect-[16/9] w-full overflow-hidden select-none cursor-ew-resize bg-charcoal/10 touch-none"
        role="region"
        aria-label={`Before and after comparison for ${title || 'project'}`}
      >
        {/* Layer 1: BEFORE Image (revealed on the left) */}
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
          loading="lazy"
        />

        {/* Layer 2: AFTER Image (revealed on the right) */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none select-none"
          style={{
            clipPath: `inset(0 0 0 ${sliderPosition}%)`,
            WebkitClipPath: `inset(0 0 0 ${sliderPosition}%)`,
          }}
        >
          <img
            src={afterSrc}
            alt={afterAlt}
            className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
            loading="lazy"
          />
        </div>

        {/* Subtle Edge Gradients for badge contrast */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-charcoal/40 to-transparent pointer-events-none" />

        {/* Before Badge (Left) - hides when slider moves to the left */}
        <div
          className={`absolute top-2.5 left-2.5 pointer-events-none z-10 transition-all duration-300 ${
            showBeforeBadge ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-charcoal/80 text-sand backdrop-blur-md shadow-sm border border-white/10">
            {beforeLabel}
          </span>
        </div>

        {/* After Badge (Right) - hides when slider moves to the right */}
        <div
          className={`absolute top-2.5 right-2.5 pointer-events-none z-10 transition-all duration-300 ${
            showAfterBadge ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-primary-400 text-white backdrop-blur-md shadow-sm border border-white/20">
            {afterLabel}
          </span>
        </div>

        {/* Fullscreen / Lightbox Trigger Button */}
        {onOpenLightbox && (
          <button
            type="button"
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onOpenLightbox();
            }}
            className="absolute bottom-2.5 right-2.5 z-30 w-7 h-7 flex items-center justify-center rounded-full bg-charcoal/85 hover:bg-charcoal text-white hover:scale-110 active:scale-95 backdrop-blur-md transition-all duration-200 shadow-md cursor-pointer border border-white/20"
            title="Expand to Fullscreen"
            aria-label="Expand to Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5 text-white pointer-events-none" />
          </button>
        )}

        {/* Drag Hint overlay on hover */}
        <div className="absolute bottom-2.5 left-2.5 pointer-events-none z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] tracking-wide font-medium bg-black/40 text-white/90 backdrop-blur-sm">
            <span>&larr;</span> Drag <span>&rarr;</span>
          </span>
        </div>

        {/* Vertical Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)] z-20 pointer-events-none transition-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Centered Circular Handle Knob */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white text-charcoal shadow-md border-2 border-primary-400 flex items-center justify-center transition-transform duration-150 ${
              isDragging ? 'scale-110 shadow-xl' : 'group-hover:scale-105'
            }`}
          >
            <svg
              className="w-3.5 h-3.5 text-charcoal/80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3m8-6l3 3-3 3" />
            </svg>
          </div>
        </div>

        {/* Accessible Range Input for Keyboard Nav */}
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(sliderPosition)}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          aria-label={`Slide between ${beforeLabel} and ${afterLabel} for ${title}`}
          className="sr-only"
        />
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
