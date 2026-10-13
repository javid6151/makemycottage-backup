import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { PROJECTS_DATA, BUSINESS_INFO } from '../utils/constants';

// Minimal Vintage Timber Project Card Component
const VintageProjectCard = ({ project, isExpanded, onMouseEnter, onMouseLeave }) => {
  return (
    <Link
      to={`/projects/${project.slug}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group relative flex flex-col justify-between w-full h-[470px] sm:h-[490px] md:h-[510px] rounded-[24px] sm:rounded-[28px] overflow-hidden border transition-all duration-600 ease-out bg-[#1c1d21] cursor-pointer block no-underline ${
        isExpanded
          ? 'border-black/20 shadow-[0_16px_40px_rgba(0,0,0,0.14)]'
          : 'border-black/[0.08] hover:border-black/20 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
      }`}
    >
      {/* Background Project Image Layer with subtle 1.03-1.04 zoom */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.name}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transform-none ${
            isExpanded ? 'scale-[1.035]' : 'scale-100 group-hover:scale-[1.035]'
          }`}
        />
        {/* Soft Natural Vignette Gradient Overlay - Bright & Clean */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent transition-opacity duration-500" />
      </div>

      {/* Top Floating Badge: Architectural Category Pill (Clean Resentii Style - No AI Dot) */}
      <div className="relative z-10 p-5 flex items-center justify-between w-full">
        <span
          className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-300 shadow-sm ${
            isExpanded
              ? 'bg-white text-[#141517] shadow-md border border-black/10'
              : 'bg-[#1c1d21]/80 backdrop-blur-md text-white/90 border border-white/15'
          }`}
        >
          {project.category}
        </span>
      </div>

      {/* Bottom Information Panel: Pure Luminous Light Surface */}
      <div className={`relative z-10 m-3.5 sm:m-4 p-5 sm:p-6 rounded-[20px] bg-white/95 backdrop-blur-md border transition-all duration-600 ease-out overflow-hidden ${
        isExpanded
          ? 'border-black/[0.08] shadow-[0_14px_36px_rgba(0,0,0,0.10)] -translate-y-1'
          : 'border-black/[0.06] shadow-[0_6px_24px_rgba(0,0,0,0.06)]'
      }`}>
        {/* Title Row with Crisp Editorial Typography & Circular Arrow Button */}
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-serif text-xl sm:text-[22px] text-[#141517] font-normal tracking-tight leading-snug group-hover:text-[#8C6544] transition-colors duration-300 flex-1">
              {project.name}
            </h3>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
              isExpanded
                ? 'bg-[#141517] text-white shadow-sm'
                : 'bg-black/[0.04] text-[#141517] group-hover:bg-black/[0.08]'
            }`}>
              <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${
                isExpanded ? 'translate-x-0.5 -translate-y-0.5' : 'translate-x-0 translate-y-0'
              }`} />
            </div>
          </div>
        </div>

        {/* Expandable Details Container: 500-700ms ease-out sequence */}
        <div
          className={`grid transition-[grid-template-rows] duration-600 ease-out motion-reduce:transition-none ${
            isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div
              className={`transition-all duration-500 ease-out transform motion-reduce:transform-none ${
                isExpanded
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-2.5'
              }`}
              style={{ transitionDelay: isExpanded ? '75ms' : '0ms' }}
            >
              {/* Project Description in clean, legible neutral text */}
              <p className="font-sans text-xs sm:text-[13px] text-[#555866] line-clamp-2 mt-2.5 leading-relaxed font-light">
                {project.shortDescription}
              </p>

              {/* Clean Hairline Divider Line (Revealed in Sequence) */}
              <div
                className={`h-[1px] bg-black/[0.06] my-3.5 transition-opacity duration-400 ease-out ${
                  isExpanded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: isExpanded ? '150ms' : '0ms' }}
              />

              {/* Metadata Row: Location Pin */}
              <div
                className={`flex items-center text-xs font-sans text-[#555866] font-medium pt-0.5 transition-all duration-500 ease-out transform ${
                  isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'
                }`}
                style={{ transitionDelay: isExpanded ? '200ms' : '0ms' }}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#8C6544] shrink-0" />
                  <span className="truncate text-[#555866] font-medium">{project.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [activeCardId, setActiveCardId] = useState(null);

  // Responsive hero dimensions: 88% of full screen (viewport height) for base height
  const getHeroDims = () => {
    if (typeof window === 'undefined') return { base: 780, shrunk: 360 };
    const vh = window.innerHeight;
    const base = Math.round(vh * 0.88);
    // Keep shrunk height compact and proportional
    const shrunk = Math.max(300, Math.min(380, Math.round(base * 0.45)));
    return { base, shrunk };
  };

  const [heroDims, setHeroDims] = useState(getHeroDims);

  useEffect(() => {
    const handleResize = () => {
      setHeroDims(getHeroDims());
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollY } = useScroll();
  const cardHeight = useTransform(scrollY, (value) => {
    const distance = heroDims.base - heroDims.shrunk;
    if (value <= 0) return `${heroDims.base}px`;
    if (value >= distance) return `${heroDims.shrunk}px`;
    const progress = value / distance;
    const h = heroDims.base - progress * (heroDims.base - heroDims.shrunk);
    return `${h}px`;
  });

  const categories = [
    'All Projects',
    'Wooden Home',
    'Farm House',
    'Cottage',
    'Resort Cottage',
    'Custom Structures'
  ];

  const filteredProjects = selectedCategory === 'All Projects'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) =>
        p.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  return (
    <div className="bg-[#ffffff] min-h-screen w-full text-[#141517] selection:bg-[#28282c] selection:text-white">
      <Helmet>
        <title>Our Projects | Make My Cottage - Handcrafted Wooden Homes</title>
        <meta
          name="description"
          content="Explore our portfolio of handcrafted wooden homes, luxury farmhouses, cottages, and prefabricated modular timber villas across India."
        />
      </Helmet>

      {/* =========================================================================
          1. HERO SECTION (Classic Handcrafted Timber Cottage Hero with Scroll Animation - 88vh Full Screen Scale)
      ========================================================================= */}
      <section className="relative w-full max-w-[1440px] mx-auto p-3 sm:p-4 md:p-5">
        {/* Pinned Hero Track */}
        <div 
          className="relative w-full"
          style={{ height: `${heroDims.base}px` }}
        >
          {/* Shrinking Hero Card (Sticky at top, bottom shrinks upward) */}
          <motion.div
            style={{ height: cardHeight }}
            className="sticky top-3 sm:top-4 md:top-5 w-full rounded-t-[28px] sm:rounded-t-[32px] rounded-br-[28px] sm:rounded-br-[32px] rounded-bl-none overflow-hidden bg-[#1c1d21] flex flex-col justify-end shadow-sm"
          >
            {/* Background Architectural Photo (Constant base height so image remains fixed/constant at 88% full-screen) */}
            <div
              style={{ height: `${heroDims.base}px` }}
              className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none"
            >
              <motion.div
                initial={{ scale: 1.08, opacity: 0.9 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1920&q=85"
                  alt="Make My Cottage - Handcrafted Wooden Homes & Cottages"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                {/* Multi-Stop Gradient Overlay: Dark at top for transparent navbar mixing, dark at bottom for notch contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/15 to-black/60 pointer-events-none" />
              </motion.div>
            </div>

            {/* Signature Inverted Notch Button (Sitting at bottom-left, glides upwards over image as card shrinks) */}
            <div className="relative z-10 flex items-end">
              <div className="bg-white pt-3 sm:pt-4 pr-3.5 sm:pr-4 pb-0 pl-0 rounded-tr-[28px] sm:rounded-tr-[32px] relative">
                {/* Top Concave Fillet Curve */}
                <div className="absolute -top-[20px] left-0 w-5 h-5 pointer-events-none">
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 block">
                    <path d="M0 20L0 0C0 11.0457 8.9543 20 20 20L0 20Z" fill="#ffffff" />
                  </svg>
                </div>

                {/* Right Concave Fillet Curve */}
                <div className="absolute bottom-0 -right-[20px] w-5 h-5 pointer-events-none">
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 block">
                    <path d="M0 20H20C8.9543 20 0 11.0457 0 0V20Z" fill="#ffffff" />
                  </svg>
                </div>

                {/* The Dark Pill Badge with Clean Sans-Serif Title Case */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 15 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.7, delay: 0.15 }}
                  className="bg-[#28282c] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-[20px] sm:rounded-[24px] flex items-center shadow-sm"
                >
                  <h1 className="font-sans text-3xl sm:text-5xl md:text-[54px] font-normal tracking-tight text-white leading-none">
                    Our Projects
                  </h1>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* White Background Wrapper for the Downward Content */}
        <div className="bg-white pt-8 sm:pt-10 px-2 sm:px-4">
            {/* Category Filter Tabs */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-3 mb-8 sm:mb-10 no-scrollbar"
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-[50px] text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-300 ease-out cursor-pointer ${
                      isActive
                        ? 'bg-[#28282c] text-white shadow-sm'
                        : 'bg-[#e9ecf2] text-[#555866] hover:bg-[#dfe3ec] hover:text-[#141517]'
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                );
              })}
            </motion.div>

            {/* =========================================================================
                2. PROJECT CARDS GRID (3-Column Layout, Spring Pop & Hover Interaction)
            ========================================================================= */}
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 pb-20 sm:pb-28"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => {
                  const isExpanded = activeCardId === project.id;

                  return (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.82, y: 35 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.08 }}
                      exit={{ opacity: 0, scale: 0.82, y: -10 }}
                      transition={{
                        type: 'spring',
                        bounce: 0.22,
                        duration: 0.65,
                        delay: idx * 0.07
                      }}
                    >
                      <VintageProjectCard
                        project={project}
                        isExpanded={isExpanded}
                        onMouseEnter={() => setActiveCardId(project.id)}
                        onMouseLeave={() => setActiveCardId((prev) => (prev === project.id ? null : prev))}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
      </section>



      {/* =========================================================================
          4. CTA BANNER (Resentii "Ready to Transform Your Space?" Component)
      ========================================================================= */}
      {/* =========================================================================
          4. CTA BANNER (Full-Bleed Architectural Wooden Cottage Banner)
      ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#0c0d10] py-24 sm:py-32 md:py-40 border-t border-black/[0.08]">
        {/* Full-Bleed Architectural Wooden Cottage Background Image Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1920&q=85"
            alt="Handcrafted Wooden Cottage Architecture in Nature"
            className="w-full h-full object-cover opacity-50 scale-105 transform motion-reduce:transform-none"
            loading="lazy"
          />
          {/* Cinematic Multi-Stop Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/80 to-[#0c0d10]/65" />
          {/* Ambient Warm Radial Backdrops */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#8C6544]/20 rounded-full blur-[140px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
          {/* Editorial Heading */}
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl text-white font-normal tracking-tight leading-[1.06] mb-6">
            Ready to Transform Your Space?
          </h2>

          {/* Subtext */}
          <p className="font-sans text-[#d0d1db] text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
            Every great space starts with a single conversation. Let's talk about your vision and bring it to life together.
          </p>

          {/* Action Button: Signature White Pill with Brown Arrow Badge */}
          <div className="flex items-center justify-center">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-4 pl-8 pr-2.5 py-2.5 rounded-full bg-white text-[#141517] hover:bg-white font-sans font-medium text-base tracking-normal transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_45px_rgba(0,0,0,0.45)] hover:scale-105 active:scale-95"
            >
              <span className="font-semibold text-black tracking-tight">
                Let's Talk
              </span>
              <span className="w-12 h-12 rounded-full bg-[#855836] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shadow-sm">
                <ArrowRight className="w-5 h-5 text-white" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
