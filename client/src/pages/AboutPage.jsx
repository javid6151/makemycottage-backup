import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck, Compass, Sparkles, Building2, HardHat } from 'lucide-react';

const groundRules = [
  {
    number: '01',
    badge: 'Issues reported within 24 hours',
    title: 'Problems surface early',
    description: 'Clients hear difficult site issues immediately, before delays grow into expensive complications later.'
  },
  {
    number: '02',
    badge: 'Direct manager contact provided',
    title: 'Direct site access',
    description: 'Clients receive clear updates weekly, even during slower phases with little visible progress onsite.'
  },
  {
    number: '03',
    badge: 'Backup trades always prepared',
    title: 'Pressure stays internal',
    description: 'Make My Cottage adjusts sequencing, not client schedules, when subcontractors or seasonal challenges arise.'
  },
  {
    number: '04',
    badge: 'Written approvals before changes',
    title: 'No hidden decisions',
    description: 'Client approval needed for major cost or material changes before work begins.'
  }
];

const timelineMilestones = [
  {
    year: '2009',
    badge: 'Growth',
    title: 'First crew',
    description: 'Make My Cottage started with dedicated timber artisan crews managing challenging wooden cottages and custom retreat builds.'
  },
  {
    year: '2012',
    badge: 'Challenge',
    title: 'Missed deadline',
    description: 'A delayed fit-out required Make My Cottage to completely overhaul scheduling, modular prefabrication, and supplier coordination.'
  },
  {
    year: '2015',
    badge: 'Commitment',
    title: 'Walked away',
    description: 'Make My Cottage rejected a lucrative contract due to unrealistic timelines that would have compromised wood seasoning and structural joinery.'
  },
  {
    year: '2018',
    badge: 'Milestone',
    title: 'Structural pivot',
    description: 'Transitioned to 100% precision CNC engineered timber, certified kiln-dried woods, and European-standard thermal insulation systems.'
  },
  {
    year: '2021',
    badge: 'Innovation',
    title: 'Live tracking',
    description: 'Pioneered direct client portal access with daily photo journals and milestone sign-offs, eliminating communication vacuums.'
  },
  {
    year: '2024',
    badge: 'Excellence',
    title: 'Nationwide presence',
    description: 'Over 50+ luxury wooden cottages, eco-resorts, and farmhouses delivered turnkey across Telangana, Andhra, Karnataka, and Pan-India.'
  }
];

const teamMembers = [
  {
    name: 'Daniel Harper',
    role: 'Founder & Managing Director',
    experience: '18+ yrs experience',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    bio: 'Pioneered turnkey timber architecture and structural wood design standards across residential and resort developments.'
  },
  {
    name: 'Lucas Bennett',
    role: 'Construction Operations Lead',
    experience: '14+ yrs experience',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    bio: 'Oversees site logistics, contractor scheduling, and rapid prefabrication assembly across remote and urban sites.'
  },
  {
    name: 'Nathan Brooks',
    role: 'Senior Project Manager',
    experience: '12+ yrs experience',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
    bio: 'Direct bridge between client expectations, material procurement, and precise weekly milestone delivery.'
  },
  {
    name: 'Carter Hayes',
    role: 'Structural Timber Engineer',
    experience: '11+ yrs experience',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
    bio: 'Specialist in seismic calculation, heavy timber truss design, and tropical wood seasoning physics.'
  },
  {
    name: 'Ethan Cole',
    role: 'Commercial & Procurement Director',
    experience: '10+ yrs experience',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
    bio: 'Manages international lumber supply chains, transparent cost projections, and zero hidden price variability.'
  },
  {
    name: 'Mason Reed',
    role: 'Site Safety & Quality Officer',
    experience: '9+ yrs experience',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
    bio: 'Enforces rigorous European safety codes, moisture barrier validation, and finish tolerance inspections.'
  }
];

