import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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
    badge: 'Scale',
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
    role: 'Co-Founder & Technical Director',
    experience: '14+ yrs experience',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    bio: 'Oversees site logistics, contractor scheduling, and rapid prefabrication assembly across remote and urban sites.'
  }
];

const recognitions = [
  {
    id: '01',
    year: '2011',
    title: 'NHBC registered builder & craftsman',
    awardedBy: 'National House Building Council',
    detail: 'Recognized for precision timber joinery and foundation waterproofing integrity.'
  },
  {
    id: '02',
    year: '2016',
    title: 'Federation of master builders member',
    awardedBy: 'Master Builders Guild',
    detail: 'Certified for high-standard craftsmanship and verified ethical client management.'
  },
  {
    id: '03',
    year: '2019',
    title: 'ISO 9001:2015 Quality Certified',
    awardedBy: 'International Quality Standards',
    detail: 'Endorsed for structural timber quality control, lumber kiln seasoning, and risk mitigation.'
  },
  {
    id: '04',
    year: '2023',
    title: 'Built environment architecture award',
    awardedBy: 'Industry Excellence Board',
    detail: 'Awarded for landmark eco-resorts and climate-resilient wooden farmhouses.'
  },
  {
    id: '05',
    year: '2024',
    title: 'CHAS accredited principal contractor',
    awardedBy: 'Contractors Health & Safety Scheme',
    detail: 'Acknowledged for zero-incident site safety records and disciplined coordination.'
  }
];

const springTransition = {
  type: 'spring',
  damping: 42,
  stiffness: 90,
  mass: 1
};

const TimelineMilestoneItem = ({ item, idx, historyProgress }) => {
  const thresholds = [0.0, 0.18, 0.38, 0.58, 0.78, 0.96];
  const threshold = thresholds[idx];

  const dotBorder = useTransform(
    historyProgress,
    [Math.max(0, threshold - 0.04), threshold],
    ['#DDD5C2', '#1B1915']
  );
  const dotBg = useTransform(
    historyProgress,
    [Math.max(0, threshold - 0.04), threshold],
    ['#FAF7F0', '#1B1915']
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Milestone Circle Dot centered directly on the timeline line at every year */}
      <motion.span
        style={{
          borderColor: dotBorder,
          backgroundColor: dotBg
        }}
        className="absolute left-[-40px] md:left-[-56px] top-2 sm:top-2.5 w-4 h-4 rounded-full border-[3px] shadow-sm z-20"
      />

      {/* Year & Badge Header */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#1B1915] tracking-tight">
          {item.year}
        </span>
        <span className="bg-[#FAE1A6] text-[#271E07] px-3 py-1 rounded-[4px] text-xs font-medium shadow-sm">
          {item.badge}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1B1915] mb-2.5">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-base text-[#504732] leading-relaxed font-normal max-w-xl">
        {item.description}
      </p>
    </motion.div>
  );
};

