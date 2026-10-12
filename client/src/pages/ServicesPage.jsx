import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  HiMenu,
  HiPhone,
  HiArrowNarrowRight, 
  HiX, 
  HiOutlineCheck, 
  HiOutlineInformationCircle 
} from 'react-icons/hi';
import SectionLabel from '../components/common/SectionLabel';
import CTAButton from '../components/common/CTAButton';
import { SERVICES, BUSINESS_INFO } from '../utils/constants';

const serviceItems = [
  {
    title: "Wooden Homes",
    image: SERVICES.find((s) => s.id === "wooden-homes")?.image || "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1000&q=80",
    href: "#wooden-homes"
  },
  {
    title: "Farm Houses",
    image: SERVICES.find((s) => s.id === "farm-houses")?.image || "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1000&q=80",
    href: "#farm-houses"
  },
  {
    title: "Cottage Homes",
    image: SERVICES.find((s) => s.id === "cottage-homes")?.image || "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1000&q=80",
    href: "#cottage-homes"
  },
  {
    title: "Prefabricated Homes",
    image: SERVICES.find((s) => s.id === "prefabricated-homes")?.image || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1000&q=80",
    href: "#prefabricated-homes"
  },
  {
    title: "Resort Cottages",
    image: SERVICES.find((s) => s.id === "resort-cottages")?.image || "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=1000&q=80",
    href: "#resort-cottages"
  },
  {
    title: "Custom Structures",
    image: SERVICES.find((s) => s.id === "custom-structures")?.image || "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1000&q=80",
    href: "#custom-structures"
  }
];

// Detailed specifications for each of our 6 turnkey service offerings
const SERVICE_SPECS = {
  'wooden-homes': {
    leadTime: '90 - 120 Days',
    warranty: '10 Years Structural',
    woodSpecies: 'Treated Teak, Pine & Canadian Cedar',
    construction: 'Post & Beam / Interlocking Timber Frame',
    deliverables: [
      'Custom 3D Architectural Blueprint & Site Elevation',
      '100% Pressure-Treated Vacuum Preserved Timber',
      'Double-Glazed Weather-Sealed Glass Systems',
      'Turnkey Plumbing, Electrical & Polished Timber Flooring'
    ]
  },
  'farm-houses': {
    leadTime: '120 - 150 Days',
    warranty: '10 Years Structural',
    woodSpecies: 'Sal Wood, High-Density Teak & Granite',
    construction: 'Heritage Timber Framing + Natural Stone Base',
    deliverables: [
      'Expansive Verandah & High-Ceiling Truss Detailing',
      'Site Topography & Landscape Integration Plan',
      'Deep Shading Overhangs for Passive Cooling',
      'Complete Interior Woodwork & Exterior Weather Sealing'
    ]
  },
  'cottage-homes': {
    leadTime: '60 - 75 Days',
    warranty: '10 Years Structural',
    woodSpecies: 'Imported Kiln-Dried Pine & Cedar',
    construction: 'Log Profile & Precision Timber Frame',
    deliverables: [
      'Compact High-Thermal Efficiency Spatial Layout',
      'Fireplace Chimney & Natural Stone Hearth Options',
      'Heavy-Duty Roof Shingles with Waterproof Membranes',
      'Pre-Fitted Ready-to-Live Bathrooms & Kitchenette'
    ]
  },
  'prefabricated-homes': {
    leadTime: '45 - 60 Days',
    warranty: '10 Years Structural',
    woodSpecies: 'Precision Glulam & Cross-Laminated Timber (CLT)',
    construction: 'Off-Site CNC Precision Factory Assembly',
    deliverables: [
      'Zero On-Site Construction Mess or Waste',
      'Millimeter-Accurate Off-Site Factory Engineering',
      'Rapid 45-Day Erection & Foundation Bolting',
      'Acoustic & Fire-Retardant Certified Wall Assemblies'
    ]
  },
  'resort-cottages': {
    leadTime: '75 - 90 Days',
    warranty: '10 Years Structural',
    woodSpecies: 'Commercial Grade Teak, Pine & Treated Bamboo',
    construction: 'Heavy-Duty Luxury Hospitality Timber Units',
    deliverables: [
      'Multi-Unit Repeatable Cluster Layout Planning',
      'High-Turnover Commercial Grade Hardware & Finishes',
      'Panoramic Balcony Decks with Safety Balustrades',
      'Turnkey Resort Villa Fitment Ready for Guest Check-in'
    ]
  },
  'custom-structures': {
    leadTime: '30 - 45 Days',
    warranty: '5 Years Structural',
    woodSpecies: 'Seasoned Hardwoods, Cedar & Teak Joinery',
    construction: 'Artisanal Mortise & Tenon Custom Joinery',
    deliverables: [
      'Architectural Pergolas, Gazebos & Glass Pavilions',
      'Lakeside Decks, Rooftop Lounges & Poolside Cabanas',
      'UV-Resistant Polycarbonate / Timber Louver Roofing',
      'Precision Hand-Carved Joinery and Hidden Metal Anchors'
    ]
  }
};

