import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  MapPin, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  Check,
  Trees,
  Maximize2,
  Mountain,
  Ruler
} from 'lucide-react';
import { PROJECTS_DATA, BUSINESS_INFO } from '../utils/constants';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = PROJECTS_DATA.find((p) => p.slug === slug) || PROJECTS_DATA[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-[#141517] px-6">
        <h1 className="font-serif text-5xl md:text-7xl mb-6 font-normal">Project Not Found</h1>
        <Link 
          to="/projects"
          className="px-8 py-3.5 rounded-full bg-[#141517] text-white text-xs uppercase tracking-widest font-semibold hover:bg-black transition-colors"
        >
          &larr; Back to Projects
        </Link>
      </div>
    );
  }

  // Related projects (filter out current project, take 2)
  const relatedProjects = PROJECTS_DATA
    .filter((p) => p.id !== project.id)
    .slice(0, 2);

  // Gallery images with a strict limit of 5-6 images only
  const rawGallery = project.images && project.images.length > 0 
    ? project.images 
    : [project.heroImage];
  const galleryImages = rawGallery.slice(0, 6);

  // Default features if not specifically set
  const featuresList = project.features || [
    'Precision Timber Frame Engineering',
    'Vacuum-Pressure Weatherproof Timber Treatment',
    'Custom High-Thermal Glass & Joinery',
    'Native Stone & Reinforced Foundation',
    'Custom 3D Modeled Architectural Interior',
    'Turnkey Rapid Handover Assembly'
  ];

  return (
    <div className="bg-[#ffffff] min-h-screen w-full text-[#141517] selection:bg-[#28282c] selection:text-white">
      <Helmet>
        <title>{`${project.name} | Make My Cottage Portfolio`}</title>
        <meta name="description" content={project.shortDescription || project.description} />
      </Helmet>

      {/* =========================================================================
          1. TOP PROJECT TITLE & HERO COVER SECTION (Resentii Style)
      ========================================================================= */}
      <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8 sm:pb-12">
        {/* Minimal Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-sans font-medium text-[#555866] hover:text-[#141517] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* Title & Metadata Wrapper */}
        <div className="max-w-4xl mb-8 sm:mb-10">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center mb-4">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-sans font-medium bg-[#28282c] text-white shadow-sm">
              {project.category}
            </span>
          </div>

          {/* Editorial Project Title Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#141517] tracking-tight leading-[1.05] mb-5">
            {project.name}
          </h1>

          {/* Location & Project Specs Meta Row */}
          <div className="flex flex-wrap items-center gap-6 text-sm font-sans text-[#555866]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#8C6544]" />
              <span>{project.location}</span>
            </div>
            {project.specs?.builtUpArea && (
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C6544]" />
                <span>{project.specs.builtUpArea}</span>
              </div>
            )}
            {project.specs?.duration && (
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C6544]" />
                <span>{project.specs.duration} Execution</span>
              </div>
            )}
          </div>
        </div>

        {/* Property Hero Cover Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-[420px] sm:h-[540px] md:h-[620px] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#1c1d21] relative shadow-sm"
        >
          <img
            src={project.heroImage}
            alt={project.name}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>
      </section>

      {/* =========================================================================
          2. PROJECT DETAILS SECTION (Two-Column Layout: Story on Left, Specs on Right)
      ========================================================================= */}
      <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: Architectural Concept, Visual Stat Badges, Craftsmanship Pillars & Highlights */}
          <div className="lg:col-span-7 space-y-10">
            {/* 2.1 Architectural Concept & Vision */}
            <div>
              <span className="text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-[#8C6544] block mb-2">
                Architectural Concept
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#141517] tracking-tight leading-tight mb-4">
                Spatial Harmony &amp; Living Experience
              </h3>
              
              <blockquote className="border-l-2 border-[#8C6544] pl-5 my-5 text-base sm:text-lg font-serif italic text-[#141517] leading-relaxed bg-[#fbfbfe] py-2.5 rounded-r-xl">
                "{project.shortDescription}"
              </blockquote>

              <p className="font-sans text-base sm:text-[17px] text-[#555866] leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            {/* 2.2 Performance & Execution Quick Stat Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-4 rounded-[20px] bg-[#f8f9fb] border border-black/[0.04]">
                <span className="text-xs font-sans text-[#555866] block mb-1 font-light">Built-Up Area</span>
                <span className="text-base sm:text-lg font-serif text-[#141517] font-normal leading-none block">
                  {project.specs?.builtUpArea || '3,200 sq.ft'}
                </span>
              </div>
              <div className="p-4 rounded-[20px] bg-[#f8f9fb] border border-black/[0.04]">
                <span className="text-xs font-sans text-[#555866] block mb-1 font-light">Turnaround</span>
                <span className="text-base sm:text-lg font-serif text-[#141517] font-normal leading-none block">
                  {project.specs?.duration || '75 Days'}
                </span>
              </div>
              <div className="p-4 rounded-[20px] bg-[#f8f9fb] border border-black/[0.04]">
                <span className="text-xs font-sans text-[#555866] block mb-1 font-light">Wood Quality</span>
                <span className="text-base sm:text-lg font-serif text-[#141517] font-normal leading-none block">
                  100% Treated
                </span>
              </div>
              <div className="p-4 rounded-[20px] bg-[#f8f9fb] border border-black/[0.04]">
                <span className="text-xs font-sans text-[#555866] block mb-1 font-light">Structure</span>
                <span className="text-base sm:text-lg font-serif text-[#141517] font-normal leading-none block">
                  Bespoke Timber
                </span>
              </div>
            </div>

            {/* 2.3 Craftsmanship & Architectural Pillars (4 Editorial Architectural Cards) */}
            <div>
              <h4 className="font-serif text-2xl font-normal text-[#141517] tracking-tight mb-5">
                Craftsmanship &amp; Architectural Pillars
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 01: Timber */}
                <div className="group p-6 sm:p-7 rounded-[26px] bg-[#fdfcfb] hover:bg-white border border-black/[0.06] hover:border-[#8C6544]/30 hover:shadow-[0_12px_32px_rgba(140,101,68,0.08)] transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-[18px] bg-[#f5ede4] text-[#8C6544] flex items-center justify-center border border-[#e8dacd] group-hover:bg-[#8C6544] group-hover:text-white transition-all duration-300 shadow-sm">
                        <Trees className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="font-mono text-xs text-[#8C6544] font-medium tracking-widest">
                        01
                      </span>
                    </div>
                    <h5 className="font-serif text-xl sm:text-[22px] text-[#141517] font-normal tracking-tight mb-2 group-hover:text-[#8C6544] transition-colors duration-300">
                      Seasoned Hardwood
                    </h5>
                    <p className="font-sans text-xs sm:text-[13.5px] text-[#555866] leading-relaxed font-light">
                      Vacuum-pressure impregnated timber engineered to resist tropical monsoons, humidity, and subterranean termites for decades.
                    </p>
                  </div>
                </div>

                {/* 02: Indoor-Outdoor Continuity */}
                <div className="group p-6 sm:p-7 rounded-[26px] bg-[#fdfcfb] hover:bg-white border border-black/[0.06] hover:border-[#8C6544]/30 hover:shadow-[0_12px_32px_rgba(140,101,68,0.08)] transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-[18px] bg-[#f5ede4] text-[#8C6544] flex items-center justify-center border border-[#e8dacd] group-hover:bg-[#8C6544] group-hover:text-white transition-all duration-300 shadow-sm">
                        <Maximize2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="font-mono text-xs text-[#8C6544] font-medium tracking-widest">
                        02
                      </span>
                    </div>
                    <h5 className="font-serif text-xl sm:text-[22px] text-[#141517] font-normal tracking-tight mb-2 group-hover:text-[#8C6544] transition-colors duration-300">
                      Indoor-Outdoor Flow
                    </h5>
                    <p className="font-sans text-xs sm:text-[13.5px] text-[#555866] leading-relaxed font-light">
                      Expansive open-plan living with floor-to-ceiling glass merging seamlessly into timber verandahs, decks, and nature vistas.
                    </p>
                  </div>
                </div>

                {/* 03: Stone Plinth & Topography */}
                <div className="group p-6 sm:p-7 rounded-[26px] bg-[#fdfcfb] hover:bg-white border border-black/[0.06] hover:border-[#8C6544]/30 hover:shadow-[0_12px_32px_rgba(140,101,68,0.08)] transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-[18px] bg-[#f5ede4] text-[#8C6544] flex items-center justify-center border border-[#e8dacd] group-hover:bg-[#8C6544] group-hover:text-white transition-all duration-300 shadow-sm">
                        <Mountain className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="font-mono text-xs text-[#8C6544] font-medium tracking-widest">
                        03
                      </span>
                    </div>
                    <h5 className="font-serif text-xl sm:text-[22px] text-[#141517] font-normal tracking-tight mb-2 group-hover:text-[#8C6544] transition-colors duration-300">
                      Topography &amp; Stone Plinth
                    </h5>
                    <p className="font-sans text-xs sm:text-[13.5px] text-[#555866] leading-relaxed font-light">
                      Native stone foundation engineering that hugs natural terrain contours, preventing erosion and optimizing natural ventilation.
                    </p>
                  </div>
                </div>

                {/* 04: Precision CNC Joinery */}
                <div className="group p-6 sm:p-7 rounded-[26px] bg-[#fdfcfb] hover:bg-white border border-black/[0.06] hover:border-[#8C6544]/30 hover:shadow-[0_12px_32px_rgba(140,101,68,0.08)] transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-[18px] bg-[#f5ede4] text-[#8C6544] flex items-center justify-center border border-[#e8dacd] group-hover:bg-[#8C6544] group-hover:text-white transition-all duration-300 shadow-sm">
                        <Ruler className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="font-mono text-xs text-[#8C6544] font-medium tracking-widest">
                        04
                      </span>
                    </div>
                    <h5 className="font-serif text-xl sm:text-[22px] text-[#141517] font-normal tracking-tight mb-2 group-hover:text-[#8C6544] transition-colors duration-300">
                      Precision CNC Joinery
                    </h5>
                    <p className="font-sans text-xs sm:text-[13.5px] text-[#555866] leading-relaxed font-light">
                      High-precision CNC pre-milling at our facility followed by rapid, zero-waste on-site assembly supervised by master carpenters.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2.4 Key Features Grid */}
            <div>
              <h4 className="font-serif text-2xl font-normal text-[#141517] tracking-tight mb-5">
                Key Highlights &amp; Inclusions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {featuresList.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-[16px] bg-[#f8f9fb] border border-black/[0.04] hover:bg-[#f1f3f7] transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#141517] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white stroke-[2.5]" />
                    </div>
                    <span className="font-sans text-xs sm:text-sm text-[#3d3d47] font-medium leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Project Details Specifications Card & Contact CTA */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            {/* Specifications Card */}
            <aside className="bg-[#f8f9fb] p-7 sm:p-8 rounded-[30px] border border-black/[0.06]">
              <h4 className="font-serif text-2xl font-normal text-[#141517] mb-6">
                Project Details
              </h4>
              <div className="space-y-4 font-sans text-sm">
                <div className="flex justify-between items-center py-2.5 border-b border-black/[0.05]">
                  <span className="text-[#555866] font-light">Client</span>
                  <span className="font-medium text-[#141517] text-right">{project.specs?.client || project.name}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-black/[0.05]">
                  <span className="text-[#555866] font-light">Location</span>
                  <span className="font-medium text-[#141517] text-right">{project.specs?.location || project.location}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-black/[0.05]">
                  <span className="text-[#555866] font-light">Duration</span>
                  <span className="font-medium text-[#141517] text-right">{project.specs?.duration || '60 Days'}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-black/[0.05]">
                  <span className="text-[#555866] font-light">Built-up Area</span>
                  <span className="font-medium text-[#141517] text-right">{project.specs?.builtUpArea || '2,400 sq.ft'}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-black/[0.05]">
                  <span className="text-[#555866] font-light">Project Type</span>
                  <span className="font-medium text-[#141517] text-right">{project.specs?.projectType || project.category}</span>
                </div>
                <div className="flex justify-between items-center py-2.5">
                  <span className="text-[#555866] font-light">Construction</span>
                  <span className="font-medium text-[#141517] text-right">{project.specs?.constructionType || 'Timber Frame'}</span>
                </div>
              </div>
            </aside>

            {/* Quick Contact Card */}
            <aside className="bg-[#f8f9fb] p-7 sm:p-8 rounded-[30px] border border-black/[0.06]">
              <h4 className="font-serif text-2xl font-normal text-[#141517] mb-2.5">
                Have a Project?
              </h4>
              <p className="font-sans text-sm text-[#555866] leading-relaxed font-light mb-6">
                Let's discuss how we can bring your custom wooden home, resort cottage, or farmhouse to life with our precision timber architecture.
              </p>
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-[#141517] hover:bg-black text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md group"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. GALLERY (5-6 Images Limit) & RELATED PROJECTS (Resentii Section 2)
      ========================================================================= */}
      <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-black/[0.06]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: 2-Column Gallery Grid (Strictly Limited to 5-6 Images) */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#141517] tracking-tight">
                Gallery
              </h3>
              <span className="text-xs font-sans text-[#555866] font-medium">
                {galleryImages.length} Visuals
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-square sm:aspect-[4/3] rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#1c1d21] shadow-sm"
                >
                  <img
                    src={img}
                    alt={`${project.name} gallery image ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Project Location Map (Resentii Style Embedded Google Maps) */}
            <div className="mt-12 sm:mt-16">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#141517] tracking-tight">
                    Project Location
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#555866] font-light mt-1">
                    {project.location}
                  </p>
                </div>
                {project.mapUrl && (
                  <a
                    href={project.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f4ece4] hover:bg-[#8C6544] hover:text-white text-[#8C6544] text-xs font-sans font-medium transition-colors"
                  >
                    <span>Open in Maps</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Map Iframe Container with Smooth Rounded Corners */}
              <div className="w-full h-[360px] sm:h-[420px] md:h-[460px] rounded-[24px] sm:rounded-[30px] overflow-hidden border border-black/[0.08] shadow-sm relative bg-[#f0f2f5]">
                <iframe
                  title={`${project.name} Location on Google Maps`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(project.mapQuery || project.location)}&z=14&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Related Projects */}
          <div className="lg:col-span-5">
            <h4 className="font-serif text-2xl font-normal text-[#141517] mb-6">
              Related Projects
            </h4>

            <div className="flex flex-col gap-6">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/projects/${rel.slug}`}
                  className="group relative flex flex-col justify-between w-full h-[360px] sm:h-[390px] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-black/[0.08] hover:border-black/20 transition-all duration-500 bg-[#1c1d21] block no-underline shadow-sm hover:shadow-lg"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <img
                      src={rel.heroImage}
                      alt={rel.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  </div>

                  {/* Top Category Badge */}
                  <div className="relative z-10 p-5">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-sans font-medium bg-[#1c1d21]/80 backdrop-blur-md text-white/90 border border-white/15">
                      {rel.category}
                    </span>
                  </div>

                  {/* Bottom Info Panel */}
                  <div className="relative z-10 m-3.5 sm:m-4 p-5 rounded-[20px] bg-white/95 backdrop-blur-md border border-black/[0.06] shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h5 className="font-serif text-xl text-[#141517] font-normal tracking-tight group-hover:text-[#8C6544] transition-colors">
                          {rel.name}
                        </h5>
                        <p className="font-sans text-xs text-[#555866] mt-1 font-light">
                          {rel.location}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-black/[0.04] text-[#141517] group-hover:bg-[#141517] group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. FULL-BLEED CALL TO ACTION BANNER (Matching Resentii)
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

export default ProjectDetailPage;
