"use client"

import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { TextRotate, TextRotateRef } from "@/components/ui/text-rotate"
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
  heroImage: string
  images?: string[]
}

export function Preview() {
  const navigate = useNavigate()
  const textRotateRef = useRef<TextRotateRef>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const projects = PROJECTS_DATA
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)

  const currentProject = projects[activeIndex] || projects[0]

  const jumpToIndex = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, projects.length - 1))
    if (clampedIndex === activeIndexRef.current) return
    activeIndexRef.current = clampedIndex
    setActiveIndex(clampedIndex)
    textRotateRef.current?.jumpTo(clampedIndex)

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
              textRotateRef.current?.jumpTo(0)
            }
            ticking = false
            return
          }

          const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable))
          const newIndex = Math.min(
            projects.length - 1,
            Math.floor(progress * projects.length)
          )

          if (newIndex !== activeIndexRef.current) {
            activeIndexRef.current = newIndex
            setActiveIndex(newIndex)
            textRotateRef.current?.jumpTo(newIndex)
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
      style={{ height: `${projects.length * 60}vh` }}
    >
      {/* Sticky viewport pinned while scrolling through the section */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-between overflow-hidden bg-white select-none">
        
        {/* LEFT COLUMN: Vertical sliding project images */}
        <div className="w-1/2 h-full relative overflow-hidden flex items-start justify-center">
          <div
            className="w-full flex flex-col items-center transition-transform duration-500 ease-out"
            style={{
              transform: `translateY(-${activeIndex * 100}vh)`,
            }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="h-screen w-full flex-shrink-0 flex justify-center items-center px-4"
              >
                <div
                  className="group relative w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer bg-neutral-100 border border-neutral-200"
                  onClick={() => {
                    if (index === activeIndex) {
                      navigate(`/projects/${project.slug}`)
                    } else {
                      jumpToIndex(index)
                    }
                  }}
                  title={`View ${project.name}`}
                >
                  <img
                    src={project.heroImage}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle hover overlay badge */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-200 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-[10px] sm:text-[11px] font-sans uppercase tracking-widest font-semibold bg-black/80 px-3.5 py-1.5 rounded-full backdrop-blur-sm shadow-md">
                      View Project &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Rotating Project Name Text */}
        <div className="w-1/2 h-full flex flex-col items-start justify-center pl-4 sm:pl-10 md:pl-16 pr-8 sm:pr-12 select-none">
          <div
            className="cursor-pointer group flex flex-col items-start max-w-full"
            onClick={() => {
              navigate(`/projects/${currentProject.slug}`)
            }}
            title={`View ${currentProject.name}`}
          >
            <TextRotate
              ref={textRotateRef}
              texts={projects.map((project) => project.name.toUpperCase())}
              mainClassName="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-sans uppercase font-medium tracking-normal text-[#141517] group-hover:opacity-75 transition-opacity"
              splitLevelClassName="overflow-hidden pb-1 sm:pb-2"
              staggerFrom={"first"}
              animatePresenceMode="wait"
              loop={false}
              auto={false}
              staggerDuration={0.005}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            />

            {/* Subtle metadata and view link */}
            <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#777]">
              <span className="font-mono text-[10px] sm:text-[11px] tracking-wider text-[#999]">
                {currentProject.num} / 0{projects.length}
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
        </div>

        {/* Subtle navigation dots indicator on right edge */}
        <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
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
