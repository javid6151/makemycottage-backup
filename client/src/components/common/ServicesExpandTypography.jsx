import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { HiArrowNarrowRight, HiOutlineInformationCircle } from 'react-icons/hi';
import { SERVICES } from '../../utils/constants';
import './ServicesExpandTypography.css';

gsap.registerPlugin(ScrollTrigger, Flip);

const SERVICES_CONFIG = [
  {
    ...SERVICES[0],
    meta: 'Service 01 — Wooden Homes',
    typeClass: 'content--left',
    effectType: '1',
    description: 'Custom-designed wooden residences built around your lifestyle with natural warmth and enduring strength. From high-grade timber frames to precision weather-sealed joinery.',
    highlights: ['100% Treated Timber', 'Precision Interlocking', 'Generational Durability'],
  },
  {
    ...SERVICES[1],
    meta: 'Service 02 — Farm Houses',
    typeClass: 'content--center',
    effectType: '2',
    description: 'Relaxed, natural living spaces designed for weekend retreats, organic farm estates, and private countryside sanctuaries harmonized with regional topography.',
    highlights: ['Scenic Topography', 'Open Verandahs', 'Eco-Conscious Footprint'],
  },
  {
    ...SERVICES[2],
    meta: 'Service 03 — Cottage Homes',
    typeClass: 'content--right',
    effectType: '3',
    description: 'Compact, high-character cottages engineered for hill retreats, farms, and weekend stays. High thermal performance and rapid on-site assembly.',
    highlights: ['Fast Build Times', 'Double-Glazed Insulation', 'Hill Station Proven'],
  },
  {
    ...SERVICES[3],
    meta: 'Service 04 — Prefabricated Modular',
    typeClass: 'content--justify',
    effectType: '4',
    description: 'Factory-engineered modular timber systems assembled on-site with zero compromise on structural elegance and thermal comfort.',
    highlights: ['60% Faster Delivery', 'Factory Tolerance', 'Minimal Disruption'],
  },
  {
    ...SERVICES[4],
    meta: 'Service 05 — Resort Cottages',
    typeClass: 'content--line',
    effectType: '5',
    description: 'Distinctive wooden accommodation spaces engineered for hospitality luxury, guest escapism, and eco-tourism resorts.',
    highlights: ['Commercial Durability', 'High Hospitality ROI', 'Boutique Eco-Luxury'],
  },
  {
    ...SERVICES[5],
    meta: 'Service 06 — Custom Structures',
    typeClass: 'content--split',
    effectType: '6',
    description: 'Unique architectural wooden pergolas, pavilions, gazebos, and bespoke extensions engineered to exact site topography and aesthetic specifications.',
    highlights: ['Architectural Pergolas', 'Gazebos & Pavilions', 'Custom Timber Joinery'],
  },
];

