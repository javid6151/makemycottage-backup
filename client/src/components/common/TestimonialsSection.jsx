import React, { useState, useEffect } from 'react';
import { HiChatAlt2 } from 'react-icons/hi';
import CloudShader from '@/components/ui/cloud-shader';
import api from '../../utils/api';

const DEFAULT_ROW_1 = [
  {
    id: 'r1-1',
    title: 'Our Members Notice the Difference Every Single Day',
    quote: 'The energy in the studio completely changed. Our members are more motivated and our membership has grown since the redesign.',
    author: 'Priya Anand',
    role: 'Studio Owner',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80'
  },
  {
    id: 'r1-2',
    title: 'A Restoration Done With Real Respect for History',
    quote: 'They preserved every detail that mattered while making the home fully liveable. The result was beyond what I imagined possible.',
    author: 'Richard Holloway',
    role: 'Homeowner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'
  },
  {
    id: 'r1-3',
    title: 'They Turned a Space We Never Used Into One We Use Every Day',
    quote: 'Our basement went from ignored to our favourite room. Warm, well-lit, and the moisture issues are completely resolved.',
    author: 'Gregory Hale',
    role: 'Property Owner',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80'
  },
  {
    id: 'r1-4',
    title: 'Bespoke Architecture Crafted Beyond Expectations',
    quote: 'From the precision interlocking pine joints to the expansive double-height deck, the craftsmanship is simply unmatched in Hyderabad.',
    author: 'Vikramaditya Reddy',
    role: 'Farmhouse Owner, Shamshabad',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80'
  }
];

const DEFAULT_ROW_2 = [
  {
    id: 'r2-1',
    title: 'Turnkey Delivery in 45 Days with Zero Headaches',
    quote: 'Make My Cottage delivered our 3-bedroom wooden villa within 45 days. The timber insulation keeps it naturally cool even during peak summer.',
    author: 'Ananya Rao',
    role: 'Resort Owner, Vikarabad',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80'
  },
  {
    id: 'r2-2',
    title: 'An Architectural Sanctuary in Harmony with the Forest',
    quote: 'They preserved every mature tree on our sloping hillside plot. Walking into our wooden cottage feels like a mountain sanctuary every day.',
    author: 'Dr. K. Srinivas',
    role: 'Hillside Cottage, Ananthagiri Hills',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'
  },
  {
    id: 'r2-3',
    title: 'Flawless European Joinery and Natural Thermal Insulation',
    quote: 'The precision German joinery and vacuum-treated timber are unbelievable. No drafts, complete acoustic privacy, and the aroma of natural wood.',
    author: 'Sunita Varma',
    role: 'Weekend Villa, Chevella',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80'
  },
  {
    id: 'r2-4',
    title: 'The Best Investment for Our Family Retreat',
    quote: 'From 3D architectural renders to foundation and turnkey keys, every single milestone was delivered with total transparency and care.',
    author: 'Rahul & Meera Kapoor',
    role: 'Cottage Owners, Shamirpet',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80'
  }
];

