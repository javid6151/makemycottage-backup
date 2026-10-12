import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../utils/api';

const DEFAULT_STORIES = [
  {
    id: 'story-1',
    tab: 'Shamshabad Villa',
    quote: 'We used to lose the first six months of every project to civil contractor delays. Now our 3-bedroom timber sanctuary was signed off, precision-framed, and turnkey delivered in 45 days.',
    author: 'Vikramaditya Reddy',
    role: 'Farmhouse Owner, Shamshabad',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1400&h=1600&q=85&auto=format&fit=crop',
    caption: 'Golden hour across the double-height cedar verandah.',
  },
  {
    id: 'story-2',
    tab: 'Ananthagiri Retreat',
    quote: 'They preserved every mature pine tree on our sloping hillside plot. Walking into our wooden living room with the aroma of natural pine feels like a mountain sanctuary every morning.',
    author: 'Dr. K. Srinivas',
    role: 'Hillside Cottage, Ananthagiri Hills',
    image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1400&h=1600&q=85&auto=format&fit=crop',
    caption: 'Morning mist framing the A-frame pine sanctuary.',
  },
  {
    id: 'story-3',
    tab: 'Chevella Farmstead',
    quote: 'The precision German joinery and vacuum-treated timber are unbelievable. Zero drafts, total acoustic privacy, and the timber insulation keeps the interiors 8 degrees cooler in peak summer.',
    author: 'Sunita & Arvind Varma',
    role: 'Weekend Villa, Chevella',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1400&h=1600&q=85&auto=format&fit=crop',
    caption: 'Evening warmth across handcrafted timber joinery.',
  },
  {
    id: 'story-4',
    tab: 'Vikarabad Eco Resort',
    quote: 'We needed four turnkey modular wooden cottages completed before our seasonal hospitality launch. Make My Cottage executed all four units simultaneously with flawless precision.',
    author: 'Ananya Rao',
    role: 'Resort Director, Vikarabad',
    image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=1400&h=1600&q=85&auto=format&fit=crop',
    caption: 'Turnkey resort cottages ready for guest arrival.',
  },
  {
    id: 'story-5',
    tab: 'Shamirpet Lakeside',
    quote: 'From 3D architectural renders to stone plinth foundations and turnkey handover, every single milestone was delivered with total transparency, exact billing, and master craftsmanship.',
    author: 'Rahul & Meera Kapoor',
    role: 'Lakeside Residence, Shamirpet',
    image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1400&h=1600&q=85&auto=format&fit=crop',
    caption: 'Lakeside panoramic timber deck at twilight.',
  },
];

export const TestimonialsSection = () => {
  const [stories, setStories] = useState(DEFAULT_STORIES);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const loadDynamicTestimonials = async () => {
      try {
        const res = await api.get('/testimonials', { timeout: 2500 });
        const list = Array.isArray(res.data?.data) ? res.data.data : (Array.isArray(res.data) ? res.data : []);
        if (list && list.length > 0) {
          const dynamicItems = list.map((t, idx) => ({
            id: t._id || `dyn-${idx}`,
            tab: t.location || t.project || `Client Story ${idx + 1}`,
            quote: t.quote,
            author: t.customerName || 'Homeowner',
            role: t.role || t.location || 'Verified Client',
            image: t.image || DEFAULT_STORIES[idx % DEFAULT_STORIES.length].image,
            caption: t.project ? `${t.project} — Completed Turnkey Build` : DEFAULT_STORIES[idx % DEFAULT_STORIES.length].caption,
          }));
          setStories(dynamicItems);
        }
      } catch (err) {
        // Fallback silently to default curated stories
      }
    };
    loadDynamicTestimonials();
  }, []);

  const currentStory = stories[activeIndex] || stories[0];

  return (
    <section 
      id="testimonials" 
      aria-labelledby="testimonials-heading" 
      className="scroll-mt-20 py-24 sm:py-32 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto border-t border-[#e3e3de] relative"
    >
      <div id="stories" className="absolute -top-24 left-0 pointer-events-none" />

      {/* Header: Prominent Testimonials & Client Stories */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-14">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141517] text-white text-xs uppercase tracking-wider font-semibold mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff4b18]" />
            <span>Testimonials &amp; Client Stories</span>
          </div>

          <h2 
            id="testimonials-heading" 
            className="max-w-3xl font-heading font-serif text-3xl sm:text-5xl lg:text-6xl text-[#141517] font-normal leading-[1.02] tracking-tight"
          >
            What Our Clients Say About Us
          </h2>

          <p className="mt-4 max-w-xl text-[15px] sm:text-base leading-7 text-[#666] font-light">
            Real experiences from homeowners, estate developers, and retreat owners on what changed once timber matched their architectural vision.
          </p>
        </div>
      </div>

      {/* RBP Imageworks Master Bento Grid Card */}
      <div className="rounded-3xl border border-[#dedcd7] bg-[#f5f4f0] p-2.5 sm:p-3 lg:p-4 shadow-sm">
        <div className="grid gap-6 rounded-2xl lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-8">
          
          {/* Left Column: Big Editorial Quote & Animated Tablist */}
          <div className="flex min-w-0 flex-col justify-between px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10 lg:pb-8">
            <div className="relative min-h-[16rem] sm:min-h-[14rem] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={currentStory.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  role="tabpanel"
                >
                  <p className="font-heading font-serif text-[clamp(1.5rem,2.5vw,2.35rem)] leading-[1.2] tracking-tight text-[#141517] text-pretty">
                    &ldquo;{currentStory.quote}&rdquo;
                  </p>
                  <footer className="mt-8 text-[15px]">
                    <span className="font-medium text-[#141517]">{currentStory.author}</span>
                    <span className="text-[#777]">, {currentStory.role}</span>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Stories Tablist with exact active indicator top border */}
            <div 
              role="tablist" 
              aria-label="Client Stories" 
              className="-mx-4 sm:-mx-6 lg:-mx-8 mt-10 flex [scrollbar-width:none] gap-x-6 sm:gap-x-7 overflow-x-auto px-4 sm:px-6 lg:px-8 pt-5 whitespace-nowrap border-t border-[#dedcd7] [&::-webkit-scrollbar]:hidden"
            >
              {stories.map((story, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={story.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative -mt-5 shrink-0 rounded-sm pt-5 text-[14px] sm:text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black cursor-pointer ${
                      isActive ? 'text-[#141517]' : 'text-[#777] hover:text-[#141517]'
                    }`}
                  >
                    {isActive && (
                      <motion.span 
                        layoutId="activeStoryTabLine"
                        className="absolute inset-x-0 -top-px h-[2px] bg-[#141517]" 
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {story.tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Architectural Photography Preview with Gradient Caption */}
          <figure className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-auto lg:min-h-[460px] overflow-hidden rounded-2xl bg-[#ebe9e4] shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStory.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={currentStory.image}
                  alt={currentStory.caption}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Bottom shadow overlay for caption readability */}
            <span 
              aria-hidden="true" 
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 via-black/20 to-transparent" 
            />

            <AnimatePresence mode="wait">
              <motion.figcaption
                key={currentStory.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-[14px] sm:text-[15px] text-white font-medium"
              >
                {currentStory.caption}
              </motion.figcaption>
            </AnimatePresence>
          </figure>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