const ServicesExpandTypography = ({ onSelectServiceModal }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const wrap = containerRef.current;
    if (!wrap) return;

    let ctx;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // =========================================================================
        // EFFECT 1: Inline skew word + expanding reveal image (Project 01)
        // =========================================================================
        wrap.querySelectorAll('.type[data-expand-1]').forEach((el) => {
          const image = el.querySelector('.type__expand-img');
          const animTexts = Array.from(el.querySelectorAll('.anim'));
          const textBlock = el.closest('.content')?.querySelector('.block');
          if (!image) return;

          el.classList.add('type--open');
          const flipstate = Flip.getState([image, ...animTexts], {
            props: 'transform',
          });
          el.classList.remove('type--open');

          Flip.to(flipstate, {
            ease: 'power1.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'clamp(top bottom)',
              end: '+=135%',
              scrub: true,
            },
          });

          if (textBlock) {
            gsap.fromTo(
              textBlock,
              { y: 35, opacity: 0.5 },
              {
                y: 0,
                opacity: 1,
                ease: 'sine.inOut',
                scrollTrigger: {
                  trigger: textBlock,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            );
          }
        });

        // =========================================================================
        // EFFECT 2: Centered expand reveal capsule (Project 02)
        // =========================================================================
        wrap.querySelectorAll('.type[data-expand-2]').forEach((el) => {
          const image = el.querySelector('.type__expand-img');
          const animTexts = Array.from(el.querySelectorAll('.anim'));
          const textBlock = el.closest('.content')?.querySelector('.block');
          if (!image) return;

          el.classList.add('type--open');
          const flipstate = Flip.getState([image, ...animTexts], {
            props: 'transform',
          });
          el.classList.remove('type--open');

          Flip.to(flipstate, {
            ease: 'sine.inOut',
            simple: true,
            scrollTrigger: {
              trigger: el,
              start: 'center bottom',
              end: 'center top',
              scrub: true,
            },
          });

          if (textBlock) {
            gsap.fromTo(
              textBlock,
              { y: 35, opacity: 0.5 },
              {
                y: 0,
                opacity: 1,
                ease: 'sine.inOut',
                scrollTrigger: {
                  trigger: textBlock,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            );
          }
        });

        // =========================================================================
        // EFFECT 3: Right-aligned full-width expand strip (Project 03)
        // =========================================================================
        wrap.querySelectorAll('.type[data-expand-3]').forEach((el) => {
          const image = el.querySelector('.type__expand-img');
          const textBlock = el.closest('.content')?.querySelector('.block');
          if (!image) return;

          el.classList.add('type--open');
          const flipstate = Flip.getState(image);
          el.classList.remove('type--open');

          Flip.to(flipstate, {
            ease: 'sine',
            simple: true,
            scrollTrigger: {
              trigger: el,
              start: 'center bottom',
              end: 'center top',
              scrub: true,
            },
          });

          if (textBlock) {
            gsap.fromTo(
              textBlock,
              { y: 30, opacity: 0.5 },
              {
                y: -15,
                opacity: 1,
                ease: 'sine.inOut',
                scrollTrigger: {
                  trigger: textBlock,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            );
          }
        });

        // =========================================================================
        // EFFECT 4: Justified stacked square image capsules (Project 04)
        // =========================================================================
        wrap.querySelectorAll('.type[data-expand-4]').forEach((el) => {
          const stacks = Array.from(el.querySelectorAll('.type__expand--stack'));
          const images = Array.from(el.querySelectorAll('.type__expand-img'));
          const animTexts = Array.from(el.querySelectorAll('.anim'));
          const textBlock = el.closest('.content')?.querySelector('.block');

          el.classList.add('type--open');
          const flipstate = Flip.getState([...stacks, ...images, ...animTexts], {
            props: 'transform',
          });
          el.classList.remove('type--open');

          Flip.to(flipstate, {
            ease: 'sine.inOut',
            absoluteOnLeave: true,
            nested: true,
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });

          if (textBlock) {
            gsap.fromTo(
              textBlock,
              { y: 30, opacity: 0.5 },
              {
                y: -20,
                opacity: 1,
                ease: 'sine.inOut',
                scrollTrigger: {
                  trigger: textBlock,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            );
          }
        });

        // =========================================================================
        // EFFECT 5: Line mini inline pill images (Project 05)
        // =========================================================================
        wrap.querySelectorAll('.type[data-expand-5]').forEach((el) => {
          const images = Array.from(el.querySelectorAll('.type__expand-img'));
          const textBlock = el.closest('.content')?.querySelector('.block');

          el.classList.add('type--open');
          const flipstate = Flip.getState(images);
          el.classList.remove('type--open');

          Flip.to(flipstate, {
            ease: 'sine.inOut',
            simple: true,
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'center top',
              scrub: true,
            },
          });

          if (textBlock) {
            gsap.fromTo(
              textBlock,
              { y: 30, opacity: 0.5 },
              {
                y: -20,
                opacity: 1,
                ease: 'sine.inOut',
                scrollTrigger: {
                  trigger: textBlock,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            );
          }
        });

        // =========================================================================
        // EFFECT 6: Architectural Twin Horizon Expand (Service 06 — Custom Structures)
        // =========================================================================
        wrap.querySelectorAll('.type[data-expand-6]').forEach((el) => {
          const image = el.querySelector('.type__expand-img');
          const animTexts = Array.from(el.querySelectorAll('.anim'));
          const textBlock = el.closest('.content')?.querySelector('.block');
          if (!image) return;

          el.classList.add('type--open');
          const flipstate = Flip.getState([image, ...animTexts], {
            props: 'transform',
          });
          el.classList.remove('type--open');

          Flip.to(flipstate, {
            ease: 'power1.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'clamp(top bottom)',
              end: '+=130%',
              scrub: true,
            },
          });

          if (textBlock) {
            gsap.fromTo(
              textBlock,
              { y: 35, opacity: 0.5 },
              {
                y: 0,
                opacity: 1,
                ease: 'sine.inOut',
                scrollTrigger: {
                  trigger: textBlock,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            );
          }
        });
      }, containerRef);

      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="services-expansion-wrap">
      {SERVICES_CONFIG.map((srv) => {
        const isEffect2 = srv.effectType === '2';
        const isEffect3 = srv.effectType === '3';
        const isEffect4 = srv.effectType === '4';
        const isEffect5 = srv.effectType === '5';
        const isEffect6 = srv.effectType === '6';

        return (
          <div key={srv.id} className={`content ${srv.typeClass}`}>
            {/* Meta Eyebrow with Direct Service Link */}
            <div
              className={`meta flex items-center justify-between ${
                isEffect2 ? 'w-full max-w-4xl mx-auto' : ''
              }`}
            >
              <span>{srv.meta}</span>
              <Link
                to={`/services#${srv.id}`}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#888] hover:text-[#ff4b18] transition-colors"
              >
                <span>Explore Full Service</span>
                <HiArrowNarrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* EFFECT 1: Project 01 — Wooden Homes */}
            {srv.effectType === '1' && (
              <h2 className="type" data-expand-1>
                Crafting timeless
                <br />
                wooden residences
                <br />
                to{' '}
                <span className="type__expand type__expand--inline type__expand--reveal">
                  <span
                    onClick={() => onSelectServiceModal && onSelectServiceModal(srv)}
                    className="type__expand-img"
                    title="Click for preview"
                  >
                    <span
                      className="type__expand-img-inner"
                      style={{ backgroundImage: `url(${srv.image})` }}
                    />
                  </span>
                  <span className="anim skewed">endure.</span>
                </span>
              </h2>
            )}

            {/* EFFECT 2: Project 02 — Farm Houses */}
            {isEffect2 && (
              <h2 className="type" data-expand-2>
                Countryside living;
                <br />
                embrace the
                <br />
                <span className="type__expand type__expand--reveal type__expand--center">
                  <span className="aright">open </span>
                  <span
                    onClick={() => onSelectServiceModal && onSelectServiceModal(srv)}
                    className="type__expand-img"
                    title="Click for preview"
                  >
                    <span
                      className="type__expand-img-inner"
                      style={{ backgroundImage: `url(${srv.image})` }}
                    />
                  </span>
                  <span className="anim skewed">vistas</span>
                </span>
                <br />
                under scenic skies.
              </h2>
            )}

            {/* EFFECT 3: Project 03 — Cottage Homes (Full-width expanding strip, no clipping) */}
            {isEffect3 && (
              <h2 className="type" data-expand-3>
                Tranquil hill escapes
                <br />
                in every season
                <br />
                <span className="type__expand type__expand--full">
                  <span
                    onClick={() => onSelectServiceModal && onSelectServiceModal(srv)}
                    className="type__expand-img"
                    title="Click for preview"
                  >
                    <span
                      className="type__expand-img-inner"
                      style={{ backgroundImage: `url(${srv.image})` }}
                    />
                  </span>
                </span>
                crafted with timeless
                <br />
                mountain serenity.
              </h2>
            )}

            {/* EFFECT 4: Project 04 — Prefabricated Modular (Stacked expanding windows) */}
            {isEffect4 && (
              <h2 className="type" data-expand-4>
                Precision modular{' '}
                <span className="type__expand type__expand--stack">
                  <span className="anim rotated">timber</span>
                  <span
                    onClick={() => onSelectServiceModal && onSelectServiceModal(srv)}
                    className="type__expand-img type__expand-img--small"
                    title="Click for preview"
                  >
                    <span
                      className="type__expand-img-inner"
                      style={{ backgroundImage: `url(${srv.image})` }}
                    />
                  </span>
                </span>{' '}
                crafted into{' '}
                <span className="type__expand type__expand--stack">
                  <span className="anim rotated">homes,</span>
                  <span
                    onClick={() => onSelectServiceModal && onSelectServiceModal(srv)}
                    className="type__expand-img type__expand-img--small"
                    title="Click for preview"
                  >
                    <span
                      className="type__expand-img-inner"
                      style={{
                        backgroundImage:
                          'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80)',
                      }}
                    />
                  </span>
                </span>
                <br />
                assembled on-site in{' '}
                <span className="type__expand type__expand--stack">
                  <span
                    onClick={() => onSelectServiceModal && onSelectServiceModal(srv)}
                    className="type__expand-img type__expand-img--small"
                    title="Click for preview"
                  >
                    <span
                      className="type__expand-img-inner"
                      style={{
                        backgroundImage:
                          'url(https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1000&q=80)',
                      }}
                    />
                  </span>
                  <span className="anim rotated">45 days,</span>
                </span>{' '}
                with zero compromise.
              </h2>
            )}

            {/* EFFECT 5: Project 05 — Resort Cottages (Rhythmic mini capsule reveals) */}
            {isEffect5 && (
              <h2 className="type" data-expand-5>
                Signature{' '}
                <span className="type__expand type__expand--mini">
                  <span
                    onClick={() => onSelectServiceModal && onSelectServiceModal(srv)}
                    className="type__expand-img type__expand-img--tiny"
                    title="Click for preview"
                  >
                    <span
                      className="type__expand-img-inner"
                      style={{ backgroundImage: `url(${srv.image})` }}
                    />
                  </span>
                </span>{' '}
                luxury engineered{' '}
                <span className="type__expand type__expand--mini">
                  <span
                    onClick={() => onSelectServiceModal && onSelectServiceModal(srv)}
                    className="type__expand-img type__expand-img--tiny"
                    title="Click for preview"
                  >
                    <span
                      className="type__expand-img-inner"
                      style={{
                        backgroundImage:
                          'url(https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1000&q=80)',
                      }}
                    />
                  </span>
                </span>{' '}
                for hospitality,
                <br />
                where nature meets{' '}
                <span className="type__expand type__expand--mini">
                  <span
                    onClick={() => onSelectServiceModal && onSelectServiceModal(srv)}
                    className="type__expand-img type__expand-img--tiny"
                    title="Click for preview"
                  >
                    <span
                      className="type__expand-img-inner"
                      style={{
                        backgroundImage:
                          'url(https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1000&q=80)',
                      }}
                    />
                  </span>
                </span>{' '}
                serene living
                <br />
                crafted for boutique{' '}
                <span className="type__expand type__expand--mini">
                  <span
                    onClick={() => onSelectServiceModal && onSelectServiceModal(srv)}
                    className="type__expand-img type__expand-img--tiny"
                    title="Click for preview"
                  >
                    <span
                      className="type__expand-img-inner"
                      style={{
                        backgroundImage:
                          'url(https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1000&q=80)',
                      }}
                    />
                  </span>
                </span>{' '}
                destinations.
              </h2>
            )}

            {/* EFFECT 6: Service 06 — Custom Structures */}
            {isEffect6 && (
              <h2 className="type" data-expand-6>
                Bespoke pergolas,
                <br />
                sculpted pavilions
                <br />
                &amp;{' '}
                <span className="type__expand type__expand--inline type__expand--reveal">
                  <span
                    onClick={() => onSelectServiceModal && onSelectServiceModal(srv)}
                    className="type__expand-img"
                    title="Click for preview"
                  >
                    <span
                      className="type__expand-img-inner"
                      style={{ backgroundImage: `url(${srv.image})` }}
                    />
                  </span>
                  <span className="anim skewed">outdoor</span>
                </span>
                <br />
                living sanctuaries.
              </h2>
            )}

            {/* Description & Action Block */}
            <div className="block">
              <p className="mb-4">{srv.description}</p>

              {/* Tags */}
              <div
                className={`flex flex-wrap gap-2 mb-6 ${
                  isEffect2
                    ? 'justify-center'
                    : isEffect4
                    ? 'justify-end'
                    : ''
                }`}
              >
                {srv.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-white border border-[#e3e3de] text-xs text-[#444] font-medium shadow-sm hover:border-[#ff4b18]/40 transition-colors"
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div
                className={`flex items-center gap-3 ${
                  isEffect2
                    ? 'justify-center'
                    : isEffect4
                    ? 'justify-end'
                    : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectServiceModal && onSelectServiceModal(srv)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-[#e3e3de] hover:border-[#141517] text-xs uppercase tracking-wider font-semibold text-[#141517] shadow-sm transition-all"
                >
                  <HiOutlineInformationCircle className="w-4 h-4 text-[#888]" />
                  <span>Quick Overview</span>
                </button>

                <Link
                  to={`/services#${srv.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#141517] text-white hover:bg-[#ff4b18] text-xs uppercase tracking-wider font-semibold shadow-md transition-all group"
                >
                  <span>View Details</span>
                  <HiArrowNarrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServicesExpandTypography;
