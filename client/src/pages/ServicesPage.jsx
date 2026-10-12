import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  HiArrowNarrowRight, 
  HiX, 
  HiOutlineCheck, 
  HiOutlineShieldCheck, 
  HiOutlineSparkles, 
  HiOutlineClock,
  HiOutlineInformationCircle 
} from 'react-icons/hi';
import AnimatedSection from '../components/common/AnimatedSection';
import SectionLabel from '../components/common/SectionLabel';
import CTAButton from '../components/common/CTAButton';
import ServicesExpandTypography from '../components/common/ServicesExpandTypography';
import { SERVICES, BUSINESS_INFO } from '../utils/constants';

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
  const [activeFilter, setActiveFilter] = useState('All');

  const filterOptions = [
    { label: 'All Services', value: 'All' },
    ...SERVICES.map((s) => ({ label: s.title, value: s.id }))
  ];

  const handleFilterClick = (filterValue) => {
    setActiveFilter(filterValue);
    if (filterValue !== 'All') {
      const el = document.getElementById(filterValue);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="bg-[#f5f2f2] min-h-screen w-full pt-32 pb-24 text-[#141517] overflow-x-clip selection:bg-black selection:text-white">
      <Helmet>
        <title>Services | Make My Cottage - Premium Handcrafted Wooden Home Construction</title>
        <meta 
          name="description" 
          content="Explore our complete range of turnkey timber construction services: custom wooden homes, farmhouses, cottages, prefabricated modular villas, resort accommodations, and bespoke timber structures." 
        />
      </Helmet>

      {/* =========================================================================
          01 — HERO HEADER WITH EDITORIAL TYPOGRAPHY & CATEGORY NAVIGATION
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <AnimatedSection className="max-w-4xl">
          <SectionLabel text="OUR CAPABILITIES" />
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl text-[#141517] uppercase leading-[0.92] mt-6 mb-8">
            What We Build.
          </h1>
          <p className="font-sans text-black/75 text-base sm:text-lg font-light leading-relaxed max-w-2xl mb-10">
            From initial site topography analysis and 3D architectural renders to foundation work, timber erection, and turnkey key handover across India.
          </p>

          {/* Quick Jump & Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleFilterClick(opt.value)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === opt.value
                    ? 'bg-[#141517] text-white font-semibold shadow-md scale-105'
                    : 'bg-white text-[#555] hover:text-[#141517] border border-[#e3e3de] hover:border-[#141517]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* =========================================================================
          02 — SIGNATURE EXPANDING TYPOGRAPHY ANIMATION (All 6 Services)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-28 md:mb-36">
        <div className="border-t border-[#e3e3de] pt-12 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-accent-terracotta">
              Scroll To Experience Structural Craftsmanship
            </span>
            <span className="text-xs text-[#888] font-light">
              Interactive expanding perspective reveals &middot; Click any image for instant specs
            </span>
          </div>
        </div>

        {/* Core GSAP Flip & ScrollTrigger Expanding Typography component */}
        <ServicesExpandTypography onSelectServiceModal={setSelectedServiceModal} />
      </section>

      {/* =========================================================================
          03 — TURNKEY STANDARDS & ENGINEERING GUARANTEES
      ========================================================================= */}
      <section className="bg-white py-20 px-6 md:px-12 border-y border-[#e3e3de] mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-accent-terracotta block mb-2">
              ENGINEERING INTEGRITY
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl text-[#141517] uppercase leading-tight">
              Standard On Every Build
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-[#fbf9f7] border border-[#e3e3de] space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#141517] text-white flex items-center justify-center text-xl mb-4">
                <HiOutlineShieldCheck />
              </div>
              <h3 className="font-heading text-xl uppercase text-[#141517]">100% Termite Proof</h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Vacuum-pressure impregnation with eco-safe boron preservatives ensures lifetime resistance to termites, woodborers, and dry rot.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#fbf9f7] border border-[#e3e3de] space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#141517] text-white flex items-center justify-center text-xl mb-4">
                <HiOutlineClock />
              </div>
              <h3 className="font-heading text-xl uppercase text-[#141517]">Rapid Turnkey Delivery</h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Prefabricated joinery and off-site timber preparation reduce on-site build timelines by up to 60% compared to traditional concrete.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#fbf9f7] border border-[#e3e3de] space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#141517] text-white flex items-center justify-center text-xl mb-4">
                <HiOutlineSparkles />
              </div>
              <h3 className="font-heading text-xl uppercase text-[#141517]">Natural Thermal Comfort</h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Wood possesses 15x higher thermal insulation than concrete, keeping your home naturally cool in peak summers and pleasantly warm in winters.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#fbf9f7] border border-[#e3e3de] space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#141517] text-white flex items-center justify-center text-xl mb-4">
                <HiOutlineCheck />
              </div>
              <h3 className="font-heading text-xl uppercase text-[#141517]">10-Year Warranty</h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Backed by certified structural engineering and a comprehensive 10-year warranty covering frame integrity, weather seals, and joinery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          04 — DETAILED ARCHITECTURAL DELIVERABLES & SPECS (All 6 Services)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
        <div className="mb-16">
          <SectionLabel text="FULL PORTFOLIO BREAKDOWN" />
          <h2 className="font-heading text-4xl sm:text-6xl text-[#141517] uppercase leading-[0.95] mt-4 mb-4">
            Architectural Specifications.
          </h2>
          <p className="text-[#666] font-light max-w-xl text-base">
            Detailed engineering parameters, wood species, lead times, and turnkey handover deliverables for each building category.
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {SERVICES.map((srv, index) => {
            const isReversed = index % 2 === 1;
            const specs = SERVICE_SPECS[srv.id] || SERVICE_SPECS['wooden-homes'];

            return (
              <AnimatedSection key={srv.id}>
                <div 
                  id={srv.id} 
                  className={`scroll-mt-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image Column with Hover Interaction */}
                  <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
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
                        <span className="font-heading text-lg text-white font-light">
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
                  </div>

                  {/* Text & Specs Column */}
                  <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'} space-y-6`}>
                    <div className="flex items-center gap-3">
                      <span className="font-heading text-4xl text-accent-terracotta font-medium">
                        {srv.num}
                      </span>
                      <span className="w-12 h-[1px] bg-black/10" />
                      <span className="text-xs uppercase tracking-widest text-black/50 font-semibold">
                        Turnkey Timber Architecture
                      </span>
                    </div>

                    <h3 className="font-heading text-3xl sm:text-4xl text-[#141517] uppercase leading-tight">
                      {srv.title}
                    </h3>

                    <p className="font-sans text-black/75 text-base font-light leading-relaxed">
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
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

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
                <span className="font-heading text-2xl text-accent-terracotta font-medium">
                  {selectedServiceModal.num}
                </span>
                <span className="w-8 h-[1px] bg-black/15" />
                <span className="text-xs uppercase tracking-widest text-[#888]">
                  Turnkey Architectural Service
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

      {/* =========================================================================
          06 — BOTTOM CALL TO ACTION
      ========================================================================= */}
      <section className="bg-[#141517] text-white py-24 md:py-36 px-6 md:px-12 text-center">
        <AnimatedSection className="max-w-3xl mx-auto flex flex-col items-center">
          <SectionLabel text="GET STARTED" />
          <h2 className="font-heading text-4xl sm:text-6xl uppercase leading-[1] mt-4 mb-8">
            Let&apos;s build your bespoke wooden space.
          </h2>
          <p className="text-white/70 font-light text-base md:text-lg mb-10 max-w-xl">
            Contact Make My Cottage Infra Pvt. Ltd. today for architectural consultation, 3D renders, and turnkey site feasibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <CTAButton to="/contact" variant="accent">
              Start Project &rarr;
            </CTAButton>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white/10 text-white hover:bg-white hover:text-black text-xs uppercase tracking-widest font-semibold transition-all"
            >
              Call {BUSINESS_INFO.phone}
            </a>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default ServicesPage;
