import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiArrowNarrowRight, 
  HiX
} from 'react-icons/hi';
import CurvedSlider from '../components/common/CurvedSlider';
import FoldText from '../components/common/FoldText';
import ScrollRevealText from '../components/common/ScrollRevealText';
import ScrollTimeline from '../components/common/ScrollTimeline';
import ServicesTextRotate from '../components/common/ServicesTextRotate';
import InstagramCurvedSection from '../components/common/InstagramCurvedSection';
import CurvedRibbonShowcase from '../components/common/CurvedRibbonShowcase';
import FAQSection from '../components/common/FAQSection';
import { 
  BUSINESS_INFO, 
  SERVICES 
} from '../utils/constants';

export const VALUES = [
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


const HomePage = () => {
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure immediate playback and hardware acceleration
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

    // Seamless loop restart safeguard to ensure the video never freezes or gets stuck
    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="w-full bg-[#f5f2f2] text-[#141517] font-body selection:bg-black selection:text-white">

      {/* =========================================================================
          01 — HERO SECTION (Exact Bildora Screenshot Clone)
      ========================================================================= */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center text-center px-4 sm:px-6 overflow-hidden">
        {/* Native 1080p Full-HD Video Background: Autoplays instantly, infinite seamless loop, zero player controls, zero buffering */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none select-none bg-stone-900">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover scale-[1.12] origin-center pointer-events-none select-none"
            poster="https://img.youtube.com/vi/Ii5h19NsZw0/maxresdefault.jpg"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Dark Vignette / Overlay to guarantee crystal-clear text contrast */}
        <div className="absolute inset-0 z-0 bg-black/40 bg-gradient-to-b from-black/55 via-black/20 to-black/60 pointer-events-none" />

        {/* Centered Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center pt-24 pb-16 px-4">
          


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






      {/* Service Details Modal */}
      <AnimatePresence>
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
          09 — INSTAGRAM SECTION WITH 3D CURVED CYLINDER SLIDER & VIDEO REELS
      ========================================================================= */}
      <InstagramCurvedSection />

      {/* =========================================================================
          10 — FAQ SECTION (Got Questions? We Have Answers)
      ========================================================================= */}
      <FAQSection />

      {/* =========================================================================
          11 — 3D CURVED RIBBON SHOWCASE (Exact RBP Imageworks Sinusoidal Card Stream)
      ========================================================================= */}
      <CurvedRibbonShowcase />

    </div>
  );
};

export default HomePage;
