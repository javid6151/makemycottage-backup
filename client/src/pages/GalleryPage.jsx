import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { SlidersHorizontal, ChevronLeft, ChevronRight, X, ArrowLeftRight, Sparkles, ArrowDown } from 'lucide-react';
import AnimatedSection from '../components/common/AnimatedSection';
import SectionLabel from '../components/common/SectionLabel';
import BeforeAfterSlider from '../components/gallery/BeforeAfterSlider';
import GalleryVideoCard from '../components/gallery/GalleryVideoCard';
import { galleryProjects } from '../components/gallery/galleryData';
import { pauseAllGalleryVideos } from '../components/gallery/galleryVideoManager';
import GalleryHeroImage from '../components/gallery/GalleryHeroImage';
import OurProjectsCard from '../components/gallery/OurProjectsCard';

const categories = ['All', 'Homes', 'Cottages', 'Interiors', 'Outdoor', 'Details'];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [lightboxPosition, setLightboxPosition] = useState(50);
  const [lightboxDragging, setLightboxDragging] = useState(false);
  const lightboxRef = useRef(null);

  // Smooth scroll depth transitions for hero section
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 480], [1, 0.94]);
  const heroOpacity = useTransform(scrollY, [0, 520], [1, 0.72]);
  const heroY = useTransform(scrollY, [0, 500], [0, -18]);

  const filteredProjects = activeCategory === 'All'
    ? galleryProjects
    : galleryProjects.filter((item) => item.category === activeCategory);

  const openLightbox = (index) => {
    pauseAllGalleryVideos();
    setLightboxIndex(index);
    setLightboxPosition(50);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    pauseAllGalleryVideos();
    setLightboxIndex(null);
    document.body.style.overflow = 'auto';
  }, []);

  const nextProject = useCallback(() => {
    if (lightboxIndex === null) return;
    pauseAllGalleryVideos();
    setLightboxIndex((prev) => (prev + 1) % filteredProjects.length);
    setLightboxPosition(50);
  }, [lightboxIndex, filteredProjects.length]);

  const prevProject = useCallback(() => {
    if (lightboxIndex === null) return;
    pauseAllGalleryVideos();
    setLightboxIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    setLightboxPosition(50);
  }, [lightboxIndex, filteredProjects.length]);

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextProject();
      if (e.key === 'ArrowLeft') prevProject();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextProject, prevProject]);

  // Lightbox slider pointer movement
  const handleLightboxMove = useCallback((clientX) => {
    if (!lightboxRef.current) return;
    const rect = lightboxRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setLightboxPosition(percentage);
  }, []);

  const handleLightboxPointerDown = (e) => {
    setLightboxDragging(true);
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch {
      // Fallback
    }
    handleLightboxMove(e.clientX);
  };

  const handleLightboxPointerMove = (e) => {
    if (!lightboxDragging) return;
    handleLightboxMove(e.clientX);
  };

  const handleLightboxPointerUp = (e) => {
    setLightboxDragging(false);
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore
    }
  };

  // Dedicated touch event handlers for mobile devices
  const handleLightboxTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      setLightboxDragging(true);
      handleLightboxMove(e.touches[0].clientX);
    }
  };

  const handleLightboxTouchMove = (e) => {
    if (!lightboxDragging) return;
    if (e.touches && e.touches[0]) {
      handleLightboxMove(e.touches[0].clientX);
    }
  };

  const handleLightboxTouchEnd = () => {
    setLightboxDragging(false);
  };

  const currentProject = lightboxIndex !== null ? filteredProjects[lightboxIndex] : null;

  return (
    <div className="bg-white min-h-screen w-full pb-24 font-['Manrope',sans-serif] pt-3 sm:pt-4">
      <Helmet>
        <title>Our Gallery | MakeMyCottage</title>
        <meta
          name="description"
          content="A curated visual collection of MakeMyCottage work across handcrafted wooden cottages, timber homes, luxury interiors, and architectural transformations."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Unified Gallery Section: Hero Banner + Filter Controls + Project Grid */}
      <section className="w-full max-w-[1560px] mx-auto px-3 sm:px-5 md:px-8">
        {/* Architectural Hero Banner */}
        <motion.div
          style={{
            scale: heroScale,
            opacity: heroOpacity,
          }}
          className="relative w-full h-[calc(86vh-2rem)] min-h-[500px] max-h-[660px] mb-8 sm:mb-10 origin-top"
        >
          {/* Component 1: Hero Image Banner Component */}
          <GalleryHeroImage
            src="/images/gallery-hero.png"
            alt="Snow covered modern glass cottage - MakeMyCottage Gallery"
          />

          {/* Component 2: Our Projects / Our Gallery Card Component */}
          <div className="absolute bottom-0 left-0 z-20 pointer-events-auto">
            <OurProjectsCard title="Our Gallery" />
          </div>
        </motion.div>

        {/* Category Filter Pills (Sticky below navbar while browsing all 51 projects) */}
        <div className="sticky top-20 sm:top-24 z-30 bg-white/95 backdrop-blur-md py-3 sm:py-4 mb-6 sm:mb-8 flex flex-wrap items-center gap-2.5 sm:gap-3 border-b border-gray-100/80">
            {categories.map((category) => {
              const displayName = category === 'All' ? 'All Images' : category;
              const count = category === 'All' 
                ? galleryProjects.length 
                : galleryProjects.filter(p => p.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-sm sm:text-[15px] font-['Manrope',sans-serif] tracking-normal transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    activeCategory === category
                      ? 'bg-[#28282c] text-white font-semibold shadow-sm'
                      : 'bg-[#e9ecf2] text-[#28282c] hover:bg-[#dfe3ea] font-medium'
                  }`}
                >
                  <span>{displayName}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-normal ${
                    activeCategory === category ? 'bg-white/20 text-white' : 'bg-black/10 text-[#28282c]/80'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Main Gallery Grid Body */}
          <div id="gallery-grid" className="w-full">

        {/* Continuous 3-Column Scrollable Grid with generous spacing */}
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const col = index % 3;
                const row = Math.floor(index / 3);
                // Stagger delay: on initial page view (first 3 rows), cascade row-by-row and item-by-item.
                // On scroll down, each row staggers smoothly: Column 0 (image) -> Column 1 (video/middle) -> Column 2 (image)
                const staggerDelay = row < 3 
                  ? (row * 0.16 + col * 0.12)
                  : (col * 0.14);

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 32, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-20px', amount: 0.12 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    transition={{
                      duration: 0.55,
                      delay: staggerDelay,
                      ease: [0.16, 1, 0.3, 1], // Smooth Apple-style fluid easing
                    }}
                    className="w-full flex"
                  >
                  {project.type === 'video' ? (
                    <GalleryVideoCard
                      id={project.id}
                      videoId={project.videoId}
                      title={project.title}
                      category={project.category}
                      className="w-full"
                    />
                  ) : (
                    <BeforeAfterSlider
                      beforeSrc={project.beforeSrc}
                      afterSrc={project.afterSrc}
                      beforeLabel={project.beforeLabel || 'BEFORE'}
                      afterLabel={project.afterLabel || 'AFTER'}
                      title={project.title}
                      onOpenLightbox={() => openLightbox(index)}
                      className="w-full"
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-charcoal/60 font-serif text-xl">No projects found in this category.</p>
              <button
                onClick={() => setActiveCategory('All')}
                className="mt-4 px-6 py-2.5 rounded-full bg-charcoal text-white text-xs uppercase tracking-widest font-medium"
              >
                Reset Filter
              </button>
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>

      {/* Fullscreen Interactive Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && currentProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-charcoal/95 flex flex-col items-center justify-between p-4 md:p-8 backdrop-blur-md"
          >
            {/* Lightbox Top Bar */}
            <div className="w-full max-w-6xl flex items-center justify-between text-white z-50 py-2">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-widest text-sand/70 font-medium">
                  {currentProject.category} &bull; {currentProject.type === 'video' ? 'Featured Video' : `Transformation ${lightboxIndex + 1} of ${filteredProjects.length}`}
                </span>
                <h2 className="font-serif text-xl md:text-2xl text-white font-medium">
                  {currentProject.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close Fullscreen View"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Interactive Viewport */}
            <div className="relative w-full max-w-6xl flex-1 my-4 flex items-center justify-center">
              {/* Previous Button */}
              <button
                type="button"
                onClick={prevProject}
                className="absolute left-2 md:-left-12 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all -translate-y-1/2 top-1/2 shadow-lg"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={nextProject}
                className="absolute right-2 md:-right-12 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all -translate-y-1/2 top-1/2 shadow-lg"
                aria-label="Next Project"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Central Box (Video Player or Before/After Comparison Slider) */}
              {currentProject.type === 'video' ? (
                <div className="relative w-full h-[65vh] md:h-[75vh] max-h-[750px] rounded-xl overflow-hidden bg-black shadow-2xl border border-white/10 flex items-center justify-center">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentProject.videoId}?autoplay=1&mute=1&controls=1&enablejsapi=1&rel=0`}
                    title={currentProject.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                <div
                  ref={lightboxRef}
                  onPointerDown={handleLightboxPointerDown}
                  onPointerMove={handleLightboxPointerMove}
                  onPointerUp={handleLightboxPointerUp}
                  onPointerCancel={handleLightboxPointerUp}
                  onTouchStart={handleLightboxTouchStart}
                  onTouchMove={handleLightboxTouchMove}
                  onTouchEnd={handleLightboxTouchEnd}
                  onTouchCancel={handleLightboxTouchEnd}
                  style={{ touchAction: 'none' }}
                  className="relative w-full h-[65vh] md:h-[75vh] max-h-[750px] rounded-xl overflow-hidden select-none cursor-ew-resize bg-black/40 border border-white/10 shadow-2xl touch-none"
                >
                  {/* Layer 1: BEFORE Image (revealed on the left) */}
                  <img
                    src={currentProject.beforeSrc}
                    alt={currentProject.beforeLabel}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />

                  {/* Layer 2: AFTER Image (revealed on the right) */}
                  <div
                    className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                    style={{
                      clipPath: `inset(0 0 0 ${lightboxPosition}%)`,
                      WebkitClipPath: `inset(0 0 0 ${lightboxPosition}%)`,
                    }}
                  >
                    <img
                      src={currentProject.afterSrc}
                      alt={currentProject.afterLabel}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                  </div>

                  {/* Floating Badges */}
                  {/* Before Badge (Left) - hides when slider moved towards the left */}
                  <div
                    className={`absolute top-4 left-4 z-20 pointer-events-none transition-all duration-300 ${
                      lightboxPosition >= 25 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`}
                  >
                    <span className="px-3 py-1.5 rounded-md text-xs font-semibold tracking-wider uppercase bg-black/80 text-sand border border-white/10 backdrop-blur-md shadow-md">
                      {currentProject.beforeLabel}
                    </span>
                  </div>

                  {/* After Badge (Right) - hides when slider moved towards the right */}
                  <div
                    className={`absolute top-4 right-4 z-20 pointer-events-none transition-all duration-300 ${
                      lightboxPosition <= 75 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`}
                  >
                    <span className="px-3 py-1.5 rounded-md text-xs font-semibold tracking-wider uppercase bg-primary-400 text-white border border-white/20 backdrop-blur-md shadow-md">
                      {currentProject.afterLabel}
                    </span>
                  </div>

                  {/* Divider Line in Lightbox */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_15px_rgba(0,0,0,0.8)] z-30 pointer-events-none"
                    style={{ left: `${lightboxPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-charcoal shadow-2xl border-2 border-primary-400 flex items-center justify-center">
                      <ArrowLeftRight className="w-5 h-5 text-charcoal" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Lightbox Bottom Controls */}
            <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 text-white/80 py-2">
              <p className="text-xs md:text-sm text-center sm:text-left text-sand/80 max-w-xl font-light">
                {currentProject.description || currentProject.title}
              </p>

              {currentProject.type !== 'video' && (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setLightboxPosition(0)}
                    className={`px-3 py-1 text-xs rounded transition-colors ${
                      lightboxPosition < 15 ? 'bg-primary-400 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    Show After
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxPosition(50)}
                    className="px-3 py-1 text-xs rounded bg-white/10 hover:bg-white/20 text-white"
                  >
                    50 / 50
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxPosition(100)}
                    className={`px-3 py-1 text-xs rounded transition-colors ${
                      lightboxPosition > 85 ? 'bg-primary-400 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    Show Before
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
