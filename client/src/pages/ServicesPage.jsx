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
  HiOutlineInformationCircle,
  HiQuestionMarkCircle
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

// Resentii-modeled detailed services configuration with authentic Make My Cottage assets & specs
const DETAILED_SERVICES = [
  {
    id: 'wooden-homes',
    num: '01',
    title: 'Wooden Homes',
    description: 'From the architectural bones of a space to the finishing details that make it feel like home, our custom-designed wooden houses are built around your lifestyle with natural warmth, timeless aesthetics, and enduring structural strength.',
    subTitle: 'Bespoke Timber Architecture',
    subDescription: 'We handle every phase from custom 3D architectural elevations to pressure-treated timber selection, foundation bolting, and luxury turnkey interior finishes so you can move straight into your handcrafted sanctuary.',
    notchTitle: 'Curated Engineering',
    notchDescription: '100% vacuum pressure-treated teak and Canadian cedar with double-glazed weather sealing, ensuring lifetime termite resistance and passive thermal insulation in any climate.',
    primaryImage: SERVICES.find(s => s.id === 'wooden-homes')?.image || 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80',
    type: 'A' // Top-Right Notch
  },
  {
    id: 'farm-houses',
    num: '02',
    title: 'Farm Houses',
    description: 'Every estate we create is born from a conversation shaped by your taste, your land, and your vision. Relaxed, natural spaces designed for weekend living, organic farm retreats, and countryside estates that blend indoor and outdoor living seamlessly.',
    subTitle: 'Heritage Craftsmanship',
    subDescription: 'Our master carpenters bring together traditional timber framing and natural stone masonry to create expansive high-ceiling estates that transcend the ordinary and stand as works of art that endure through time.',
    notchTitle: 'Estate Engineering',
    notchDescription: 'Natural stone foundations paired with seasoned Sal wood and treated teak, passive cooling roof overhangs, and complete turnkey interior woodwork built for generations.',
    primaryImage: SERVICES.find(s => s.id === 'farm-houses')?.image || 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000&q=80',
    type: 'B' // Bottom-Left Notch + Secondary Image
  },
  {
    id: 'cottage-homes',
    num: '03',
    title: 'Cottage Homes',
    description: 'Your sanctuary has a story worth preserving and a future worth investing in. Compact, high-thermal efficiency cottages engineered for resorts, hill retreats, farms, and private scenic properties maximizing every square foot.',
    subTitle: 'Scenic Hillside Living',
    subDescription: 'From compact floor plans to high-end architectural roof shingles, we handle every layer of complexity with precision. Our focus is always on structural integrity and spatial efficiency creating cozy environments that work beautifully for the way you live.',
    notchTitle: 'Turnkey Compact Comfort',
    notchDescription: 'Pre-fitted ready-to-live bathrooms, kitchenette options, and weather-sealed log profiles with heavy-duty waterproof membranes ready for occupancy in 60 to 75 days with zero hassle.',
    primaryImage: SERVICES.find(s => s.id === 'cottage-homes')?.image || 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1000&q=80',
    type: 'A' // Top-Right Notch
  },
  {
    id: 'prefabricated-homes',
    num: '04',
    title: 'Prefabricated Homes',
    description: 'A beautiful home is nothing without smart engineering behind it. Efficient precision construction with modern modular prefabricated timber systems for rapid delivery without ever compromising on aesthetics or structural permanence.',
    subTitle: 'Precision Factory Assembly',
    subDescription: 'We go beyond the blueprint with millimeter-accurate off-site CNC factory engineering that eliminates on-site mess, accelerates foundation bolting, and erects fully livable modular homes in just 45 days.',
    notchTitle: 'Modular Performance',
    notchDescription: 'Precision Glulam and Cross-Laminated Timber (CLT) wall assemblies certified for acoustic dampening, fire retardance, and maximum earthquake resilience.',
    primaryImage: SERVICES.find(s => s.id === 'prefabricated-homes')?.image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80',
    type: 'B' // Bottom-Left Notch + Secondary Image
  },
  {
    id: 'resort-cottages',
    num: '05',
    title: 'Resort Cottages',
    description: 'Distinctive wooden accommodation spaces engineered for hospitality luxury and guest escapism. We design environments that flow effortlessly, offering guests an immersive natural retreat with all modern luxury comforts.',
    subTitle: 'Luxury Hospitality Suites',
    subDescription: 'Repeatable cluster layouts designed for high turnover commercial resort environments, featuring panoramic balcony decks, spa ensuites, and bespoke timber interior fitments ready for guest check-in.',
    notchTitle: 'Commercial Durability',
    notchDescription: 'Built with commercial-grade treated teak and bamboo composites, heavy-duty weather seals, and rapid multi-unit construction schedules backed by a 10-year warranty.',
    primaryImage: SERVICES.find(s => s.id === 'resort-cottages')?.image || 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=1000&q=80',
    type: 'A' // Top-Right Notch
  },
  {
    id: 'custom-structures',
    num: '06',
    title: 'Custom Structures',
    description: 'Unique architectural wooden pergolas, pavilions, gazebos, rooftop lounges, and bespoke timber extensions made to your exact property specifications, bringing warmth, character, and outdoor elegance to your lifestyle.',
    subTitle: 'Artisanal Architectural Joinery',
    subDescription: 'Every custom structure concludes with a comprehensive design roadmap and artisanal joinery that flawlessly blends into your existing grounds, providing shade, beauty, and relaxation for decades.',
    notchTitle: 'Bespoke Joinery',
    notchDescription: 'Artisanal mortise and tenon joinery with hidden metal anchors and UV-resistant polycarbonates, engineered to elevate poolside cabanas, lakeside decks, and garden pavilions.',
    primaryImage: SERVICES.find(s => s.id === 'custom-structures')?.image || 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=80',
    type: 'B' // Bottom-Left Notch + Secondary Image
  }
];