const recognitions = [
  {
    id: '01',
    year: '2011',
    title: 'Best Residential Timber Architecture',
    awardedBy: 'Regional Builders Guild',
    detail: 'Recognized for innovation in prefabricated joinery and climate-responsive cottage designs.'
  },
  {
    id: '02',
    year: '2015',
    title: 'Excellence in Site Management & Safety',
    awardedBy: 'National Construction Awards',
    detail: 'Awarded for zero-incident site track record and disciplined weekly coordination protocols.'
  },
  {
    id: '03',
    year: '2018',
    title: 'Eco-Friendly & Sustainable Construction',
    awardedBy: 'Green Building Council',
    detail: 'Honoring renewable timber sourcing and low-carbon footprint structural execution.'
  },
  {
    id: '04',
    year: '2021',
    title: 'Turnkey Builder of the Year',
    awardedBy: 'Industry Excellence Board',
    detail: 'Awarded for 100% on-time milestone delivery and client transparency leadership.'
  },
  {
    id: '05',
    year: '2024',
    title: 'Master Woodcraft & Structural Integrity Honor',
    awardedBy: 'National Architecture Forum',
    detail: 'Acknowledged for landmark resort cottages enduring tropical weather with zero structural degradation.'
  }
];

const AboutPage = () => {
  const containerRef = useRef(null);

  // Parallax scroll hook for hero panoramic image
  const heroImageRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroImageRef,
    offset: ['start end', 'end start']
  });
  const heroScale = useTransform(heroProgress, [0, 0.5, 1], [1.08, 1, 0.96]);
  const heroY = useTransform(heroProgress, [0, 1], [-25, 25]);

  return (
    <div ref={containerRef} className="bg-[#FAF7F0] text-[#141311] min-h-screen font-sans selection:bg-[#FAE1A6] selection:text-[#251D08]">
      <Helmet>
        <title>About Us | Make My Cottage - Turning Complex Plans Into Clear Execution</title>
        <meta
          name="description"
          content="Learn about Make My Cottage. Structured coordination, direct communication, and disciplined oversight keep every timber home and cottage build moving clearly and predictably forward."
        />
      </Helmet>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Screenshot 1) */}
      {/* ========================================================================= */}
      <section className="pt-32 sm:pt-40 md:pt-48 pb-16 md:pb-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        {/* Main Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] font-medium tracking-[-0.035em] leading-[0.96] text-[#141311] mb-10 max-w-5xl"
        >
          Turning complicated<br />
          plans into clear<br />
          execution.
        </motion.h1>

        {/* Subtitle & Book a Call CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-[#504732] max-w-xl font-normal leading-relaxed"
          >
            Structured coordination, direct communication, and disciplined oversight keep every stage moving clearly and predictably forward.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[#141311] hover:bg-black text-[#FAF7F0] px-7 py-4 rounded-full font-medium text-sm md:text-base transition-all duration-300 hover:scale-[1.02] shadow-sm group"
            >
              <span>Book a call</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Panoramic Site / Rebar Image Banner with Scroll Parallax */}
        <div ref={heroImageRef} className="w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-black/5 bg-[#E8E0D2] aspect-[16/9] sm:aspect-[21/9] max-h-[560px]">
          <motion.img
            style={{ scale: heroScale, y: heroY }}
            src="https://framerusercontent.com/images/J9MqEXKjA7McbiNo1TApI5zUMQQ.jpg"
            alt="Make My Cottage construction foundation execution"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. OVERLAPPING FEATURE CARDS (Screenshot 2) */}
      {/* ========================================================================= */}
      <section className="relative py-16 md:py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto space-y-12 md:space-y-16">
        {/* Card 1: Future Expectation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#F5EFE3] border border-[#E7DECC] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm hover:shadow-md transition-shadow duration-500"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Image: Tower crane at golden hour */}
            <div className="lg:col-span-5 h-[280px] sm:h-[340px] rounded-2xl overflow-hidden shadow-inner bg-[#E2DAC8]">
              <img
                src="https://framerusercontent.com/images/U52rM7F785xH79QyF4i4P0yB2g.jpg"
                alt="Architectural construction crane skyline"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Right Text Content */}
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#141311]">
                Future Expectation
              </h2>
              <p className="text-base sm:text-lg text-[#504732] leading-relaxed font-normal">
                Make My Cottage is reshaping how clients experience major renovations, timber architecture, and custom cottage retreats by making construction feel transparent, predictable, and professionally managed instead of stressful, confusing, and reactive.
              </p>
              <p className="text-base sm:text-lg text-[#504732] leading-relaxed font-normal">
                Raising project communication standards so clients no longer expect delays, silence, or uncertainty.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Working standard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#F5EFE3] border border-[#E7DECC] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm hover:shadow-md transition-shadow duration-500"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Image: Timber craftsmanship & modern wooden architecture */}
            <div className="lg:col-span-5 h-[280px] sm:h-[340px] rounded-2xl overflow-hidden shadow-inner bg-[#E2DAC8]">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186f5f8?w=1000&q=80"
                alt="Precision wooden structure and timber craft"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Right Text Content */}
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#141311]">
                Working standard
              </h2>
              <p className="text-base sm:text-lg text-[#504732] leading-relaxed font-normal">
                Every joint, timber truss, and foundation is engineered to exacting specifications. We maintain rigorous on-site quality controls, certified kiln-dried lumber sourcing, and zero compromise on safety or architectural elegance.
              </p>
              <p className="text-base sm:text-lg text-[#504732] leading-relaxed font-normal">
                Strict moisture-barrier integrity and calibrated pressure-treated lumber protect your investment against humidity, termites, and seasonal thermal shift for generations.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 3. GROUND RULES - 4 ANIMATED PROGRESS PILLARS (Screenshot 3 & 4) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-[#EAE3D2]">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 bg-[#DE5533] rounded-[2px]" />
          <span className="text-sm font-medium tracking-wider text-[#6B6149] uppercase">
            Ground rules
          </span>
        </div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-[#141311] max-w-3xl mb-16 md:mb-24"
        >
          Standards built through difficult site experience
        </motion.h2>

        {/* 4 Animated Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {groundRules.map((rule, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              className="flex flex-col"
            >
              {/* Number (01, 02, 03, 04) */}
              <div className="text-4xl sm:text-5xl font-light text-[#BDB5A2] tracking-tight mb-4">
                {rule.number}
              </div>

              {/* Animated Progress Line with Top and Bottom Dots */}
              <div className="relative h-44 sm:h-52 w-8 mb-6 flex flex-col items-center">
                {/* Top Dot */}
                <div className="w-2 h-2 rounded-full bg-[#3D3728] z-10" />

                {/* Vertical Line Track */}
                <div className="w-[1.5px] h-full bg-[#E0D7C4] relative flex justify-center">
                  {/* Expanding Fill on Scroll */}
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.2 + idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="w-[2px] bg-[#3D3728] origin-top"
                  />
                </div>

                {/* Bottom Dot */}
                <div className="w-2 h-2 rounded-full bg-[#3D3728] z-10" />
              </div>

              {/* Amber Pill Badge */}
              <div className="mb-4">
                <span className="inline-block bg-[#FAE1A6] text-[#2F240A] px-3.5 py-1.5 rounded-md text-xs font-medium tracking-wide">
                  {rule.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#141311] mb-3">
                {rule.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#5C5544] leading-relaxed font-normal">
                {rule.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HISTORY / STICKY TIMELINE SECTION (Screenshot 5) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-[#EAE3D2]">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 bg-[#DE5533] rounded-[2px]" />
          <span className="text-sm font-medium tracking-wider text-[#6B6149] uppercase">
            History
          </span>
        </div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-[#141311] max-w-3xl mb-16 md:mb-20"
        >
          What Make My Cottage learned along the way
        </motion.h2>

        {/* 2-Column Layout with Sticky Sunset Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Vertical Timeline Milestones */}
          <div className="lg:col-span-7 relative pl-8 md:pl-12 border-l-[2px] border-[#DDD5C2] space-y-16 md:space-y-24 py-4">
            {timelineMilestones.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="relative"
              >
                {/* Timeline Dot Indicator */}
                <span className="absolute -left-[41px] md:-left-[57px] top-2.5 w-4 h-4 rounded-full bg-[#FAF7F0] border-[3px] border-[#141311]" />

                {/* Year & Badge Header */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#141311] tracking-tight">
                    {item.year}
                  </span>
                  <span className="bg-[#FAE1A6] text-[#2F240A] px-3 py-1 rounded-md text-xs font-medium">
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#141311] mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-base text-[#5C5544] leading-relaxed font-normal max-w-xl">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Sticky Sunset Framing Image (Pinned on Scroll) */}
          <div className="lg:col-span-5 hidden lg:block lg:sticky lg:top-28">
            <div className="h-[560px] xl:h-[620px] rounded-3xl overflow-hidden shadow-2xl border border-black/5 relative group bg-[#141311]">
              <img
                src="https://framerusercontent.com/images/efmBUaPsdR45OdRoi5sOpflVXrM.jpg"
                alt="Make My Cottage construction sunset framing"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs tracking-wider uppercase opacity-85">
                Precision timber framing &bull; Tested for extreme weather
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. LEADERSHIP & TEAM SECTION */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-[#EAE3D2]">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 bg-[#DE5533] rounded-[2px]" />
          <span className="text-sm font-medium tracking-wider text-[#6B6149] uppercase">
            Team
          </span>
        </div>

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-[#141311] max-w-2xl"
          >
            Experienced minds behind complex site execution
          </motion.h2>
          <p className="text-base text-[#5C5544] max-w-md">
            Our multidisciplinary leadership combines architectural mastery, precision timber engineering, and seasoned on-site project directors.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="bg-[#F5EFE3] border border-[#E7DECC] rounded-2xl p-6 group hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-[#E2DAC8]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-xl font-medium text-[#141311] tracking-tight">
                    {member.name}
                  </h3>
                  <span className="text-xs text-[#8C7F68] font-mono">
                    {member.experience}
                  </span>
                </div>
                <p className="text-sm font-medium text-[#DE5533] mb-3">
                  {member.role}
                </p>
                <p className="text-xs sm:text-sm text-[#5C5544] leading-relaxed font-light">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. RECOGNITION & INDUSTRY AWARDS */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-[#EAE3D2]">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 bg-[#DE5533] rounded-[2px]" />
          <span className="text-sm font-medium tracking-wider text-[#6B6149] uppercase">
            Recognition
          </span>
        </div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-[#141311] max-w-3xl mb-16"
        >
          Built on a record that speaks for itself
        </motion.h2>

        {/* List of Awards */}
        <div className="divide-y divide-[#E0D7C4] border-t border-b border-[#E0D7C4]">
          {recognitions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center group hover:bg-[#F5EFE3]/40 transition-colors px-3 sm:px-4 rounded-xl"
            >
              <div className="md:col-span-2 flex items-center gap-4">
                <span className="text-xs font-mono text-[#8C7F68]">{item.id}</span>
                <span className="text-lg font-medium text-[#141311]">{item.year}</span>
              </div>
              <div className="md:col-span-6">
                <h3 className="text-lg sm:text-xl font-medium text-[#141311] group-hover:text-[#DE5533] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6E644F] mt-1 font-light">
                  {item.detail}
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <span className="inline-block bg-[#F5EFE3] border border-[#E7DECC] text-[#2F240A] text-xs font-medium px-3.5 py-1.5 rounded-full">
                  {item.awardedBy}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. BOTTOM CONSULTATION CTA CARD */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#141311] text-[#FAF7F0] rounded-3xl p-8 sm:p-14 lg:p-20 relative overflow-hidden shadow-2xl"
        >
          {/* Subtle background glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#DE5533]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-[#FAE1A6]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="text-xs tracking-[0.25em] uppercase text-[#FAE1A6] font-medium mb-4 inline-block">
              Start Your Journey
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white leading-[1.05] mb-6">
              Talk through your ideas clearly.
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light mb-10 max-w-2xl">
              Stay informed on costs, architectural blueprints, and realistic delivery timelines with Make My Cottage. We provide single-point accountability from foundation to final key handover.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-[#FAE1A6] hover:bg-[#F5D88E] text-[#231A05] px-8 py-4 rounded-full font-medium text-sm md:text-base transition-all duration-300 hover:scale-[1.03] shadow-md group"
              >
                <span>Book a consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white px-7 py-4 rounded-full font-medium text-sm md:text-base transition-colors duration-300"
              >
                <span>View Our Completed Cottages</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;
