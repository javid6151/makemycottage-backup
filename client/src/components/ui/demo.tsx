"use client"

import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { PROJECTS_DATA } from "@/utils/constants"

export interface ProjectItem {
  id: string
  slug: string
  num: string
  name: string
  location: string
  category: string
  shortDescription?: string
  description?: string
  specs?: {
    builtUpArea?: string
    location?: string
    projectType?: string
    constructionType?: string
    completion?: string
    materials?: string
  }
  heroImage: string
  images?: string[]
}

export function Preview() {
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLDivElement>(null)
  const projects = PROJECTS_DATA.slice(0, 5)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)

  const currentProject = projects[activeIndex] || projects[0]

  const jumpToIndex = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, projects.length - 1))
    if (clampedIndex === activeIndexRef.current) return
    activeIndexRef.current = clampedIndex
    setActiveIndex(clampedIndex)

    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight
      if (totalScrollable > 0) {
        const targetScroll =
          window.scrollY + rect.top + (clampedIndex / (projects.length - 1)) * totalScrollable
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(targetScroll, { duration: 0.5 })
        } else {
          window.scrollTo({ top: targetScroll, behavior: "smooth" })
        }
      }
    }
  }

  // 1. Synchronize window scrolling with active item & text rotation
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return
          const rect = sectionRef.current.getBoundingClientRect()
          const totalScrollable = rect.height - window.innerHeight
          if (totalScrollable <= 0) return

          const currentScroll = -rect.top
          if (currentScroll < 0) {
            if (activeIndexRef.current !== 0) {
              activeIndexRef.current = 0
              setActiveIndex(0)
            }
            ticking = false
            return
          }

          const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable))
          const newIndex = Math.max(
            0,
            Math.min(projects.length - 1, Math.round(progress * (projects.length - 1)))
          )

          if (newIndex !== activeIndexRef.current) {
            activeIndexRef.current = newIndex
            setActiveIndex(newIndex)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    
    let lenisTimer: NodeJS.Timeout
    if ((window as any).lenis) {
      (window as any).lenis.on("scroll", onScroll)
    } else {
      lenisTimer = setInterval(() => {
        if ((window as any).lenis) {
          (window as any).lenis.on("scroll", onScroll)
          clearInterval(lenisTimer)
        }
      }, 100)
    }

    onScroll()

    return () => {
      window.removeEventListener("scroll", onScroll)
      clearInterval(lenisTimer)
      if ((window as any).lenis) {
        (window as any).lenis.off("scroll", onScroll)
      }
    }
  }, [projects.length])

  // 2. Active wheel interceptor: captures wheel ticks when over the section
  // to ensure instant, buttery-smooth rotation without Lenis conflicts
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let lastWheelTime = 0
    const onWheelNative = (e: WheelEvent) => {
      const now = Date.now()
      if (now - lastWheelTime < 280) return

      const rect = el.getBoundingClientRect()
      // Only step through if section is currently active in the viewport
      if (rect.top <= 80 && rect.bottom >= window.innerHeight - 80) {
        if (e.deltaY > 15 && activeIndexRef.current < projects.length - 1) {
          e.preventDefault()
          e.stopPropagation()
          lastWheelTime = now
          jumpToIndex(activeIndexRef.current + 1)
        } else if (e.deltaY < -15 && activeIndexRef.current > 0) {
          e.preventDefault()
          e.stopPropagation()
          lastWheelTime = now
          jumpToIndex(activeIndexRef.current - 1)
        }
      }
    }

    el.addEventListener("wheel", onWheelNative, { passive: false })

    // Touch swipe support for mobile devices
    let touchStartY = 0
    let lastTouchTime = 0
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    const onTouchMove = (e: TouchEvent) => {
      const now = Date.now()
      if (now - lastTouchTime < 350) return
      const touchY = e.touches[0].clientY
      const diffY = touchStartY - touchY
      const rect = el.getBoundingClientRect()

      if (rect.top <= 80 && rect.bottom >= window.innerHeight - 80) {
        if (diffY > 40 && activeIndexRef.current < projects.length - 1) {
          e.preventDefault()
          lastTouchTime = now
          jumpToIndex(activeIndexRef.current + 1)
        } else if (diffY < -40 && activeIndexRef.current > 0) {
          e.preventDefault()
          lastTouchTime = now
          jumpToIndex(activeIndexRef.current - 1)
        }
      }
    }

    el.addEventListener("touchstart", onTouchStart, { passive: true })
    el.addEventListener("touchmove", onTouchMove, { passive: false })

    return () => {
      el.removeEventListener("wheel", onWheelNative)
      el.removeEventListener("touchstart", onTouchStart)
      el.removeEventListener("touchmove", onTouchMove)
    }
  }, [projects.length])

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-white text-[#141517]"
      style={{ height: `${projects.length * 65}vh` }}
    >
      {/* Sticky viewport pinned while scrolling through the section */}
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-between overflow-hidden bg-white select-none">
        
        {/* LEFT COLUMN: Vertical sliding project images - Occupies Full Screen Left Half */}
        <div className="w-full md:w-1/2 h-[45vh] md:h-full relative overflow-hidden flex items-start justify-center bg-neutral-900">
          <div
            className="w-full h-full flex flex-col items-center transition-transform duration-700 ease-out"
            style={{
              transform: `translateY(-${activeIndex * 100}%)`,
            }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="h-full md:h-screen w-full flex-shrink-0 relative overflow-hidden cursor-pointer group select-none"
                onClick={() => {
                  if (index === activeIndex) {
                    navigate(`/projects/${project.slug}`)
                  } else {
                    jumpToIndex(index)
                  }
                }}
              >
                <img
                  src={project.heroImage}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Editorial Content, Title, Dynamic Description & Specs */}
        <div className="w-full md:w-1/2 h-[55vh] md:h-full flex flex-col justify-center px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 select-none overflow-y-auto md:overflow-visible">
          <div className="max-w-xl w-full py-4 md:py-0">
            {/* Synchronized Project Title */}
            <div
              className="cursor-pointer group flex flex-col items-start min-h-[3rem] sm:min-h-[4.5rem]"
              onClick={() => navigate(`/projects/${currentProject.slug}`)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.h2
                  key={currentProject.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ type: "spring", duration: 0.45, bounce: 0 }}
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-sans uppercase font-bold tracking-tight text-[#141517] leading-[1.05] group-hover:text-[#ff4b18] transition-colors pb-1 sm:pb-2"
                >
                  {currentProject.name.toUpperCase()}
                </motion.h2>
              </AnimatePresence>

              {/* Subtle metadata and view link */}
              <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#777]">
                <span className="font-mono text-[10px] sm:text-[11px] tracking-wider text-[#999]">
                  {currentProject.num}
                </span>
                <span className="w-1 h-1 rounded-full bg-black/25" />
                <span className="uppercase tracking-wider text-[10px] sm:text-[11px] font-medium text-[#666]">
                  {currentProject.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-black/25" />
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#141517] group-hover:underline">
                  <span>View Project</span>
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </div>

            {/* Dynamic Animated Description & Specs */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mt-4 sm:mt-5 flex flex-col gap-4"
              >
                {/* Architectural Description */}
                <p className="text-xs sm:text-sm md:text-[15px] text-[#555] font-light leading-relaxed">
                  {currentProject.description || currentProject.shortDescription}
                </p>

                {/* Specs Grid */}
                {currentProject.specs && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 border-y border-[#e5e5e0] my-1">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#999] font-medium block">
                        Built Area
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#141517]">
                        {currentProject.specs.builtUpArea}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#999] font-medium block">
                        Construction
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#141517]">
                        {currentProject.specs.constructionType}
                      </span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#999] font-medium block">
                        Materials
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#141517] truncate block" title={currentProject.specs.materials}>
                        {currentProject.specs.materials}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Subtle navigation dots indicator on right edge */}
        <div className="hidden sm:flex absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex-col gap-2 z-10">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => jumpToIndex(i)}
              className={`w-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === i ? "h-6 bg-[#141517]" : "h-1.5 bg-black/20 hover:bg-black/40"
              }`}
              aria-label={`Jump to item ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Preview