const QuoteIcon = () => (
  <svg
    className="w-7 h-7 sm:w-8 sm:h-8 text-stone-300/80 shrink-0 select-none"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

const TestimonialCard = ({ item }) => {
  return (
    <div className="w-[320px] sm:w-[380px] md:w-[420px] shrink-0 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-black/5 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between select-none mx-3">
      <div>
        <h3 className="font-heading font-serif text-base sm:text-lg font-bold text-[#141517] leading-snug mb-3 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#555] font-light leading-relaxed line-clamp-3 mb-6">
          {item.quote}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-stone-100">
        <div className="flex items-center gap-3">
          <img
            src={item.avatar}
            alt={item.author}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover border border-stone-200 shrink-0"
            loading="lazy"
          />
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-[#141517] leading-tight">
              {item.author}
            </h4>
            <p className="text-[11px] sm:text-xs text-[#777] font-light mt-0.5">
              {item.role}
            </p>
          </div>
        </div>

        <QuoteIcon />
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const [row1, setRow1] = useState(DEFAULT_ROW_1);
  const [row2, setRow2] = useState(DEFAULT_ROW_2);

  useEffect(() => {
    const loadDynamicTestimonials = async () => {
      try {
        const res = await api.get('/testimonials', { timeout: 2500 });
        const list = Array.isArray(res.data?.data) ? res.data.data : (Array.isArray(res.data) ? res.data : []);
        if (list && list.length > 0) {
          const formatted = list.map((t, idx) => ({
            id: t._id || `dyn-${idx}`,
            title: t.project ? `${t.project} Project` : 'Exceptional Architectural Craftsmanship',
            quote: t.quote,
            author: t.customerName,
            role: t.location || 'Homeowner',
            avatar: `https://images.unsplash.com/photo-${1500000000000 + (idx * 1000000)}?w=200&q=80`
          }));
          const mid = Math.ceil(formatted.length / 2);
          setRow1([...formatted.slice(0, mid), ...DEFAULT_ROW_1]);
          setRow2([...formatted.slice(mid), ...DEFAULT_ROW_2]);
        }
      } catch (err) {
        // Fallback silently to defaults
      }
    };
    loadDynamicTestimonials();
  }, []);

  return (
    <section className="py-20 sm:py-28 w-full flex justify-center px-1 sm:px-2 md:px-4">
      {/* Container spanning 97% width of screen matching screenshot */}
      <div className="w-[97%] max-w-[1900px] relative rounded-3xl sm:rounded-[44px] overflow-hidden pt-16 sm:pt-24 pb-16 sm:pb-24 shadow-2xl border border-white/20 bg-[#1d5fa7]">
        
        {/* Animated WebGL CloudShader background with vibrant blue sky and fluffy clouds matching screenshot */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          <CloudShader
            className="w-full h-full"
            speed={1.0}
            count={4}
            cloudColor="#ffffff"
            skyTopColor="#185698"
            skyBottomColor="#58a3ea"
          />
        </div>

        {/* Soft edge fades for smooth entering/exiting cards */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#185698]/80 to-transparent pointer-events-none z-20" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#185698]/80 to-transparent pointer-events-none z-20" />

        {/* Header: Exact replica with high-contrast text against sky */}
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#141517] text-xs uppercase tracking-wider font-semibold mb-6 shadow-md border border-white/40">
            <HiChatAlt2 className="w-4 h-4 text-[#ff4b18]" />
            <span>TESTIMONIALS</span>
          </div>

          <h2 className="font-heading font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.05] mb-5 drop-shadow-[0_3px_16px_rgba(10,30,65,0.7)]">
            What Our Clients<br />Say About Us
          </h2>

          <p className="text-sm sm:text-base text-white font-medium leading-relaxed max-w-xl mx-auto drop-shadow-[0_2px_10px_rgba(10,30,65,0.65)]">
            Nothing speaks louder than the experiences of those we’ve had the privilege of designing for. Here’s what they have to say.
          </p>
        </div>

        {/* Dual Marquee Ticker Tracks */}
        <div className="relative z-10 space-y-6 sm:space-y-8 overflow-hidden">
          {/* Row 1: Leftward continuous smooth ticker */}
          <div className="overflow-hidden flex select-none group">
            <div className="flex shrink-0 animate-testimonials-left group-hover:[animation-play-state:paused]">
              {row1.map((item, idx) => (
                <TestimonialCard key={`row1-a-${item.id}-${idx}`} item={item} />
              ))}
            </div>
            <div className="flex shrink-0 animate-testimonials-left group-hover:[animation-play-state:paused]" aria-hidden="true">
              {row1.map((item, idx) => (
                <TestimonialCard key={`row1-b-${item.id}-${idx}`} item={item} />
              ))}
            </div>
          </div>

          {/* Row 2: Rightward continuous smooth ticker */}
          <div className="overflow-hidden flex select-none group">
            <div className="flex shrink-0 animate-testimonials-right group-hover:[animation-play-state:paused]">
              {row2.map((item, idx) => (
                <TestimonialCard key={`row2-a-${item.id}-${idx}`} item={item} />
              ))}
            </div>
            <div className="flex shrink-0 animate-testimonials-right group-hover:[animation-play-state:paused]" aria-hidden="true">
              {row2.map((item, idx) => (
                <TestimonialCard key={`row2-b-${item.id}-${idx}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Embedded High-Performance CSS Keyframes */}
      <style>{`
        @keyframes testimonialsScrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes testimonialsScrollRight {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-testimonials-left {
          animation: testimonialsScrollLeft 45s linear infinite;
        }
        .animate-testimonials-right {
          animation: testimonialsScrollRight 45s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