const AboutPage = () => {
  // Sticky Stacking Cards Section Scroll Controller
  const stackedSectionRef = useRef(null);
  const { scrollYProgress: stackProgress } = useScroll({
    target: stackedSectionRef,
    offset: ['start start', 'end end']
  });

  // Background blur and dimming over the panoramic foundation image
  const bgBlur = useTransform(stackProgress, [0, 0.25, 0.85], [4, 12, 16]);
  const bgDim = useTransform(stackProgress, [0, 0.25], [0.1, 0.35]);

  // Card 1 ("Future Expectation")
  // 100% centered and visible from progress 0 to 0.40
  // Between 0.40 and 0.52: scales down slightly (1 -> 0.9) and fades out as Card 2 stacks over it
  const card1Y = useTransform(stackProgress, [0, 0.40, 0.52], [0, 0, -30]);
  const card1Scale = useTransform(stackProgress, [0, 0.40, 0.52], [1, 1, 0.9]);
  const card1Opacity = useTransform(stackProgress, [0, 0.40, 0.50], [1, 1, 0]);

  // Card 2 ("Working standard")
  // Strictly off-screen below (y: 1000px) and invisible (opacity: 0) from 0 to 0.40
  // Between 0.40 and 0.52: slides up cleanly into center (y: 0, opacity: 1, scale: 1)
  // Stays centered from 0.52 to 0.85
  // Scrolls out of view between 0.85 and 1.0 (y: -120px, opacity: 0)
  const card2Y = useTransform(stackProgress, [0, 0.40, 0.52, 0.85, 1], [1000, 1000, 0, 0, -120]);
  const card2Opacity = useTransform(stackProgress, [0, 0.40, 0.48, 0.88, 1], [0, 0, 1, 1, 0]);
  const card2Scale = useTransform(stackProgress, [0.40, 0.52], [0.92, 1]);

  // =========================================================================
  // Ground Rules Sticky Scroll Controller & One-by-One Line Shrinking
  // The section stays pinned in the viewport while each line progressively shrinks
  // from 254px down to 133px one by one along with the scroll.
  // All 4 bars complete shrinking by 65% progress, ensuring all bars are fully
  // completed before the section ever scrolls down.
  // =========================================================================
  const groundRulesRef = useRef(null);
  const { scrollYProgress: groundProgress } = useScroll({
    target: groundRulesRef,
    offset: ['start start', 'end end']
  });

  const col1Height = useTransform(groundProgress, [0.05, 0.20], [254, 133]);
  const col2Height = useTransform(groundProgress, [0.20, 0.35], [254, 133]);
  const col3Height = useTransform(groundProgress, [0.35, 0.50], [254, 133]);
  const col4Height = useTransform(groundProgress, [0.50, 0.65], [254, 133]);
  const colHeights = [col1Height, col2Height, col3Height, col4Height];

  // =========================================================================
  // History Timeline Scroll-Driven Black Progress Line
  // Black line extends downwards along the timeline as the user scrolls
  // =========================================================================
  const historyTimelineRef = useRef(null);
  const { scrollYProgress: historyProgress } = useScroll({
    target: historyTimelineRef,
    offset: ['start 75%', 'end 55%']
  });
  const historyLineHeight = useTransform(historyProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="bg-[#FAF7F0] text-[#1B1915] min-h-screen font-sans selection:bg-[#FAE1A6] selection:text-[#271E07]">
      <Helmet>
        <title>About Us | Make My Cottage - Turning Complicated Plans Into Clear Execution</title>
        <meta
          name="description"
          content="Learn about Make My Cottage. Structured coordination, direct communication, and disciplined oversight keep every timber home and cottage build moving clearly and predictably forward."
        />
      </Helmet>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Screenshot 1) */}
      {/* ========================================================================= */}
      <section className="pt-32 sm:pt-40 md:pt-44 pb-12 md:pb-16 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        {/* Main Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] font-medium tracking-[-0.035em] leading-[0.96] text-[#1B1915] mb-8 max-w-5xl"
        >
          Turning complicated<br />
          plans into clear<br />
          execution.
        </motion.h1>

        {/* Subtitle & Book a Call CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-[#504732] max-w-xl font-normal leading-relaxed"
          >
            Structured coordination, direct communication, and disciplined oversight keep every stage moving clearly and predictably forward.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[#1B1915] hover:bg-black text-[#FAF7F0] px-7 py-3.5 rounded-full font-medium text-sm md:text-base transition-all duration-300 hover:scale-[1.03] shadow-md group"
            >
              <span>Book a call</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. STICKY BLURRED HERO BANNER + STACKING FEATURE CARDS (Screenshot 1 & 2) */}
      {/* ========================================================================= */}
      <section ref={stackedSectionRef} className="relative h-[240vh] w-full">
        {/* Unified Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-4 sm:px-8">
          {/* Panoramic Foundation Background Image */}
          <img
            src="/images/about/hero-foundation.jpg"
            onError={(e) => {
              e.currentTarget.src = "https://framerusercontent.com/images/J9MqEXKjA7McbiNo1TApI5zUMQQ.jpg";
            }}
            alt="Make My Cottage construction foundation execution"
            className="absolute inset-0 w-full h-full object-cover z-0"
            loading="eager"
          />

          {/* Dynamic Backdrop Blur & Tint */}
          <motion.div
            style={{
              backdropFilter: useTransform(bgBlur, b => `blur(${b}px)`),
              WebkitBackdropFilter: useTransform(bgBlur, b => `blur(${b}px)`),
              backgroundColor: useTransform(bgDim, d => `rgba(20, 18, 14, ${d})`)
            }}
            className="absolute inset-0 z-[1] pointer-events-none transition-colors"
          />

          {/* Center Card Container */}
          <div className="relative z-10 w-full max-w-4xl flex items-center justify-center min-h-[420px]">

            {/* ---------------- CARD 1: Future Expectation ---------------- */}
            <motion.div
              style={{
                y: card1Y,
                scale: card1Scale,
                opacity: card1Opacity
              }}
              className="absolute w-full bg-[#F9F0DA] border border-[#E0D5BD] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl"
            >
              <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-10">
                {/* Left Image: Construction workers on building site */}
                <div className="w-full md:w-[260px] lg:w-[280px] h-[220px] sm:h-[260px] md:h-[290px] shrink-0 rounded-2xl overflow-hidden shadow-sm bg-[#E8DFC8]">
                  <img
                    src="/images/about/future-expectation.png"
                    onError={(e) => {
                      e.currentTarget.src = "https://framerusercontent.com/images/NBBlbWROSapSp6qQF3L5diW5o.png?width=1064&height=1260";
                    }}
                    alt="Construction workers on building site"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {/* Right Text Content */}
                <div className="flex-1 space-y-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-medium tracking-tight text-[#1B1915]">
                    Future Expectation
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-[#504732] leading-relaxed font-normal">
                    Make My Cottage is reshaping how clients experience major renovations, timber architecture, and custom cottage retreats by making construction feel transparent, predictable, and professionally managed instead of stressful, confusing, and reactive.
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-[#504732] leading-relaxed font-normal">
                    Raising project communication standards so clients no longer expect delays, silence, or uncertainty.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ---------------- CARD 2: Working standard ---------------- */}
            <motion.div
              style={{
                y: card2Y,
                scale: card2Scale,
                opacity: card2Opacity
              }}
              className="absolute w-full bg-[#F9F0DA] border border-[#E0D5BD] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl z-20"
            >
              <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-10">
                {/* Left Image: Timber craftsmanship & workers */}
                <div className="w-full md:w-[260px] lg:w-[280px] h-[220px] sm:h-[260px] md:h-[290px] shrink-0 rounded-2xl overflow-hidden shadow-sm bg-[#E8DFC8]">
                  <img
                    src="/images/about/working-standard.png"
                    onError={(e) => {
                      e.currentTarget.src = "https://framerusercontent.com/images/FYMD4tETcedhyjeJ74hNQBZZu2U.png?width=1064&height=1260";
                    }}
                    alt="Workers measuring timber structure"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {/* Right Text Content */}
                <div className="flex-1 space-y-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-medium tracking-tight text-[#1B1915]">
                    Working standard
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-[#504732] leading-relaxed font-normal">
                    Make My Cottage delivers organized, clearly managed spaces where clients always know what happens next, what decisions matter, and how timelines, costs, and site activity are being controlled from day one through final handover.
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-[#504732] leading-relaxed font-normal">
                    Manages complex timber structures through disciplined planning, direct communication, and accountable on-site coordination.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. GROUND RULES - 4 SCROLL-SHRINKING TIMELINE PILLARS (Screenshot 1 vs 2) */}
      {/* ========================================================================= */}
      <section
        ref={groundRulesRef}
        className="relative bg-[#FAF7F0] border-t border-[#EAE3D2] md:h-[360vh] py-20 md:py-0"
      >
        <div className="md:sticky md:top-0 md:h-screen flex flex-col justify-center pt-8 md:pt-20 pb-8 md:pb-12 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto w-full z-10">
          {/* Section Tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 bg-[#DE5533] rounded-[2px]" />
            <span className="text-xs sm:text-sm font-medium tracking-wider text-[#6B6149] uppercase">
              Ground rules
            </span>
          </div>

          {/* Section Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium tracking-[-0.03em] leading-[1.08] text-[#1B1915] max-w-3xl mb-8 md:mb-12">
            Standards built through difficult site experience
          </h2>

          {/* 4 Animated Columns whose timeline lines shrink one by one along with scroll */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 items-start w-full">
            {groundRules.map((rule, idx) => (
              <div key={idx} className="flex flex-col">
                {/* Number (01, 02, 03, 04) */}
                <div className="text-4xl sm:text-5xl font-light text-[#BAB3A2] tracking-tight mb-4 select-none">
                  {rule.number}
                </div>

                {/* Dynamic Scroll-Linked Timeline Line (shrinks from 254px to 133px one by one) */}
                <motion.div
                  style={{ height: colHeights[idx] }}
                  className="relative w-8 mb-6 flex flex-col items-center justify-between"
                >
                  {/* Top Dot */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1B1915] shrink-0" />

                  {/* Center Vertical Line */}
                  <div className="w-[2px] bg-[#1B1915] flex-1 my-0.5" />

                  {/* Bottom Dot */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1B1915] shrink-0" />
                </motion.div>

                {/* Amber Pill Badge (glides upward as line shrinks) */}
                <div className="mb-4">
                  <span className="inline-block bg-[#FAE1A6] text-[#271E07] px-3.5 py-1.5 rounded-[4px] text-xs font-medium tracking-wide shadow-sm">
                    {rule.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#1B1915] mb-2.5">
                  {rule.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#504732] leading-relaxed font-normal">
                  {rule.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HISTORY / STICKY TIMELINE SECTION (Screenshot 5) */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-[#EAE3D2]">
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
          className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-[#1B1915] max-w-3xl mb-16 md:mb-20"
        >
          What Make My Cottage learned along the way
        </motion.h2>

        {/* 2-Column Layout with Sticky Sunset Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Vertical Timeline Milestones with Scroll-Driven Black Progress Line & Dots at Every Year */}
          <div ref={historyTimelineRef} className="lg:col-span-7 relative pl-10 md:pl-14 space-y-16 md:space-y-24 py-2">
            {/* Base background beige line starting at first year (2009) down to last year (2024) */}
            <div className="absolute left-[6px] top-3.5 sm:top-4 bottom-3.5 sm:bottom-4 w-[4px] bg-[#DDD5C2] rounded-full overflow-hidden">
              {/* Dynamic black progress line that extends downwards on scroll */}
              <motion.div
                style={{ height: historyLineHeight }}
                className="w-full bg-[#1B1915] rounded-full origin-top"
              />
            </div>

            {timelineMilestones.map((item, idx) => (
              <TimelineMilestoneItem
                key={idx}
                item={item}
                idx={idx}
                historyProgress={historyProgress}
              />
            ))}
          </div>

          {/* Right Column: Sticky Sunset Framing Image (Pinned at top: 80px, height: 753px matching Konstra) */}
          <div className="lg:col-span-5 hidden lg:block lg:sticky lg:top-20">
            <div className="h-[753px] rounded-xl overflow-hidden shadow-2xl border border-black/5 relative group bg-[#1B1915]">
              <img
                src="/images/about/history-sunset.jpg"
                onError={(e) => {
                  e.currentTarget.src = "https://framerusercontent.com/images/efmBUaPsdR45OdRoi5sOpflVXrM.jpg";
                }}
                alt="Tower cranes silhouettes during dramatic orange sunset"
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
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-[#EAE3D2]">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4 justify-center">
          <span className="w-2.5 h-2.5 bg-[#DE5533] rounded-[2px]" />
          <span className="text-sm font-medium tracking-wider text-[#6B6149] uppercase">
            Team
          </span>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-[#1B1915] mb-4"
          >
            Experienced minds behind complex site execution
          </motion.h2>
          <p className="text-base text-[#504732] max-w-xl mx-auto">
            Our multidisciplinary leadership combines architectural mastery, precision timber engineering, and seasoned on-site project directors.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                type: 'spring',
                damping: 42,
                stiffness: 90,
                delay: idx * 0.08
              }}
              className="bg-[#F9F0DA] border border-[#E0D5BD] rounded-2xl p-6 group hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-[#E8DFC8]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-xl font-medium text-[#1B1915] tracking-tight">
                    {member.name}
                  </h3>
                  <span className="text-xs text-[#897F6C] font-mono">
                    {member.experience}
                  </span>
                </div>
                <p className="text-sm font-medium text-[#DE5533] mb-3">
                  {member.role}
                </p>
                <p className="text-xs sm:text-sm text-[#504732] leading-relaxed font-light">
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
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-[#EAE3D2]">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 bg-[#DE5533] rounded-[2px]" />
          <span className="text-sm font-medium tracking-wider text-[#6B6149] uppercase">
            Award & certification
          </span>
        </div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-[#1B1915] max-w-3xl mb-16"
        >
          Built on a record that speaks for itself.
        </motion.h2>

        {/* List of Awards */}
        <div className="divide-y divide-[#E0D7C4] border-t border-b border-[#E0D7C4]">
          {recognitions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                type: 'spring',
                damping: 42,
                stiffness: 90,
                delay: idx * 0.08
              }}
              className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center group hover:bg-[#F9F0DA]/60 transition-colors px-3 sm:px-4 rounded-xl"
            >
              <div className="md:col-span-2 flex items-center gap-4">
                <span className="text-xs font-mono text-[#897F6C]">{item.id}</span>
                <span className="text-lg font-medium text-[#1B1915]">{item.year}</span>
              </div>
              <div className="md:col-span-6">
                <h3 className="text-lg sm:text-xl font-medium text-[#1B1915] group-hover:text-[#DE5533] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6E644F] mt-1 font-light">
                  {item.detail}
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <span className="inline-block bg-[#F9F0DA] border border-[#E0D5BD] text-[#271E07] text-xs font-medium px-3.5 py-1.5 rounded-full shadow-sm">
                  {item.awardedBy}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. BOTTOM CONSULTATION CTA SECTION (FULL-WIDTH IMMERSIVE) */}
      {/* ========================================================================= */}
      <section id="consultation-cta" className="relative w-full overflow-hidden bg-[#030000] py-28 sm:py-36 md:py-48 lg:py-64 flex items-center min-h-[640px] md:min-h-[780px] lg:min-h-[872px]">
        {/* Photographic Background - Construction Site at Sunset */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about/cta-sunset-site.webp"
            alt="Construction worker looking at sunset site"
            className="w-full h-full object-cover object-[75%_center] md:object-center"
          />
          {/* Subtle gradient scrim on the left for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent pointer-events-none" />
          {/* Seamless gradient into the black footer */}
          <div className="absolute inset-x-0 bottom-0 h-44 sm:h-64 md:h-80 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 w-full">
          <div className="max-w-[490px]">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-[56px] font-medium tracking-[-0.02em] leading-[1.08] text-[#FCF6E9] mb-6"
            >
              Talk through your ideas clearly.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-base sm:text-lg text-[#BAB3A2] leading-relaxed font-normal mb-10"
            >
              You’ll get a clear understanding of cost range, timeline expectations, and what your space realistically requires.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 bg-[#FCF6E9] hover:bg-white text-[#1B1915] px-7 py-3.5 rounded-full font-medium text-sm md:text-base transition-all duration-300 hover:scale-[1.02] shadow-lg group"
              >
                <span>Book a call</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
