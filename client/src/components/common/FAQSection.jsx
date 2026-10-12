import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiQuestionMarkCircle } from 'react-icons/hi';

const FAQS = [
  {
    question: 'How long does a typical project take from start to finish?',
    answer: 'For prefabricated modular timber homes and resort cottages, on-site precision assembly takes between 30 to 45 days after foundation work. Custom luxury wooden residences and larger weekend farmhouses typically take 3 to 6 months from initial 3D architectural sign-off to turnkey handover.'
  },
  {
    question: 'What does your design process look like?',
    answer: 'We follow a structured 6-stage turnkey journey: 1) Site analysis & topography discovery, 2) Custom 3D architectural modeling & floor plans, 3) Precision timber selection & structural engineering, 4) Off-site prefabrication & kiln seasoning, 5) On-site assembly led by master carpenters, and 6) Turnkey handover with full weatherproofing, electrical fixtures, and joinery polishing.'
  },
  {
    question: 'What sets Make My Cottage apart from other design firms?',
    answer: 'Unlike conventional contractors or concrete builders, we specialize exclusively in sustainable timber architecture and engineered modular wood construction. Our homes offer natural thermal insulation (cooler summers, warmer winters), carbon-negative footprint, earthquake resistance, and unmatched German-standard joinery precision delivered on transparent, predictable timelines.'
  },
  {
    question: 'Do you offer remote design consultations?',
    answer: 'Yes! We provide remote 3D design consultations for clients across India and NRI homeowners worldwide. You can also visit our flagship Experience Center on the ORR Service Road in Shamshabad, Hyderabad (next to Bentley Service Station) to tour full-scale wooden cottage prototypes and inspect timber species in person.'
  },
  {
    question: 'What geographic areas do you serve?',
    answer: 'We build extensively across Telangana and Andhra Pradesh—including Hyderabad, Shamshabad, Vikarabad, Chevella, Ananthagiri Hills, Nagarjuna Sagar, Vijayawada, and Visakhapatnam. We also manufacture and deliver prefabricated timber packages nationwide across all states in India.'
  },
  {
    question: 'What types of projects does Make My Cottage specialise in?',
    answer: 'We specialize in bespoke wooden residential homes, weekend farmhouses, luxury resort villas & cottages, A-frame cabins, prefabricated modular residences, scenic hillside retreats, timber pergolas, gazebos, and turnkey hospitality clubhouses tailored to your exact plot landscape.'
  },
  {
    question: 'How durable are wooden cottages against weather, termites, and fire?',
    answer: 'All certified timber undergoes industrial vacuum-pressure impregnation (VPI) with non-toxic borate salts, making it 100% termite, borer, and fungus-proof. Multi-coat UV and water-repellent sealants protect against heavy Indian monsoons, while heavy timber beams have natural fire-retardant charring resistance that complies with international building safety codes.'
  },
  {
    question: 'What kind of foundation and terrain preparation is needed for sloping plots?',
    answer: 'Wooden cottages are significantly lighter than concrete buildings, meaning they can be constructed on eco-friendly pile foundations, stone plinths, or raised stilts with minimal site excavation. This protects natural tree root systems, handles sloping hilly plots effortlessly, and reduces civil foundation costs by up to 40%.'
  },
  {
    question: 'Can wooden cottages accommodate modern luxury amenities, HVAC, and smart home systems?',
    answer: 'Absolutely. All our architectural designs seamlessly integrate modern ducted or split air conditioning, smart home automation, concealed German electrical conduits, designer plumbing fixtures, luxury spa bathrooms, and double-glazed thermally insulated panoramic glass facades.'
  },
  {
    question: 'What warranties, aftercare, and maintenance schedules do you provide?',
    answer: 'Every Make My Cottage home comes with a comprehensive structural warranty of up to 25 years on treated timber framing, along with scheduled annual inspections for the first 3 years. Wood finishes only need a simple exterior conditioning re-coat every 3 to 5 years to keep the rich natural luster vibrant for decades.'
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto border-t border-[#e3e3de] relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
        
        {/* Left Column: Pins when reaching first question, stays frozen until bottom ends align with right column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141517] text-white text-xs uppercase tracking-wider font-semibold mb-6 shadow-sm">
              <HiQuestionMarkCircle className="w-4 h-4 text-white" />
              <span>FAQ</span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#141517] font-bold tracking-tight leading-[1.05] mb-5">
              Got Questions?<br />We Have Answers.
            </h2>

            <p className="text-sm sm:text-base text-[#666] font-light leading-relaxed max-w-md">
              From first consultation to final installation, we know you want to understand exactly what to expect. Here’s everything you need to know about building with Make My Cottage.
            </p>
          </div>

          {/* Consultant Portrait Card - preserved in full size aspect-[4/5] exactly as shown in screenshot */}
          <div className="relative rounded-3xl sm:rounded-[32px] overflow-hidden aspect-[4/5] w-full max-w-xs sm:max-w-sm shadow-xl border border-[#e3e3de] group bg-stone-100">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80"
              alt="Make My Cottage Architectural Consultation"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[11px] uppercase tracking-widest text-white/80 block font-medium mb-0.5">
                Design &amp; Engineering Team
              </span>
              <p className="text-sm font-heading font-semibold text-white">
                Turnkey Wooden Architecture Specialists
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Individual Rounded Pill Card Accordion (Exact RBP Imageworks Clone) */}
        <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={faq.question} 
                className="rounded-2xl bg-[#f2f1ee] hover:bg-[#eae8e4] transition-colors overflow-hidden"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="group flex w-full items-center justify-between gap-6 rounded-2xl px-5 py-5 sm:px-6 sm:py-6 text-left text-[16px] sm:text-[17px] leading-6 font-medium text-[#141517] cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <span className="transition-colors group-hover:text-[#141517]/85 font-heading">
                      {faq.question}
                    </span>
                    <span 
                      aria-hidden="true" 
                      className={`flex h-5 w-5 shrink-0 items-center justify-center text-[#141517]/70 transition-transform duration-300 transform select-none ${
                        isOpen ? 'rotate-45 text-[#141517]' : 'group-hover:text-[#141517]'
                      }`}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="h-[18px] w-[18px]"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.30, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl px-5 pb-6 text-[14px] sm:text-[15px] leading-7 text-[#666] font-light sm:px-6 sm:pb-7">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
