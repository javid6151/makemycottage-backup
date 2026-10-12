import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiArrowNarrowRight, 
  HiX, 
  HiOutlineChevronLeft, 
  HiOutlineChevronRight
} from 'react-icons/hi';
import CurvedSlider from '../components/common/CurvedSlider';
import FoldText from '../components/common/FoldText';
import ScrollRevealText from '../components/common/ScrollRevealText';
import ScrollTimeline from '../components/common/ScrollTimeline';
import ServicesTextRotate from '../components/common/ServicesTextRotate';
import CurvedRibbonShowcase from '../components/common/CurvedRibbonShowcase';
import FAQSection from '../components/common/FAQSection';
import { 
  BUSINESS_INFO, 
  SERVICES 
} from '../utils/constants';

// Gallery dataset with categories for interactive lightbox
const GALLERY_ITEMS = [
  { id: 1, title: 'Woodland Verandah & Truss Detailing', category: 'Homes', image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=80', location: 'Shamshabad' },
  { id: 2, title: 'Heritage Timber Farmhouse Living', category: 'Interiors', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', location: 'Chevella' },
  { id: 3, title: 'Cedar Beam Structural Joinery', category: 'Details', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80', location: 'Joinery Workshop' },
  { id: 4, title: 'Hilltop Pine Cabin Vista', category: 'Cottages', image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&q=80', location: 'Ananthagiri Hills' },
  { id: 5, title: 'Lakeside Wooden Deck & Pergola', category: 'Outdoor', image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1200&q=80', location: 'Shamirpet' },
  { id: 6, title: 'On-Site Precision Timber Framing', category: 'Construction', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80', location: 'Site Work' },
  { id: 7, title: 'Resort Cottage Glass-Wood Facade', category: 'Cottages', image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=1200&q=80', location: 'Nagarjuna Sagar' },
  { id: 8, title: 'Prefabricated Modular Timber Villa', category: 'Completed Projects', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80', location: 'Vikarabad' },
];

const VALUES = [
  {
    num: '01',
    label: '01 — Quality First',
    title: 'Custom Architecture',
    desc: 'Every project begins with your unique vision and landscape topography. We do not use generic templates—each home is designed to belong.'
  },
  {
    num: '02',
    label: '02 — Reliability',
    title: 'Turnkey Partnership',
    desc: 'From initial design blueprints to foundation and key handover, we maintain single-point accountability and keep all commitments.'
  },
  {
    num: '03',
    label: '03 — Precision',
    title: 'Every Detail Matters',
    desc: 'Precision interlocking joinery, weather-sealed joints, and carefully treated timber guarantee longevity in every element of construction.'
  },
  {
    num: '04',
    label: '04 — Integrity',
    title: 'Built on Trust',
    desc: 'Transparent bill of quantities, realistic scheduling, and open site updates ensure your peace of mind throughout the entire build.'
  },
  {
    num: '05',
    label: '05 — Innovation',
    title: 'Better Building',
    desc: 'We integrate modern prefabricated timber methods with classical woodworking to achieve speed without compromising craftsmanship.'
  },
  {
    num: '06',
    label: '06 — Craftsmanship',
    title: 'Master Woodworking',
    desc: 'Our specialized timber carpenters and engineers bring decades of collective skill, crafting spaces you will feel proud to call home.'
  }
];


const INSTAGRAM_POSTS = [
  { id: 1, image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=600&q=80', caption: 'Handcrafted timber frames ready for roof trusses in Shamshabad' },
  { id: 2, image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&q=80', caption: 'Sunset hues hitting the cedar cladding of our Chevella farmstead' },
  { id: 3, image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=600&q=80', caption: 'Morning mist in Ananthagiri Hills around the Pine Valley build' },
  { id: 4, image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600&q=80', caption: 'Lakeside deck installation in progress at Shamirpet' },
  { id: 5, image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600&q=80', caption: 'Completed resort cottage units ready for luxury hospitality handover' },
  { id: 6, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80', caption: 'Modular prefabricated assembly achieved in just 45 days in Vikarabad' },
];

const HomePage = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);

  return (
    <div className="w-full bg-[#f5f2f2] text-[#141517] font-body selection:bg-black selection:text-white">

      {/* =========================================================================
          01 — HERO SECTION (Exact Bildora Screenshot Clone)
      ========================================================================= */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center text-center px-4 sm:px-6 overflow-hidden">
        {/* Background Image: the EXACT architectural courtyard image from Bildora screenshot */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url('https://framerusercontent.com/images/ZFWB4UKSVPCnIlBqsZjow92egU8.jpg')`
          }}
        />
        
        {/* Subtle Dark Vignette / Overlay to ensure crystal-clear text readability */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none z-0" />

        {/* Centered Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center pt-24 pb-16 px-4">
          
          {/* Eyebrow Pill (Exact from Screenshot: • YOUR VISION. OUR CRAFT.) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs uppercase tracking-[0.2em] font-medium mb-8 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>YOUR VISION. OUR CRAFT.</span>
          </motion.div>

          {/* Main Headline (Exact text and typography scale from Screenshot) */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-[5.8rem] font-medium text-white tracking-tight leading-[1.05] mb-6 drop-shadow-md"
          >
            We Build What<br />Moves You Forward.
          </motion.h1>

          {/* Supporting Text (Exact paragraph from Screenshot) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white/90 font-light max-w-2xl leading-relaxed mb-10 drop-shadow-sm"
          >
            Make My Cottage brings together expert craftsmanship, thoughtful planning, and reliable execution to create spaces made to perform, endure, and inspire.
          </motion.p>

          {/* CTA Button (Exact White Pill Button from Screenshot: Build With Us →) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm sm:text-base hover:bg-white/95 hover:scale-105 transition-all duration-300 shadow-xl group cursor-pointer"
            >
              <span>Build With Us</span>
              <HiArrowNarrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>



      {/* =========================================================================
          02 — ABOUT US SECTION WITH 3D CURVED THREE.JS SLIDER (Exact Bildora Screenshot)
      ========================================================================= */}
      <section className="pt-16 pb-12 md:pt-20 md:pb-16 px-0 max-w-full mx-auto text-center overflow-hidden">
        {/* About Us Pill & Big Editorial Scroll Reveal Heading */}
        <div className="px-4 sm:px-6 md:px-10 max-w-5xl mx-auto mb-0 sm:mb-1">
          {/* About Us Tag Pill (Exact from Bildora Screenshot) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e3e3de] text-xs font-semibold text-[#ff4b18] shadow-sm mb-4">
            <span>About Us</span>
          </div>

          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[2.85rem] font-normal leading-[1.22] sm:leading-[1.25] mx-auto tracking-tight text-center">
            <ScrollRevealText
              lines={[
                "With decades of experience, we specialize in",
                "turning ideas into well-designed structures",
                "that stand the test of time."
              ]}
            />
          </h2>
        </div>

        {/* THREE.JS 3D CURVED PERSPECTIVE CYLINDER SLIDER (TIGHTENED DISTANCE FROM TEXT) */}
        <div className="mt-0 mb-2 w-full overflow-hidden">
          <CurvedSlider />
        </div>

        {/* 4 STAT METRICS DIRECTLY UNDER CURVED SLIDER (Exact from Bildora Screenshot) */}
        <div className="px-4 sm:px-6 md:px-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-2 sm:mt-3 pt-0">
            <div className="text-center">
              <div className="font-sans text-3xl sm:text-4xl md:text-[2.6rem] text-[#141517] font-normal mb-1 tracking-tight">
                12+
              </div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#777] font-medium">
                Years of Experience
              </div>
            </div>
            <div className="text-center">
              <div className="font-sans text-3xl sm:text-4xl md:text-[2.6rem] text-[#141517] font-normal mb-1 tracking-tight">
                250+
              </div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#777] font-medium">
                Projects Completed
              </div>
            </div>
            <div className="text-center">
              <div className="font-sans text-3xl sm:text-4xl md:text-[2.6rem] text-[#141517] font-normal mb-1 tracking-tight">
                4.8/5
              </div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#777] font-medium">
                Client Satisfaction
              </div>
            </div>
            <div className="text-center">
              <div className="font-sans text-3xl sm:text-4xl md:text-[2.6rem] text-[#141517] font-normal mb-1 tracking-tight">
                98%
              </div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#777] font-medium">
                On-Time Delivery
              </div>
            </div>
          </div>
        </div>
    </section>

      {/* =========================================================================
          03 — PROJECTS SHOWCASE SECTION (Interactive Text Rotate)
      ========================================================================= */}
      <section id="projects" className="scroll-mt-24 w-full bg-white border-t border-[#e3e3de] relative">
        <div id="services" className="absolute -top-24 left-0 pointer-events-none" />
        {/* INTERACTIVE TEXT ROTATE PROJECTS SHOWCASE */}
        <ServicesTextRotate onSelectServiceModal={setSelectedServiceModal} />
      </section>

      {/* =========================================================================
          04 — VALUES SECTION (Bildora Interactive Scroll Timeline)
      ========================================================================= */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto border-t border-[#e3e3de]">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e3e3de] text-xs font-semibold text-[#141517] mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff4b18]" />
            <span>Values</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl text-[#1E2530] font-normal leading-[1.1] mb-6 tracking-tight">
            Built on Values. Driven by Quality.
          </h2>
          <p className="text-base sm:text-lg text-[#555] font-light leading-relaxed max-w-2xl mx-auto">
            We combine honest communication, thoughtful planning, and dependable craftsmanship to deliver construction projects that stand strong and create lasting value.
          </p>
        </div>

        {/* INTERACTIVE SCROLL PROGRESS TIMELINE */}
        <ScrollTimeline />
      </section>






      {/* =========================================================================
          08 — GALLERY SECTION WITH LIGHTBOX
      ========================================================================= */}
      <section id="gallery" className="py-20 md:py-32 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto border-t border-[#e3e3de]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#141517] text-white border border-white/10 text-[11px] font-medium uppercase tracking-[0.2em] shadow-md mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4b18] shadow-[0_0_8px_rgba(255,75,24,0.8)]" />
              <span>Gallery</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl text-[#141517] uppercase leading-[0.95]">
              A closer look.
            </h2>
          </div>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#141517] text-white hover:bg-black/80 text-xs uppercase tracking-widest font-semibold transition-all duration-300 self-start md:self-auto shadow-sm"
          >
            <span>Explore Full Gallery</span>
            <HiArrowNarrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-[#e3e3de] shadow-sm hover:shadow-xl transition-all duration-300 relative aspect-[4/5]"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white">
                <span className="self-end px-3 py-1 rounded-full text-[10px] uppercase tracking-wider bg-white/20 backdrop-blur-md">
                  {item.category}
                </span>
                <div>
                  <h4 className="font-heading text-xl text-white">{item.title}</h4>
                  <p className="text-xs text-white/70 mt-1">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-50"
              aria-label="Close Lightbox"
            >
              <HiX className="w-6 h-6" />
            </button>

            <button
              onClick={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : GALLERY_ITEMS.length - 1))}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-50"
              aria-label="Previous image"
            >
              <HiOutlineChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => setLightboxIndex((prev) => (prev < GALLERY_ITEMS.length - 1 ? prev + 1 : 0))}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-50"
              aria-label="Next image"
            >
              <HiOutlineChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
              <img
                src={GALLERY_ITEMS[lightboxIndex].image}
                alt={GALLERY_ITEMS[lightboxIndex].title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
              />
              <div className="text-center text-white mt-4">
                <h4 className="font-heading text-2xl">{GALLERY_ITEMS[lightboxIndex].title}</h4>
                <p className="text-xs text-white/60 uppercase tracking-widest mt-1">
                  {GALLERY_ITEMS[lightboxIndex].category} &middot; {GALLERY_ITEMS[lightboxIndex].location}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Service Details Modal */}
        {selectedServiceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedServiceModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#e3e3de] p-6 sm:p-8 relative text-[#141517]"
            >
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#141517] transition-all"
                aria-label="Close modal"
              >
                <HiX className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="font-heading text-2xl text-accent-terracotta font-medium">
                  {selectedServiceModal.num}
                </span>
                <span className="w-8 h-[1px] bg-black/15" />
                <span className="text-xs uppercase tracking-widest text-[#888]">
                  Turnkey Construction
                </span>
              </div>

              <h3 className="font-heading text-3xl sm:text-4xl text-[#141517] uppercase mb-4">
                {selectedServiceModal.title}
              </h3>

              <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-6 bg-black/5 shadow-md">
                <img
                  src={selectedServiceModal.image}
                  alt={selectedServiceModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-base text-[#555] font-light leading-relaxed mb-6">
                {selectedServiceModal.description}
              </p>

              <div className="bg-[#f9f8f6] rounded-2xl p-5 mb-6 border border-[#e3e3de]/60 space-y-3">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#141517]">
                  What&apos;s Included:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#555]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-terracotta" />
                    <span>Custom 3D Architectural Blueprint</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-terracotta" />
                    <span>100% Termite Treated Timber</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-terracotta" />
                    <span>Weatherproof Precision Joinery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-terracotta" />
                    <span>Turnkey On-Site Handover</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Link
                  to="/contact"
                  onClick={() => setSelectedServiceModal(null)}
                  className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-full bg-[#141517] text-white hover:bg-black text-xs uppercase tracking-widest font-semibold text-center transition-all shadow-md"
                >
                  Enquire for {selectedServiceModal.title} &rarr;
                </Link>
                <Link
                  to={`/services#${selectedServiceModal.id}`}
                  onClick={() => setSelectedServiceModal(null)}
                  className="w-full sm:w-auto py-3.5 px-6 rounded-full border border-[#e3e3de] hover:bg-black/5 text-[#141517] text-xs uppercase tracking-widest font-semibold text-center transition-all"
                >
                  Full Service Page
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}


      </AnimatePresence>

      {/* =========================================================================
          09 — INSTAGRAM SECTION
      ========================================================================= */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto border-t border-[#e3e3de]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#141517] text-white border border-white/10 text-[11px] font-medium uppercase tracking-[0.2em] shadow-md mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4b18] shadow-[0_0_8px_rgba(255,75,24,0.8)]" />
              <span>Follow The Journey</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl text-[#141517] uppercase leading-[0.95]">
              On Site &amp; Instagram.
            </h2>
            <p className="text-sm text-[#666] font-light mt-3">
              See our latest wooden builds, framing stages, and behind-the-scenes work.
            </p>
          </div>

          <a
            href={BUSINESS_INFO.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#141517] text-white hover:bg-black/80 text-xs uppercase tracking-widest font-semibold transition-all duration-300 self-start md:self-auto shadow-sm"
          >
            <span>Follow {BUSINESS_INFO.social.instagramHandle}</span>
            <HiArrowNarrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={BUSINESS_INFO.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden aspect-square bg-black/5 shadow-sm block border border-[#e3e3de]"
            >
              <img
                src={post.image}
                alt={post.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 text-center">
                <span className="text-white text-xs font-medium line-clamp-3">
                  {post.caption}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>


      {/* =========================================================================
          10 — 3D CURVED RIBBON SHOWCASE (Exact RBP Imageworks Sinusoidal Card Stream)
      ========================================================================= */}
      <CurvedRibbonShowcase />

      {/* =========================================================================
          11 — FAQ SECTION (Got Questions? We Have Answers)
      ========================================================================= */}
      <FAQSection />

    </div>
  );
};

export default HomePage;