const SERVICES_FAQS = [
  {
    question: 'How long does a typical project take from start to finish?',
    answer: 'For prefabricated modular timber homes and resort cottages, on-site precision assembly takes between 30 to 45 days after foundation preparation. Custom luxury wooden residences and larger countryside farmhouses typically take 3 to 5 months from architectural approval to turnkey handover.'
  },
  {
    question: 'What does your design process look like?',
    answer: 'We follow a comprehensive 6-stage turnkey journey: 1) Site topography & climate analysis, 2) Custom 3D architectural modeling & floor plans, 3) Precision timber selection & structural calculations, 4) Off-site prefabrication & kiln seasoning, 5) On-site assembly led by master carpenters, and 6) Turnkey handover with certified weather sealing, plumbing, electricals, and interior woodwork.'
  },
  {
    question: 'What sets Make My Cottage apart from other design firms?',
    answer: 'Unlike conventional concrete contractors, we specialize exclusively in sustainable timber architecture and engineered modular wood construction. Our homes offer natural thermal insulation (cooler summers, warmer winters), carbon-negative footprint, natural earthquake resilience, and German-standard joinery precision backed by a 10-year structural warranty.'
  },
  {
    question: 'Do you offer remote design consultations?',
    answer: 'Yes! We conduct interactive 3D virtual consultations for clients across India and NRI homeowners worldwide. You can also visit our flagship Experience Center in Shamshabad, Hyderabad (ORR Service Road) to tour full-scale wooden cottage prototypes, or schedule an on-site plot inspection by our engineering team.'
  },
  {
    question: 'What geographic areas do you serve?',
    answer: 'We build extensively across Telangana and Andhra Pradesh—including Hyderabad, Shamshabad, Vikarabad, Chevella, Ananthagiri Hills, Nagarjuna Sagar, Vijayawada, and Visakhapatnam—as well as destination properties in Karnataka, Maharashtra, and scenic hill retreats across India. We also deliver prefabricated timber home kits nationwide.'
  },
  {
    question: 'What types of projects does Make My Cottage specialise in?',
    answer: 'We specialize in custom Wooden Homes, countryside Farm Houses, high-thermal efficiency Cottage Homes, rapid Prefabricated Modular Residences, commercial luxury Resort Cottages, and artisanal Custom Structures including pergolas, gazebos, and wooden clubhouses.'
  }
];