const ServicesPage = () => {
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const notchY = useTransform(scrollY, (v) => -Math.min(v, 480));

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="bg-[#f5f2f2] min-h-screen w-full pt-3 sm:pt-4 md:pt-5 pb-24 text-[#141517] selection:bg-black selection:text-white">
      <Helmet>
        <title>Services | Make My Cottage - Premium Handcrafted Wooden Home Construction</title>
        <meta 
          name="description" 
          content="Explore our complete range of turnkey timber construction services: custom wooden homes, farmhouses, cottages, prefabricated modular villas, resort accommodations, and bespoke timber structures." 
        />
      </Helmet>

      {/* =========================================================================
          01 — SERVICES HERO VISUAL (Sticky Architectural Showcase & Reveal Animation)
      ========================================================================= */}
      <section className="sticky top-3 sm:top-4 md:top-5 z-0 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-0 h-[calc(100svh-28px)] min-h-[540px] flex flex-col">
        {/* Sticky Hero Showcase Card */}
        <div className="relative w-full flex-1 rounded-tl-[28px] sm:rounded-tl-[36px] md:rounded-tl-[40px] rounded-tr-[28px] sm:rounded-tr-[36px] md:rounded-tr-[40px] rounded-br-[28px] sm:rounded-br-[36px] md:rounded-br-[40px] rounded-bl-none overflow-hidden bg-[#141517]">
          {/* Architectural Showcase Image */}
          <img
            src="/images/services-hero-resentii.png"
            alt="Make My Cottage - Our Services"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.currentTarget.src = "https://framerusercontent.com/images/3YWf73hBWY8qiMugjcabc1XHE.png";
            }}
          />

          {/* Natural atmospheric lighting & vignette for optimal navbar contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-transparent pointer-events-none" />

          {/* =====================================================================
              MERGED HERO NAVBAR (Exact HomePage Navbar Model within Hero Visual)
          ===================================================================== */}
          <header className="absolute top-0 left-0 right-0 z-30 px-6 sm:px-12 py-5 sm:py-7">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              
              {/* Logo with Brick / Cottage Icon */}
              <Link
                to="/"
                className="flex items-center gap-2.5 group z-50 transition-opacity hover:opacity-85 text-white"
              >
                <div className="w-7 h-7 flex items-center justify-center text-white">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L2 10V21H22V10L12 3ZM4 19V11.2L12 5.6L20 11.2V19H4Z" />
                    <path d="M6 13H10V15H6V13ZM14 13H18V15H14V13ZM10 16H14V18H10V16ZM6 16H9V18H6V16ZM15 16H18V18H15V16Z" opacity="0.85" />
                  </svg>
                </div>
                <span className="font-sans text-xl sm:text-2xl font-semibold tracking-tight transition-colors text-white select-none">
                  Make My Cottage.
                </span>
              </Link>

              {/* Floating Center Pill Nav (HomePage Model) */}
              <nav className="hidden md:flex items-center gap-8 px-7 py-2.5 rounded-full backdrop-blur-md shadow-sm transition-all duration-300 border border-white/20 bg-white/10">
                <Link 
                  to="/" 
                  className="text-sm font-medium transition-colors text-white/85 hover:text-white"
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="text-sm font-medium transition-colors text-white/85 hover:text-white"
                >
                  About
                </Link>
                <Link 
                  to="/services" 
                  className="text-sm font-semibold transition-colors text-white"
                >
                  Services
                </Link>
                <Link 
                  to="/projects" 
                  className="text-sm font-medium transition-colors text-white/85 hover:text-white"
                >
                  Projects
                </Link>
                <Link 
                  to="/gallery" 
                  className="text-sm font-medium transition-colors text-white/85 hover:text-white"
                >
                  Gallery
                </Link>
                <Link 
                  to="/contact" 
                  className="text-sm font-medium transition-colors text-white/85 hover:text-white"
                >
                  Contact
                </Link>
              </nav>

              {/* Right Action Button (HomePage Model) */}
              <div className="hidden sm:flex items-center gap-3 z-50">
                <Link
                  to="/contact"
                  className="px-6 py-2.5 rounded-full font-semibold text-sm hover:scale-105 transition-all duration-300 shadow-md bg-white text-black hover:bg-white/90"
                >
                  Let’s Build
                </Link>
              </div>

              {/* Mobile Menu Trigger (HomePage Model) */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden z-50 p-2 rounded-full backdrop-blur-md transition-all focus:outline-none bg-white/10 text-white border border-white/20 hover:bg-white/20"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
              </button>
            </div>
          </header>

          {/* Mobile Drawer Overlay (HomePage Model) */}
          <div
            className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-12 transition-all duration-500 ease-in-out md:hidden ${
              isMobileMenuOpen
                ? 'opacity-100 pointer-events-auto translate-y-0'
                : 'opacity-0 pointer-events-none -translate-y-8'
            }`}
          >
            <div className="pt-24">
              <p className="text-white/60 text-xs uppercase tracking-[0.25em] font-medium mb-8">
                • YOUR VISION. OUR CRAFT.
              </p>
              <nav className="flex flex-col gap-4">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-3xl font-medium text-white hover:text-white/80 transition-colors py-2 border-b border-white/10"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-3xl font-medium text-white hover:text-white/80 transition-colors py-2 border-b border-white/10"
                >
                  About
                </Link>
                <Link
                  to="/services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-3xl font-medium text-white hover:text-white/80 transition-colors py-2 border-b border-white/10"
                >
                  Services
                </Link>
                <Link
                  to="/projects"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-3xl font-medium text-white hover:text-white/80 transition-colors py-2 border-b border-white/10"
                >
                  Projects
                </Link>
                <Link
                  to="/gallery"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-3xl font-medium text-white hover:text-white/80 transition-colors py-2 border-b border-white/10"
                >
                  Gallery
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-3xl font-medium text-white hover:text-white/80 transition-colors py-2 border-b border-white/10"
                >
                  Contact
                </Link>
              </nav>
            </div>

            <div className="pt-8 border-t border-white/15 space-y-4">
              <div className="flex flex-col gap-1 text-sm text-white/70">
                <span className="uppercase tracking-widest text-xs text-white/50">Experience Center</span>
                <span>{BUSINESS_INFO.address.area}, Hyderabad</span>
                <span className="text-white font-medium">{BUSINESS_INFO.displayPhone}</span>
              </div>

              <div className="flex gap-3">
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 py-3 text-center rounded-full text-xs uppercase tracking-widest font-semibold bg-white text-black hover:bg-white/90 transition-all shadow-sm"
                >
                  Let’s Build &rarr;
                </Link>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="px-5 py-3 rounded-full text-xs uppercase tracking-widest font-semibold bg-white/10 text-white border border-white/20 text-center hover:bg-white/20 transition-all flex items-center justify-center shadow-sm"
                >
                  <HiPhone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom-Left Cutout Notch Container (Moves up smoothly on scroll) */}
          <motion.div
            style={{ y: notchY }}
            className="absolute bottom-0 left-0 z-10 flex items-end will-change-transform"
          >
            <div className="flex flex-col items-start justify-end">
              {/* Top Inverted Corner: curves image left boundary into notch top */}
              <div className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] md:w-[38px] md:h-[38px] pointer-events-none">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full block"
                >
                  <path
                    d="M 0 0 L 0 20 L 20 20 C 8.954 20 0 11.046 0 0 Z"
                    fill="#f5f2f2"
                  />
                </svg>
              </div>

              {/* Cutout box matching page background */}
              <div className="bg-[#f5f2f2] p-2.5 sm:p-3.5 md:p-4 rounded-tr-[24px] sm:rounded-tr-[30px] md:rounded-tr-[36px]">
                {/* Dark Charcoal Card */}
                <div className="bg-[#1c1d21] text-white px-5 py-3.5 sm:px-8 sm:py-4.5 md:px-10 md:py-5.5 rounded-[16px] sm:rounded-[20px] md:rounded-[22px] shadow-md">
                  <h1 className="font-sans text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-white select-none whitespace-nowrap leading-none">
                    Our Services
                  </h1>
                </div>
              </div>
            </div>

            {/* Right Inverted Corner: curves cutout right edge into hero bottom */}
            <div className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] md:w-[38px] md:h-[38px] pointer-events-none">
              <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full block"
              >
                <path
                  d="M 0 0 L 0 20 L 20 20 C 8.954 20 0 11.046 0 0 Z"
                  fill="#f5f2f2"
                />
              </svg>
            </div>

            {/* Seamless Bottom Extension to cover image beneath notch as it moves up */}
            <div className="absolute top-full left-0 w-full h-[600px] bg-[#f5f2f2] -mt-[1px]" />
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          02 — SCROLLING CONTENT LAYER (Our Services Notch Tab + Portfolio Specs)
      ========================================================================= */}
      <div className="relative z-20 w-full bg-[#f5f2f2]">
        {/* =========================================================================
            04 — DETAILED ARCHITECTURAL DELIVERABLES & SPECS (All 6 Services)
        ========================================================================= */}
        <section id="service-details" className="max-w-7xl mx-auto px-6 md:px-12 pt-8 sm:pt-12 md:pt-16 mb-32 scroll-mt-24">
        <div className="mb-16">
          <SectionLabel text="FULL PORTFOLIO BREAKDOWN" />
          <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl text-[#141517] font-normal leading-[1.1] tracking-tight mt-4 mb-4">
            Architectural Specifications
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#555] font-light leading-relaxed max-w-2xl">
            Detailed engineering parameters, wood species, lead times, and turnkey handover deliverables for each building category.
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {SERVICES.map((srv, index) => {
            const isReversed = index % 2 === 1;
            const specs = SERVICE_SPECS[srv.id] || SERVICE_SPECS['wooden-homes'];

            return (
              <div 
                key={srv.id}
                id={srv.id} 
                className={`scroll-mt-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image Column with Left/Right Motion Interaction */}
                <motion.div 
                  initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <div 
                    onClick={() => setSelectedServiceModal(srv)}
                    className="group relative cursor-pointer rounded-3xl overflow-hidden aspect-[16/11] bg-black/5 shadow-xl border border-[#e3e3de]"
                  >
                    <img 
                      src={srv.image} 
                      alt={srv.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    
                    {/* Floating Badge */}
                    <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                      <span className="px-3.5 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#141517] shadow-sm">
                        {srv.title}
                      </span>
                      <span className="font-sans text-sm text-white/90 font-medium">
                        {srv.num}
                      </span>
                    </div>

                    {/* Hover action prompt */}
                    <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#141517] text-white text-xs uppercase tracking-wider font-semibold shadow-md">
                        <span>Quick Preview</span>
                        <HiArrowNarrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Text & Specs Column with Opposing Left/Right Motion Interaction */}
                <motion.div 
                  initial={{ opacity: 0, x: isReversed ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'} space-y-6`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-3xl sm:text-4xl text-[#ff4b18] font-light">
                      {srv.num}
                    </span>
                    <span className="w-12 h-[1px] bg-black/10" />
                    <span className="text-xs uppercase tracking-widest text-[#777] font-medium font-sans">
                      Turnkey Timber Architecture
                    </span>
                  </div>

                  <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl text-[#141517] font-medium tracking-tight">
                    {srv.title}
                  </h3>

                  <p className="font-sans text-[#555] text-base font-light leading-relaxed">
                    {srv.description}
                  </p>

                  {/* Specification Grid */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-black/10 text-xs">
                    <div>
                      <span className="text-[#888] uppercase tracking-wider block text-[10px] font-semibold mb-1">
                        Timeline
                      </span>
                      <span className="font-medium text-[#141517]">{specs.leadTime}</span>
                    </div>
                    <div>
                      <span className="text-[#888] uppercase tracking-wider block text-[10px] font-semibold mb-1">
                        Warranty
                      </span>
                      <span className="font-medium text-[#141517]">{specs.warranty}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#888] uppercase tracking-wider block text-[10px] font-semibold mb-1">
                        Wood Species &amp; Construction
                      </span>
                      <span className="font-medium text-[#141517]">{specs.woodSpecies} &middot; {specs.construction}</span>
                    </div>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#141517] block mb-2">
                      Key Inclusions:
                    </span>
                    {specs.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#555]">
                        <HiOutlineCheck className="w-4 h-4 text-accent-terracotta shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-4">
                    <CTAButton to="/contact" variant="dark">
                      Enquire for {srv.title}
                    </CTAButton>
                    <button
                      type="button"
                      onClick={() => setSelectedServiceModal(srv)}
                      className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-[#e3e3de] hover:border-[#141517] text-xs uppercase tracking-wider font-semibold text-[#141517] shadow-sm transition-all"
                    >
                      <HiOutlineInformationCircle className="w-4 h-4 text-[#888]" />
                      <span>Quick Overview</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>
    </div>

      {/* =========================================================================
          05 — INTERACTIVE SERVICE MODAL
      ========================================================================= */}
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
                <span className="font-sans text-2xl text-[#ff4b18] font-light">
                  {selectedServiceModal.num}
                </span>
                <span className="w-8 h-[1px] bg-black/15" />
                <span className="text-xs uppercase tracking-widest text-[#888] font-medium font-sans">
                  Turnkey Architectural Service
                </span>
              </div>

              <h3 className="font-sans text-2xl sm:text-3xl text-[#141517] font-medium tracking-tight mb-4">
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

              {/* Inclusions summary */}
              {SERVICE_SPECS[selectedServiceModal.id] && (
                <div className="bg-[#f9f8f6] rounded-2xl p-5 mb-6 border border-[#e3e3de]/60 space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#141517]">
                    Technical Deliverables:
                  </h4>
                  <div className="space-y-2 text-xs text-[#555]">
                    {SERVICE_SPECS[selectedServiceModal.id].deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-terracotta shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Link
                  to="/contact"
                  onClick={() => setSelectedServiceModal(null)}
                  className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-full bg-[#141517] text-white hover:bg-black text-xs uppercase tracking-widest font-semibold text-center transition-all shadow-md"
                >
                  Enquire for {selectedServiceModal.title} &rarr;
                </Link>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="w-full sm:w-auto py-3.5 px-6 rounded-full border border-[#e3e3de] hover:bg-black/5 text-[#141517] text-xs uppercase tracking-widest font-semibold text-center transition-all"
                >
                  Call {BUSINESS_INFO.phone}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
};

export default ServicesPage;