const ServicesPage = () => {
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
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
    <div className="bg-[#f5f2f2] min-h-screen w-full pt-3 sm:pt-4 md:pt-5 pb-0 text-[#141517] selection:bg-black selection:text-white">
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
            02 — RESENTII SERVICE SHOWCASE SECTIONS (All 6 Make My Cottage Services)
        ========================================================================= */}
        <div id="service-details" className="w-full pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-28">
          {DETAILED_SERVICES.map((srv, index) => {
            const rawService = SERVICES.find(s => s.id === srv.id) || SERVICES[0];
            const isTypeA = srv.type === 'A';

            return (
              <section 
                key={srv.id} 
                id={srv.id} 
                className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 py-16 sm:py-24 lg:py-28 border-b border-black/5 last:border-b-0 scroll-mt-24"
              >
                {isTypeA ? (
                  /* ====================================================================
                     MODEL TYPE A: Left Text (Top H2 + Bottom H4 & CTA) / Right Image with Top-Right Cutout Notch
                  ==================================================================== */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
                    
                    {/* Left Column: Headline, Description & Action */}
                    <motion.div 
                      initial={{ opacity: 0, y: 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                      className="lg:col-span-5 flex flex-col justify-between py-2 order-1"
                    >
                      {/* Top Headline Block */}
                      <div>
                        <h2 
                          className="font-playfair text-3xl sm:text-4xl md:text-5xl text-[#101014] font-normal tracking-tight leading-[1.15] mb-5"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {srv.title}
                        </h2>
                        <p className="font-sans text-base sm:text-[17px] text-[#3d3d47] font-light leading-relaxed max-w-xl">
                          {srv.description}
                        </p>
                      </div>

                      {/* Middle Secondary Showcase Image (matching Farm Houses model) */}
                      {srv.secondaryImage && (
                        <div 
                          onClick={() => setSelectedServiceModal(rawService)}
                          className="rounded-[22px] sm:rounded-[28px] overflow-hidden aspect-[16/9] w-full my-6 sm:my-8 shadow-md border border-black/5 group cursor-pointer bg-black/5"
                        >
                          <img 
                            src={srv.secondaryImage} 
                            alt={`${srv.title} Showcase`} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      )}

                      {/* Bottom Feature Block & CTA Button */}
                      <div className="space-y-4">
                        <h4 className="font-sans text-2xl sm:text-3xl text-[#101014] font-medium tracking-tight">
                          {srv.subTitle}
                        </h4>
                        <p className="font-sans text-sm sm:text-base text-[#555] font-light leading-relaxed max-w-xl">
                          {srv.subDescription}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 pt-3">
                          <Link
                            to="/contact"
                            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#141517] hover:bg-black text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md hover:scale-105 active:scale-95 group"
                          >
                            <span>Request Consultation</span>
                            <span className="text-sm font-bold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                              ↗
                            </span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => setSelectedServiceModal(rawService)}
                            className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-[#e3e3de] hover:border-[#141517] text-xs font-semibold uppercase tracking-wider text-[#141517] bg-white/60 hover:bg-white transition-all shadow-sm"
                          >
                            <HiOutlineInformationCircle className="w-4 h-4 text-[#777]" />
                            <span>Quick Specs</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>

                    {/* Right Column: Large Image with Top-Right Inverted Corner Cutout Notch */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="lg:col-span-7 relative min-h-[500px] sm:min-h-[580px] lg:h-[680px] rounded-[32px] sm:rounded-[38px] rounded-tr-none overflow-hidden bg-black/5 shadow-xl group border border-[#e3e3de]/60 order-2"
                    >
                      {/* Architectural Showcase Image */}
                      <img 
                        src={srv.primaryImage} 
                        alt={srv.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                      {/* Top-Right Cutout Notch (Resentii Signature Inverted Corner Architecture) */}
                      <div className="absolute top-0 right-0 z-10 flex items-start justify-end pointer-events-auto">
                        {/* Left Inverted Corner: curves top edge of image into notch box */}
                        <div className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] pointer-events-none">
                          <svg 
                            viewBox="0 0 20 20" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="w-full h-full block" 
                            style={{ transform: 'rotate(90deg)' }}
                          >
                            <path d="M0 0L0 20C0 6 6 0 20 0L0 0Z" fill="#f5f2f2" />
                          </svg>
                        </div>

                        {/* Cutout container matching page background */}
                        <div className="flex flex-col items-end">
                          <div className="bg-[#f5f2f2] p-2.5 sm:p-3 md:p-3.5 rounded-bl-[28px] sm:rounded-bl-[34px]">
                            {/* Dark Charcoal Card */}
                            <div className="bg-[#1c1d21] text-white p-5 sm:p-7 md:p-8 rounded-[20px] sm:rounded-[24px] max-w-[280px] sm:max-w-sm md:max-w-md shadow-2xl border border-white/5">
                              <h4 className="font-sans text-xl sm:text-2xl font-semibold text-white tracking-tight mb-2.5">
                                {srv.notchTitle}
                              </h4>
                              <p className="font-sans text-xs sm:text-[13.5px] text-[#d0d1db]/90 font-light leading-relaxed">
                                {srv.notchDescription}
                              </p>
                            </div>
                          </div>

                          {/* Bottom Inverted Corner: curves notch box into right edge of image */}
                          <div className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] pointer-events-none self-end">
                            <svg 
                              viewBox="0 0 20 20" 
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="w-full h-full block" 
                              style={{ transform: 'rotate(90deg)' }}
                            >
                              <path d="M0 0L0 20C0 6 6 0 20 0L0 0Z" fill="#f5f2f2" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                  </div>
                ) : (
                  /* ====================================================================
                     MODEL TYPE B: Left Image with Bottom-Left Cutout Notch / Right Text + Secondary Image
                  ==================================================================== */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
                    
                    {/* Left Column: Large Image with Bottom-Left Inverted Corner Cutout Notch */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                      className="lg:col-span-7 relative min-h-[500px] sm:min-h-[580px] lg:h-[680px] rounded-[32px] sm:rounded-[38px] rounded-bl-none overflow-hidden bg-black/5 shadow-xl group border border-[#e3e3de]/60 order-2 lg:order-1"
                    >
                      {/* Architectural Showcase Image */}
                      <img 
                        src={srv.primaryImage} 
                        alt={srv.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                      {/* Bottom-Left Cutout Notch (Resentii Signature Inverted Corner Architecture) */}
                      <div className="absolute bottom-0 left-0 z-10 flex items-end justify-start pointer-events-auto">
                        <div className="flex flex-col items-start">
                          {/* Top Inverted Corner: curves image left boundary into notch top */}
                          <div className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] pointer-events-none">
                            <svg 
                              viewBox="0 0 20 20" 
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="w-full h-full block"
                            >
                              <path d="M 0 0 L 0 20 L 20 20 C 8.954 20 0 11.046 0 0 Z" fill="#f5f2f2" />
                            </svg>
                          </div>

                          {/* Cutout container matching page background */}
                          <div className="bg-[#f5f2f2] p-2.5 sm:p-3 md:p-3.5 rounded-tr-[28px] sm:rounded-tr-[34px]">
                            {/* Dark Charcoal Card */}
                            <div className="bg-[#1c1d21] text-white p-5 sm:p-7 md:p-8 rounded-[20px] sm:rounded-[24px] max-w-[280px] sm:max-w-sm md:max-w-md shadow-2xl border border-white/5">
                              <h4 className="font-sans text-xl sm:text-2xl font-semibold text-white tracking-tight mb-2.5">
                                {srv.notchTitle}
                              </h4>
                              <p className="font-sans text-xs sm:text-[13.5px] text-[#d0d1db]/90 font-light leading-relaxed">
                                {srv.notchDescription}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Right Inverted Corner: curves notch right edge into image bottom boundary */}
                        <div className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] pointer-events-none self-end">
                          <svg 
                            viewBox="0 0 20 20" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="w-full h-full block"
                          >
                            <path d="M 0 0 L 0 20 L 20 20 C 8.954 20 0 11.046 0 0 Z" fill="#f5f2f2" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>

                    {/* Right Column: Headline, Secondary Image, Sub-feature & CTA */}
                    <motion.div 
                      initial={{ opacity: 0, y: 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="lg:col-span-5 flex flex-col justify-between py-2 order-1 lg:order-2"
                    >
                      {/* Top Headline Block */}
                      <div>
                        <h2 
                          className="font-playfair text-3xl sm:text-4xl md:text-5xl text-[#101014] font-normal tracking-tight leading-[1.15] mb-5"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {srv.title}
                        </h2>
                        <p className="font-sans text-base sm:text-[17px] text-[#3d3d47] font-light leading-relaxed max-w-xl">
                          {srv.description}
                        </p>
                      </div>

                      {/* Middle Secondary Showcase Image (Resentii Multi-Image Model) */}
                      {srv.secondaryImage && (
                        <div 
                          onClick={() => setSelectedServiceModal(rawService)}
                          className="rounded-[22px] sm:rounded-[28px] overflow-hidden aspect-[16/9] w-full my-6 sm:my-8 shadow-md border border-black/5 group cursor-pointer bg-black/5"
                        >
                          <img 
                            src={srv.secondaryImage} 
                            alt={`${srv.title} Showcase`} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      )}

                      {/* Bottom Feature Block & CTA Button */}
                      <div className="space-y-4">
                        <h4 className="font-sans text-2xl sm:text-3xl text-[#101014] font-medium tracking-tight">
                          {srv.subTitle}
                        </h4>
                        <p className="font-sans text-sm sm:text-base text-[#555] font-light leading-relaxed max-w-xl">
                          {srv.subDescription}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-3">
                          <Link
                            to="/contact"
                            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#101014] hover:bg-black text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md hover:scale-105 active:scale-95 group"
                          >
                            <span>Request Consultation</span>
                            <span className="text-sm font-bold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                              ↗
                            </span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => setSelectedServiceModal(rawService)}
                            className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-[#e3e3de] hover:border-[#141517] text-xs font-semibold uppercase tracking-wider text-[#141517] bg-white/60 hover:bg-white transition-all shadow-sm"
                          >
                            <HiOutlineInformationCircle className="w-4 h-4 text-[#777]" />
                            <span>Quick Specs</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>

                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* =========================================================================
            05 — FAQ SECTION (Resentii Master Showcase Model)
        ========================================================================= */}
        <section id="services-faq" className="w-full bg-white border-t border-[#e5e5e5] pt-20 sm:pt-28 pb-24 sm:pb-32 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: FAQ Badge, Heading, Copy & Portrait Showcase Card */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 space-y-6 lg:space-y-8"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101014] text-white text-xs font-medium mb-6 shadow-sm">
                    <HiQuestionMarkCircle className="w-3.5 h-3.5 text-white/90" />
                    <span className="tracking-wide">FAQ</span>
                  </div>

                  <h2 className="font-sans text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] text-[#101014] font-medium tracking-tight leading-[1.12] mb-5">
                    Got Questions?<br />We Have Answers.
                  </h2>

                  <p className="font-sans text-sm sm:text-base text-[#666666] font-light leading-relaxed max-w-md">
                    From first consultation to final installation, we know you want to understand exactly what to expect. Here’s everything you need to know about working with Make My Cottage.
                  </p>
                </div>

                {/* Portrait Image Matching Resentii Consultation Showcase (Exact Photo, Clean Rounded Frame) */}
                <div className="rounded-[28px] sm:rounded-[34px] overflow-hidden aspect-[4/5] w-full max-w-[340px] shadow-sm border border-black/5 bg-[#f5f2f2]">
                  <img
                    src="/images/services-faq-consultant.png"
                    alt="Make My Cottage Design & Engineering Consultation"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              {/* Right Column: Resentii Accordion with Clean Line Separators */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 border-t border-[#e5e5e5]"
              >
                {SERVICES_FAQS.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div key={index} className="border-b border-[#e5e5e5]">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full flex items-center gap-4 sm:gap-6 py-5 sm:py-6 text-left group select-none cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className={`text-xl sm:text-2xl font-light text-[#101014] shrink-0 leading-none w-5 text-center transition-transform duration-300 select-none ${isOpen ? 'rotate-45' : ''}`}>
                          +
                        </span>
                        <span className="font-sans text-base sm:text-lg md:text-[19px] text-[#101014] font-medium leading-snug group-hover:text-black transition-colors">
                          {faq.question}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pl-9 sm:pl-11 pb-5 pr-4">
                              <p className="font-sans text-sm sm:text-base text-[#666666] font-light leading-relaxed max-w-2xl">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>

            </div>
          </div>
        </section>
      </div>

      {/* =========================================================================
          06 — INTERACTIVE SERVICE MODAL
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
