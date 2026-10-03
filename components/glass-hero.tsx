'use client';

import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { CursorFollower } from '@/components/ui/cursor-follower';
import { WorkSection, ExperienceSection, HackathonSection, BeyondSection } from '@/components/likith-sections';


const ENTRANCE_STYLES = `
@keyframes heroFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes heroScaleIn {
  from { transform: scale(1.035); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@keyframes slideUp {
  from { transform: translateY(60px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes fadeDown {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(2deg); }
}

.animate-hero-base {
  animation: heroScaleIn 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-nav-down {
  animation: fadeDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-line-up {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-fade-up {
  animation: heroFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@media (prefers-reduced-motion: reduce) {
  .animate-hero-base, .animate-nav-down, .animate-line-up, .animate-fade-up {
    animation-duration: 0.01s !important;
    animation-delay: 0s !important;
    transition-duration: 0.01s !important;
    transform: none !important;
  }
}
`;

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DESKTOP_RADIUS = 235;
const MOBILE_RADIUS = 150;
const REVEAL_DESKTOP_RADIUS = DESKTOP_RADIUS;
const REVEAL_MOBILE_RADIUS = MOBILE_RADIUS;




const NAME_VARIANTS = [
  { lang: 'EN', first: 'Talla', last: 'Likith.', font: "'Plus Jakarta Sans', sans-serif", ls: '-0.05em' },
  { lang: 'HI', first: 'तल्ला', last: 'लिखित.', font: 'var(--font-deva), sans-serif', ls: '0em' },
  { lang: 'TE', first: 'తల్లా', last: 'లిఖిత్.', font: 'var(--font-telugu), sans-serif', ls: '0em' },
];

function NameCycler() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % NAME_VARIANTS.length), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative flex flex-col items-start">
      <div aria-hidden="true" className="absolute -left-20 -top-16 w-[520px] h-[320px] rounded-full bg-cyan-500/15 blur-[90px] pointer-events-none" />
      <h1 aria-label="Talla Likith" className="grid text-white font-bold select-none text-[clamp(2.8rem,10vw,6.8rem)] md:text-[clamp(5.4rem,6.2vw,6.8rem)] opacity-0 animate-line-up [animation-delay:300ms]">
        {NAME_VARIANTS.map((v, idx) => {
          const on = idx === i;
          return (
            <span key={v.lang} aria-hidden="true" className="[grid-area:1/1] flex flex-col" style={{ fontFamily: v.font, letterSpacing: v.ls, lineHeight: 1.04 }}>
              {[v.first, v.last].map((w, li) => (
                <span key={li} className="block overflow-hidden pb-[0.06em]">
                  <span
                    className="block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ transform: on ? 'translateY(0)' : 'translateY(105%)', opacity: on ? 1 : 0, transitionDelay: on ? `${150 + li * 120}ms` : '0ms' }}
                  >{li === 1 ? <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">{w}</span> : w}</span>
                </span>
              ))}
            </span>
          );
        })}
      </h1>
      <div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/50 animate-fade-up opacity-0 [animation-delay:600ms]">
        {NAME_VARIANTS.map((n, idx) => (
          <span key={n.lang} className={`transition-colors duration-500 ${idx === i ? 'text-cyan-300' : ''}`}>{n.lang}</span>
        ))}
        <span className="w-10 h-px bg-white/30" />
        <span>Applied AI Engineer &middot; Full-Stack Builder</span>
      </div>
    </div>
  );
}

export default function GlassHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // References for liquid reveal pointer tracking
  const rawX = useRef<number>(-999);
  const rawY = useRef<number>(-999);
  const smoothX = useRef<number>(-999);
  const smoothY = useRef<number>(-999);
  const currentRadius = useRef<number>(0);
  const targetRadius = useRef<number>(0);
  const isTouchActive = useRef<boolean>(false);

  // References for premium interactive physics (Hero, Section 2, Section 3 Orb & Section 4 Device Mockups)
  const portraitMouseX = useRef<number>(0);
  const portraitMouseY = useRef<number>(0);
  const portraitSmoothX = useRef<number>(0);
  const portraitSmoothY = useRef<number>(0);

  const idPortraitMouseX = useRef<number>(0);
  const idPortraitMouseY = useRef<number>(0);
  const idPortraitSmoothX = useRef<number>(0);
  const idPortraitSmoothY = useRef<number>(0);

  const orbMouseX = useRef<number>(0);
  const orbMouseY = useRef<number>(0);
  const orbSmoothX = useRef<number>(0);
  const orbSmoothY = useRef<number>(0);

  // Animated numbers refs for stats card count-up triggers
  const statVal1 = useRef<number>(0);
  const statVal2 = useRef<number>(0);
  const [stat1, setStat1] = useState(0);
  const [stat2, setStat2] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProjectImage, setHoveredProjectImage] = useState<string | null>(null);

  // Animation frame loop reference
  const animationFrameId = useRef<number | null>(null);











  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP with Lenis Scroll
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 2. High-performance Animation Loop
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderLoop = () => {
      // Interpolation factors
      const posFactor = prefersReducedMotion ? 1 : 0.14;
      const radFactor = prefersReducedMotion ? 1 : 0.12;
      const followFactor = prefersReducedMotion ? 1 : 0.08;

      // A. Liquid Reveal Mask position
      if (rawX.current === -999 && rawY.current === -999) {
        smoothX.current = -999;
        smoothY.current = -999;
      } else {
        if (smoothX.current === -999 && smoothY.current === -999) {
          smoothX.current = rawX.current;
          smoothY.current = rawY.current;
        } else {
          smoothX.current += (rawX.current - smoothX.current) * posFactor;
          smoothY.current += (rawY.current - smoothY.current) * posFactor;
        }
      }
      currentRadius.current += (targetRadius.current - currentRadius.current) * radFactor;

      container.style.setProperty('--reveal-x', `${smoothX.current}px`);
      container.style.setProperty('--reveal-y', `${smoothY.current}px`);
      container.style.setProperty('--reveal-radius', `${currentRadius.current}px`);

      // B. Hero Portrait cursor follow
      portraitSmoothX.current += (portraitMouseX.current - portraitSmoothX.current) * followFactor;
      portraitSmoothY.current += (portraitMouseY.current - portraitSmoothY.current) * followFactor;
      const pX = (portraitSmoothX.current / (window.innerWidth / 2)) * 12;
      const pY = (portraitSmoothY.current / (window.innerHeight / 2)) * 10;
      const portraitElement = document.querySelector('#hero-portrait-wrapper') as HTMLElement;
      if (portraitElement) {
        portraitElement.style.transform = `translate3d(${pX}px, ${pY}px, 0)`;
      }

      // C. Section 2 Portrait cursor follow
      idPortraitSmoothX.current += (idPortraitMouseX.current - idPortraitSmoothX.current) * followFactor;
      idPortraitSmoothY.current += (idPortraitMouseY.current - idPortraitSmoothY.current) * followFactor;
      const idPX = (idPortraitSmoothX.current / (window.innerWidth / 2)) * 8;
      const idPY = (idPortraitSmoothY.current / (window.innerHeight / 2)) * 6;
      const idPortraitElement = document.querySelector('#identity-portrait') as HTMLElement;
      const idGlowElement = document.querySelector('#identity-glow') as HTMLElement;
      if (idPortraitElement) {
        idPortraitElement.style.transform = `translate3d(${idPX}px, ${idPY}px, 0)`;
      }
      if (idGlowElement) {
        idGlowElement.style.transform = `translate3d(${idPX * 0.5}px, ${idPY * 0.5}px, 0)`;
      }

      // D. Section 3 Interactive Glass Orb cursor follow
      orbSmoothX.current += (orbMouseX.current - orbSmoothX.current) * followFactor;
      orbSmoothY.current += (orbMouseY.current - orbSmoothY.current) * followFactor;
      const oX = (orbSmoothX.current / (window.innerWidth / 2)) * 15;
      const oY = (orbSmoothY.current / (window.innerHeight / 2)) * 15;
      const orbElement = document.querySelector('#interactive-orb-element') as HTMLElement;
      if (orbElement) {
        orbElement.style.transform = `translate3d(${oX}px, ${oY}px, 0)`;
      }



      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    animationFrameId.current = requestAnimationFrame(renderLoop);

    // 3. GSAP Parallax and Pinning Scroll Choreography
    const ctx = gsap.context(() => {
      
      // HERO PINNING & DEEP CHARCOAL TRANSITION
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#sec-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      heroTimeline.to(container, { backgroundColor: '#0B0B0D', ease: 'none' }, 0);
      heroTimeline.to('#hero-grid', { y: 150 * 0.2, opacity: 0, ease: 'none' }, 0);
      heroTimeline.to('#hero-circle', { y: 150 * 0.4, ease: 'none' }, 0);
      heroTimeline.to('#hero-text-col', { y: -150 * 0.1, opacity: 0, ease: 'none' }, 0);
      heroTimeline.to('#hero-cta-btn', { scale: 0.85, opacity: 0, ease: 'none' }, 0);

      // Hero Portrait
      const portraitTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#sec-hero',
          start: 'top top',
          end: '+=600',
          scrub: true,
        }
      });
      portraitTimeline.to('#hero-base-portrait', { scale: 1.08, x: -120, filter: 'grayscale(100%)', ease: 'power3.out' }, 0);
      portraitTimeline.to('#hero-reveal-portrait', { scale: 1.08, x: -120, filter: 'grayscale(100%)', ease: 'power3.out' }, 0);

      ScrollTrigger.create({
        trigger: '#sec-hero',
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
      });

      // SECTION 2: IDENTITY REVEAL PINNING
      const sec2Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#sec-identity',
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: true,
        }
      });
      sec2Timeline.from('#identity-word-span span', { opacity: 0, y: 40, stagger: 0.18, duration: 0.9, ease: 'power2.out' }, 0.1);
      sec2Timeline.to('#experiences-underline path', { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, '+=0.1');
      sec2Timeline.from('#identity-paragraph', { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out' }, '+=0.2');
      sec2Timeline.from('.stat-card-el', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
      }, '<0.15');

      sec2Timeline.to('#identity-heading-block', { opacity: 0, y: -60, duration: 0.6 }, '+=1.6');
      sec2Timeline.to('#identity-portrait', { scale: 1.15, filter: 'grayscale(100%) blur(6px)', duration: 0.6 }, '+=0.4');
      sec2Timeline.to('#identity-glow', { opacity: 0, duration: 0.6 }, '+=0.4');

      // SECTION 3: DESIGN PHILOSOPHY PINNING & ORB ZOOM
      const philosophyTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#sec-philosophy',
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: true,
        }
      });
      philosophyTimeline.to(container, { backgroundColor: '#09090B', ease: 'none' }, 0);
      philosophyTimeline.from('#phi-line-1', { opacity: 0, y: 40, duration: 1, ease: 'power2.out' }, 0.1);
      philosophyTimeline.from('#phi-line-2', { opacity: 0, y: 40, duration: 1, ease: 'power2.out' }, 0.5);
      philosophyTimeline.from('#phi-line-3', { opacity: 0, y: 40, duration: 1, ease: 'power2.out' }, 0.9);
      philosophyTimeline.from('#phi-line-4', { opacity: 0, y: 40, duration: 1, ease: 'power2.out' }, 1.3);
      philosophyTimeline.from('.phi-para-sent', { opacity: 0, y: 15, stagger: 0.15, duration: 0.8, ease: 'power2.out' }, 1.6);
      philosophyTimeline.to('.phi-glow-word', { filter: 'brightness(1.5)', color: '#60a5fa', textShadow: '0 0 20px rgba(96,165,250,0.5)', duration: 0.4 }, 1.0);
      philosophyTimeline.to('.phi-glow-word', { filter: 'brightness(1.0)', color: '#93c5fd', textShadow: 'none', duration: 0.4 }, 1.4);
      philosophyTimeline.to('#interactive-orb-container', { scale: 2.4, filter: 'blur(8px)', duration: 1.2, ease: 'power2.inOut' }, 2.0);
      // SECTION 4: EDITORIAL PROJECTS SHOWCASE (individual reveals for mobile reliability)
      if (window.innerWidth >= 768) {
        gsap.fromTo('#sec-showcase-title', 
          { opacity: 0, y: 40 }, 
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: '#sec-showcase-title', start: 'top 85%', toggleActions: 'play none none reverse' } }
        );

        gsap.utils.toArray('.project-card-item').forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0, y: 40, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      }

      // Parallax images
      gsap.utils.toArray('.project-image-parallax').forEach((img) => {
        gsap.to(img, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('.project-card-item'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      });

      // SECTION 5: SERVICES (individual reveals for mobile reliability)
      if (window.innerWidth >= 768) {
        gsap.utils.toArray('.service-card-item').forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      }


      // SECTION 8 (Word Manifesto)
      const wordsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#sec-manifesto',
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      });
      wordsTimeline.from('.man-word', { opacity: 0.12, y: 25, stagger: 0.1, ease: 'power1.out' });
    }, container);

    // Child sections create their triggers first; re-order pins by page position and recalc
    ScrollTrigger.sort();
    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      cancelAnimationFrame(refreshId);
      window.removeEventListener('load', onLoad);
      lenis.destroy();
      ctx.revert();
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);





  
  // Event handlers for Hero Mask Pointer
  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      rawX.current = x;
      rawY.current = y;
      
      if (smoothX.current === -999 || smoothY.current === -999) {
        smoothX.current = x;
        smoothY.current = y;
      }
      targetRadius.current = REVEAL_DESKTOP_RADIUS;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (e.pointerType === 'mouse') {
      rawX.current = x;
      rawY.current = y;
      targetRadius.current = REVEAL_DESKTOP_RADIUS;

      portraitMouseX.current = e.clientX - window.innerWidth / 2;
      portraitMouseY.current = e.clientY - window.innerHeight / 2;
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') {
      targetRadius.current = 0;
      portraitMouseX.current = 0;
      portraitMouseY.current = 0;
    }
  };

  // Section 2 interactive pointer handlers
  const handleSec2MouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    idPortraitMouseX.current = e.clientX - window.innerWidth / 2;
    idPortraitMouseY.current = e.clientY - window.innerHeight / 2;
  };

  const handleSec2MouseLeave = () => {
    idPortraitMouseX.current = 0;
    idPortraitMouseY.current = 0;
  };





  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isTouchActive.current = true;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    rawX.current = x;
    rawY.current = y;
    
    if (smoothX.current === -999 || smoothY.current === -999) {
      smoothX.current = x;
      smoothY.current = y;
    }
    targetRadius.current = REVEAL_MOBILE_RADIUS;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isTouchActive.current) {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      rawX.current = x;
      rawY.current = y;
    }
  };

  const handleTouchEnd = () => {
    isTouchActive.current = false;
    targetRadius.current = 0;
  };

  return (
    <div ref={containerRef} className="noise-bg select-none w-full bg-white overflow-x-hidden transition-colors duration-500">
      <style dangerouslySetInnerHTML={{ __html: ENTRANCE_STYLES }} />
      
      {/* 5. Navigation Overlay & Mobile Drawer */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-[max(1.5rem,safe-area-top)_max(4vw,1.5rem)_0] pointer-events-none animate-nav-down">
        <div className="flex items-center gap-3 select-none pointer-events-auto">
          <a href="#sec-hero" className="flex items-center gap-2.5 group bg-white/85 backdrop-blur-md border border-zinc-200/80 rounded-full pl-3 pr-4 py-1.5 shadow-sm">
            <svg className="w-6 h-6 text-[#0c111d] transition-transform group-hover:rotate-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M75 25H35L25 35L55 45L25 55L35 75H75L85 65H45L65 55L35 45L65 35L75 25Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" />
            </svg>
            <span className="text-[1.1rem] font-bold tracking-tight text-[#0c111d]">Likith</span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 pointer-events-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-6 py-2 rounded-full border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          {[
            { label: 'About', href: '#sec-identity' },
            { label: 'Work', href: '#sec-showcase' },
            { label: 'Tech Stack', href: '#sec-skills' },
            { label: 'Experience', href: '#sec-experience' },
            { label: 'Hackathons', href: '#sec-hackathons' },
          ].map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="relative text-[#0c111d]/75 dark:text-white/80 hover:text-[#0055ff] dark:hover:text-blue-400 font-medium text-xs tracking-wide uppercase transition-colors rounded py-1 px-1 group flex items-center font-mono"
            >
              {item.label}
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#0055ff] transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <a 
            href="mailto:likith.talla@svit.ac.in" 
            className="hidden sm:flex items-center justify-center bg-white text-[#0c111d] border border-zinc-200 font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-cyan-100 shadow-sm hover:shadow transition-all duration-300 min-h-[40px] focus:outline-none"
          >
            Get in touch &rarr;
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white shadow-sm focus:outline-none"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Slide-Out Navigation Drawer Overlay (Always mounted for DOM stability) */}
      <div 
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-lg md:hidden flex flex-col justify-between p-8 pt-28 transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'
        }`}
      >
        <div className="flex flex-col gap-6">
          <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">NAVIGATION</span>
          <div className="flex flex-col gap-5">
            {[
              { label: 'About Me', href: '#sec-identity' },
              { label: 'Selected Work', href: '#sec-showcase' },
              { label: 'Tech Stack & Skills', href: '#sec-skills' },
              { label: 'Experience', href: '#sec-experience' },
              { label: 'Hackathons', href: '#sec-hackathons' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-light text-white hover:text-blue-400 transition-colors flex items-center justify-between border-b border-white/10 pb-3"
              >
                <span>{item.label}</span>
                <span className="text-sm font-mono text-white/40">&rarr;</span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
          <a
            href="mailto:likith.talla@svit.ac.in"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-center text-sm shadow-md hover:bg-zinc-200 transition-colors"
          >
            Get In Touch &rarr;
          </a>
          <div className="flex justify-between text-xs font-mono text-white/50 pt-2">
            <a href="https://github.com/likith1502" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
            <a href="https://www.linkedin.com/in/likith1502" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* SECTION 1: HERO */}
      <section 
        id="sec-hero" 
        className="relative w-full h-screen overflow-hidden bg-[#08090c] flex items-center"
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {/* Layer 1: Base portrait */}
        <div
          id="hero-base-portrait"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover pointer-events-none animate-hero-base"
          style={{ backgroundImage: 'url("/images/Base_image_desktop.png")' }}
        />

        {/* Layer 2: Reveal portrait */}
        <div
          id="hero-reveal-portrait"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover pointer-events-none"
          style={{
            backgroundImage: 'url("/images/Reveal_image_desktop.png")',
            WebkitMaskImage: 'radial-gradient(circle var(--reveal-radius) at var(--reveal-x) var(--reveal-y), black 100%, transparent 100%)',
            maskImage: 'radial-gradient(circle var(--reveal-radius) at var(--reveal-x) var(--reveal-y), black 100%, transparent 100%)',
          }}
        />

        {/* Layer 3: Technical grid and large circle */}
        <div 
          id="hero-grid" 
          aria-hidden="true" 
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.06] border-t border-b border-white/20 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          
          {/* Construction circle */}
          <div className="absolute w-[80vh] aspect-square rounded-full border border-white/5" />
        </div>

        {/* Layer 4: Headline and copy */}
        <div className="absolute inset-0 flex flex-col justify-between p-[max(2.5rem,safe-area-top)_max(5.6vw,2rem)_8vh] pointer-events-none">
          
          {/* Heading */}
          <div className="flex flex-col items-start mt-[26vh] sm:mt-[30vh] md:mt-[34vh] px-[max(4vw,1rem)] sm:px-[max(5.6vw,2rem)]">
            <NameCycler />
          </div>

          {/* Bottom layout row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 w-full mt-auto px-[max(4vw,1rem)] sm:px-[max(5.6vw,2rem)] pb-4 sm:pb-8">
            {/* Bottom left copy & explore button */}
            <div className="flex flex-col items-start gap-5 sm:gap-6 max-w-[480px] animate-fade-up opacity-0 [animation-delay:750ms]">
              <p className="text-white/65 text-sm sm:text-[1.05rem] leading-relaxed font-light select-none">
                I build AI chatbots, voice agents and agent workflows, plus the full-stack systems that run them. Currently shipping conversational AI at Volta Cabs.
              </p>
              <a 
                href="#sec-showcase" 
                className="pointer-events-auto flex items-center justify-center bg-white hover:bg-cyan-100 text-[#0c111d] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none min-h-[40px] sm:min-h-[44px]"
              >
                Explore my work
              </a>
            </div>

            {/* Right side Fragment Mono manifesto */}
            <div className="font-mono text-xs tracking-[0.25em] text-white/45 text-left md:text-right select-none animate-fade-up opacity-0 [animation-delay:750ms]">
              <span className="block">15 HACKATHON WINS</span>
              <span className="block">SIH 2023 FINALIST</span>
              <span className="block">HYDERABAD, IN</span>
              <span className="flex md:justify-end gap-4 mt-4 pointer-events-auto tracking-[0.2em]">
                <a href="https://www.linkedin.com/in/likith1502" target="_blank" rel="noreferrer" className="text-white/70 hover:text-cyan-300 transition-colors">LINKEDIN &#8599;</a>
                <a href="https://github.com/likith1502" target="_blank" rel="noreferrer" className="text-white/70 hover:text-cyan-300 transition-colors">GITHUB &#8599;</a>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: IDENTITY REVEAL */}
      <section 
        id="sec-identity" 
        className="story-sec bg-[#0B0B0D] text-white px-[max(5.6vw,2rem)] flex items-center z-10"
        onMouseMove={handleSec2MouseMove}
        onMouseLeave={handleSec2MouseLeave}
      >
        <div className="w-full max-w-[90vw] mx-auto grid grid-cols-1 lg:grid-cols-[40%_60%] items-center gap-16">
          <div className="relative w-full flex items-center justify-center">
            <div 
              id="identity-glow"
              className="absolute w-[90%] aspect-square rounded-full bg-[#0055ff] blur-[100px] pointer-events-none z-0"
              style={{
                animation: 'idGlowCycle 8s ease-in-out infinite',
              }}
            />

            <div className="absolute w-[80%] aspect-square rounded-full border border-white/5 z-0" />

            <div 
              id="identity-portrait" 
              className="relative w-[85%] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-cover bg-center bg-no-repeat z-10 transition-transform duration-100 ease-out"
              style={{
                backgroundImage: 'url("/images/about-portrait.jpg")',
                animation: 'idFloatBreathing 10s ease-in-out infinite',
              }}
            />
          </div>

          <div id="identity-heading-block" className="flex flex-col items-start gap-8">
            <span className="font-mono tracking-[0.35em] text-white/60 text-xs uppercase block">01 / Who Am I?</span>

            <h2 className="text-white font-light leading-[0.90] tracking-tighter text-[clamp(2.5rem,5.2vw,5.5rem)] flex flex-col">
              <span className="block overflow-hidden pb-1">I don&apos;t just train models.</span>
              <span className="relative inline-block font-medium group cursor-pointer overflow-hidden pb-3">
                I ship{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[#0055ff] to-indigo-400 group-hover:from-blue-300 group-hover:via-blue-500 group-hover:to-indigo-300 transition-all duration-300">
                  intelligence.
                </span>
                
                <svg id="experiences-underline" className="absolute bottom-0 left-0 w-full h-3 pointer-events-none" viewBox="0 0 350 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 7C55 5.5 180 3 345 5.5" stroke="#0055ff" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="400" strokeDashoffset="400" />
                </svg>
              </span>
            </h2>

            <div id="identity-paragraph" className="max-w-[540px] text-white/70 text-[1.05rem] leading-relaxed font-light flex flex-col gap-6">
              <p className="text-white text-lg">
                Hi, I&apos;m <span className="font-semibold">Likith</span>, an applied AI engineer and full-stack builder from Hyderabad.
              </p>
              <p>
                I&apos;m studying Computer Science (AI &amp; ML) at SVIT, and I spend most of my time turning models into products people actually use. Right now that means building the AI chatbot and voice agent for Volta Cabs and AI automation at Riksu. Before that I built agent workflows at Single Point Solutions, backend systems at Pilot Mobility, and led frontend at iSoftware Labs.
              </p>
              <p>
                I learn fastest under pressure. I&apos;ve done 30+ hackathons, won around 15, and reached the Smart India Hackathon Grand Finale. I also founded <span className="text-white">Synapse</span>, our college&apos;s AI/ML club, so others get the same push.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mt-6">
              <div className="stat-card-el group flex flex-col items-start gap-2 p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.06] transition-colors">
                <span className="text-3xl font-semibold text-white">30+</span>
                <span className="text-[0.7rem] font-mono text-white/50 uppercase tracking-widest">Hackathons</span>
                <div className="w-full h-[1px] bg-cyan-400/20 mt-2 group-hover:bg-cyan-400/60 transition-colors" />
              </div>
              <div className="stat-card-el group flex flex-col items-start gap-2 p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.06] transition-colors">
                <span className="text-3xl font-semibold text-white">15</span>
                <span className="text-[0.7rem] font-mono text-white/50 uppercase tracking-widest">Wins</span>
                <div className="w-full h-[1px] bg-cyan-400/20 mt-2 group-hover:bg-cyan-400/60 transition-colors" />
              </div>
              <div className="stat-card-el group flex flex-col items-start gap-2 p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.06] transition-colors">
                <span className="text-3xl font-semibold text-white">5</span>
                <span className="text-[0.7rem] font-mono text-white/50 uppercase tracking-widest">Roles</span>
                <div className="w-full h-[1px] bg-cyan-400/20 mt-2 group-hover:bg-cyan-400/60 transition-colors" />
              </div>
              <div className="stat-card-el group flex flex-col items-start gap-2 p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.06] transition-colors">
                <span className="text-3xl font-semibold text-white">'27</span>
                <span className="text-[0.7rem] font-mono text-white/50 uppercase tracking-widest">Graduating</span>
                <div className="w-full h-[1px] bg-cyan-400/20 mt-2 group-hover:bg-cyan-400/60 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 01 / THE APPROACH */}
      <section id="sec-approach" className="story-sec bg-[#f8f9fa] text-zinc-900 py-32 px-[max(5.6vw,2rem)] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 pb-6 gap-4">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.2em] text-zinc-900 uppercase bg-zinc-200/90 px-3.5 py-1.5 rounded-full border border-zinc-300/80 shadow-2xs">THE APPROACH</span>
            <span className="font-mono text-xs font-semibold text-zinc-700">Engineering Philosophy</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <h2 className="lg:col-span-8 text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15] text-zinc-900">
              Models are the start. <br className="hidden md:inline" />
              <span className="font-semibold">Products are the point.</span>
            </h2>
            <div className="lg:col-span-4 flex flex-col gap-6 pt-2">
              <p className="text-zinc-600 text-sm md:text-base font-light leading-relaxed">
                I work across the whole stack: LLM workflows and agents, the APIs and databases behind them, and the interfaces people touch. Each part should be fast, reliable and easy to use.
              </p>
              <a href="#sec-identity" className="inline-flex items-center gap-2 font-mono text-xs text-zinc-900 font-medium tracking-wider hover:translate-x-1 transition-transform">
                <span>More about me</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 02 / SELECTED WORK + 03 / EXPERIENCE */}
      <WorkSection />
      <ExperienceSection />

      {/* 03 / TECH STACK & ECOSYSTEM — EXACT REFERENCE MATCH LAYOUT */}
      <section id="sec-skills" className="story-sec bg-[#f8f9fa] text-zinc-900 py-16 sm:py-24 px-[max(4vw,1.25rem)] sm:px-[max(5.6vw,2rem)] relative z-20 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-16">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.2em] text-zinc-900 uppercase bg-zinc-200/90 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-zinc-300/80 shadow-2xs">04 / TECH STACK &amp; ECOSYSTEM</span>
            <span className="font-mono text-[11px] sm:text-xs font-semibold text-zinc-700">Core Technologies</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Floating Tech Icons & Interactive Illustration Box */}
            <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[480px] flex items-center justify-center p-4 sm:p-8 bg-white border border-zinc-200/80 rounded-3xl shadow-sm overflow-hidden">
              {/* Grid Background Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

              {/* Floating Node.js Icon */}
              <div className="absolute top-4 sm:top-6 left-3 sm:left-6 animate-[float_6s_ease-in-out_infinite] z-10 flex items-center gap-2 sm:gap-2.5 bg-white/95 backdrop-blur border border-zinc-200/90 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-md hover:scale-105 transition-transform scale-90 sm:scale-100">
                <img src="https://api.iconify.design/logos:nodejs-icon.svg" alt="Node.js" className="w-5 h-5 sm:w-7 sm:h-7" />
                <span className="font-mono text-[10px] sm:text-xs font-semibold text-zinc-800">Node.js</span>
              </div>

              {/* Floating HTML5 Icon */}
              <div className="absolute top-12 sm:top-16 right-3 sm:right-6 animate-[float_7s_ease-in-out_infinite_1s] z-10 flex items-center gap-2 bg-white/95 backdrop-blur border border-zinc-200/90 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-md hover:scale-105 transition-transform scale-90 sm:scale-100">
                <img src="https://api.iconify.design/logos:python.svg" alt="Python" className="w-5 h-5 sm:w-7 sm:h-7" />
                <span className="font-mono text-[10px] sm:text-xs font-semibold text-zinc-800">Python</span>
              </div>

              {/* Floating Google Cloud Icon */}
              <div className="absolute top-4 sm:top-8 left-1/3 animate-[float_5s_ease-in-out_infinite_0.5s] z-10 flex items-center gap-2 bg-white/95 backdrop-blur border border-zinc-200/90 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-md hover:scale-105 transition-transform scale-90 sm:scale-100">
                <img src="https://api.iconify.design/logos:fastapi-icon.svg" alt="FastAPI" className="w-5 h-5 sm:w-7 sm:h-7" />
                <span className="font-mono text-[10px] sm:text-xs font-semibold text-zinc-800">FastAPI</span>
              </div>

              {/* Floating React Icon */}
              <div className="absolute bottom-16 sm:bottom-20 right-3 sm:right-8 animate-[float_6s_ease-in-out_infinite_1.5s] z-10 flex items-center gap-2 bg-white/95 backdrop-blur border border-zinc-200/90 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-md hover:scale-105 transition-transform scale-90 sm:scale-100">
                <img src="https://api.iconify.design/logos:react.svg" alt="React" className="w-5 h-5 sm:w-7 sm:h-7" />
                <span className="font-mono text-[10px] sm:text-xs font-semibold text-zinc-800">React</span>
              </div>

              {/* Floating Supabase Icon */}
              <div className="absolute bottom-24 sm:bottom-32 left-3 sm:left-6 animate-[float_8s_ease-in-out_infinite_0.8s] z-10 flex items-center gap-2 bg-white/95 backdrop-blur border border-zinc-200/90 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-md hover:scale-105 transition-transform scale-90 sm:scale-100">
                <img src="https://api.iconify.design/logos:postgresql.svg" alt="PostgreSQL" className="w-5 h-5 sm:w-7 sm:h-7" />
                <span className="font-mono text-[10px] sm:text-xs font-semibold text-zinc-800">PostgreSQL</span>
              </div>

              {/* Floating TypeScript Icon */}
              <div className="absolute top-36 sm:top-44 right-2 sm:right-4 animate-[float_6.5s_ease-in-out_infinite_0.3s] z-10 flex items-center gap-2 bg-white/95 backdrop-blur border border-zinc-200/90 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-md hover:scale-105 transition-transform scale-90 sm:scale-100">
                <img src="https://api.iconify.design/logos:typescript-icon.svg" alt="TypeScript" className="w-5 h-5 sm:w-7 sm:h-7" />
                <span className="font-mono text-[10px] sm:text-xs font-semibold text-zinc-800">TypeScript</span>
              </div>

              {/* Center Transparent Developer Illustration */}
              <div className="relative z-0 flex flex-col items-center justify-center pt-8 pb-4">
                <svg viewBox="0 0 260 220" className="w-56 sm:w-72 h-auto">
                  <defs><linearGradient id="nn" x1="0" x2="1"><stop offset="0" stopColor="#06b6d4" /><stop offset="1" stopColor="#2563eb" /></linearGradient></defs>
                  {[[30,50],[30,110],[30,170]].flatMap(([x1,y1]) => [[130,30],[130,85],[130,140],[130,195]].map(([x2,y2]) => <line key={`a${x1}${y1}${x2}${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#nn)" strokeOpacity="0.35" strokeWidth="1.5" className="nn-line" />))}
                  {[[130,30],[130,85],[130,140],[130,195]].flatMap(([x1,y1]) => [[230,80],[230,140]].map(([x2,y2]) => <line key={`b${x1}${y1}${x2}${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#nn)" strokeOpacity="0.35" strokeWidth="1.5" className="nn-line" />))}
                  {[[30,50],[30,110],[30,170],[130,30],[130,85],[130,140],[130,195],[230,80],[230,140]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="11" fill="white" stroke="url(#nn)" strokeWidth="3" style={{ animation: `float ${4 + (i % 3)}s ease-in-out ${i * 0.2}s infinite` }} />)}
                </svg>
                <div className="mt-4 flex flex-col items-center text-center">
                  <span className="font-mono text-xs sm:text-sm font-semibold text-zinc-900">Talla Likith</span>
                  <span className="text-zinc-500 font-sans text-[11px] sm:text-xs font-light">Models &rarr; APIs &rarr; Interfaces</span>
                </div>
              </div>
            </div>

            {/* Right Column: Categorized Tech Checklist with Official Tech Badges */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {[
                {
                  title: 'AI & Machine Learning',
                  skills: [
                    { name: 'LLM Integration', icon: 'https://api.iconify.design/logos:openai-icon.svg' },
                    { name: 'AI Agents', icon: 'https://api.iconify.design/logos:claude-icon.svg' },
                    { name: 'Chatbots & Voice', icon: 'https://api.iconify.design/logos:google-gemini.svg' },
                    { name: 'Computer Vision', icon: 'https://api.iconify.design/logos:opencv.svg' },
                    { name: 'Python', icon: 'https://api.iconify.design/logos:python.svg' },
                  ]
                },
                {
                  title: 'Backend',
                  skills: [
                    { name: 'FastAPI', icon: 'https://api.iconify.design/logos:fastapi-icon.svg' },
                    { name: 'Node.js', icon: 'https://api.iconify.design/logos:nodejs-icon.svg' },
                    { name: 'PostgreSQL', icon: 'https://api.iconify.design/logos:postgresql.svg' },
                    { name: 'SQL', icon: 'https://api.iconify.design/logos:mysql-icon.svg' },
                    { name: 'REST APIs', icon: 'https://api.iconify.design/logos:postman-icon.svg' },
                  ]
                },
                {
                  title: 'Frontend',
                  skills: [
                    { name: 'React', icon: 'https://api.iconify.design/logos:react.svg' },
                    { name: 'TypeScript', icon: 'https://api.iconify.design/logos:typescript-icon.svg' },
                    { name: 'JavaScript', icon: 'https://api.iconify.design/logos:javascript.svg' },
                    { name: 'Vite', icon: 'https://api.iconify.design/logos:vitejs.svg' },
                    { name: 'Tailwind CSS', icon: 'https://api.iconify.design/logos:tailwindcss-icon.svg' },
                    { name: 'Next.js', icon: 'https://api.iconify.design/logos:nextjs-icon.svg' },
                  ]
                },
                {
                  title: 'Tools & Core',
                  skills: [
                    { name: 'Git & GitHub', icon: 'https://api.iconify.design/logos:github-icon.svg' },
                    { name: 'VS Code', icon: 'https://api.iconify.design/logos:visual-studio-code.svg' },
                    { name: 'Postman', icon: 'https://api.iconify.design/logos:postman-icon.svg' },
                    { name: 'Data Structures', icon: 'https://api.iconify.design/logos:python.svg' },
                    { name: 'OOP', icon: 'https://api.iconify.design/logos:java.svg' },
                    { name: 'Database Design', icon: 'https://api.iconify.design/logos:postgresql.svg' },
                  ]
                },
                ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 hover:bg-white border border-zinc-200/60 hover:border-zinc-300 shadow-2xs hover:shadow-md transition-all duration-300 group cursor-pointer">
                  {/* Blue Checkmark Circle Badge */}
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-lg font-semibold text-zinc-900 tracking-tight group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((s, sIdx) => (
                        <div key={sIdx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100/90 border border-zinc-200/80 text-zinc-700 text-xs font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all">
                          <img src={s.icon} alt={s.name} className="w-3.5 h-3.5 object-contain" />
                          <span>{s.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* 05 / HACKATHONS */}
      <HackathonSection />
      <BeyondSection />



      {/* CINEMATIC CLOSING CTA & FOOTER */}
      <section id="sec-cta-footer" className="story-sec bg-[#050507] text-white pt-24 md:pt-32 pb-16 px-[max(4vw,1.5rem)] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between border-b border-white/10 pb-16 md:pb-20">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">GET IN TOUCH</span>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-extralight tracking-tight leading-tight md:leading-none text-white">
                Building something with AI? <br />
                <span className="text-white/50">Let&apos;s talk.</span>
              </h2>
            </div>

            {/* Social Logos & Email Action Buttons */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-5">
              <a
                href="mailto:likith.talla@svit.ac.in"
                className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all hover:scale-105 flex items-center gap-3 shadow-lg w-full sm:w-auto justify-center group text-sm"
              >
                <svg className="w-5 h-5 text-black group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Get In Touch</span>
                <span>&rarr;</span>
              </a>

              {/* Official Social Media Brand Logos Grid */}
              <div className="flex flex-wrap gap-3 items-center">
                <a
                  href="https://github.com/likith1502"
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub Profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-zinc-800 border border-white/10 hover:border-white/30 text-white text-xs font-mono transition-all hover:scale-105"
                >
                  <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/likith1502"
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn Profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-[#0077b5] border border-white/10 hover:border-blue-400 text-white text-xs font-mono transition-all hover:scale-105"
                >
                  <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs font-mono text-white/60">
            <div className="flex flex-col gap-2">
              <span className="text-white font-semibold text-base font-sans">Talla Likith</span>
              <span>Applied AI Engineer &amp; Full-Stack Builder</span>
              <span className="text-white/40 text-[11px] mt-1">Transforming ideas into production-ready web apps.</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white/40 uppercase">Navigation</span>
              <a href="#sec-identity" className="hover:text-white transition-colors">About</a>
              <a href="#sec-showcase" className="hover:text-white transition-colors">Work</a>
              <a href="#sec-skills" className="hover:text-white transition-colors">Tech Stack</a>
              <a href="#sec-experience" className="hover:text-white transition-colors">Experience</a>
              <a href="#sec-hackathons" className="hover:text-white transition-colors">Hackathons</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white/40 uppercase">Social &amp; Platforms</span>
              <a href="https://github.com/likith1502" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                <span>GitHub: @likith1502</span>
              </a>
              <a href="https://www.linkedin.com/in/likith1502" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span>LinkedIn: likith1502</span>
              </a>
            </div>
            <div className="flex flex-col gap-2 md:items-end">
              <span>Direct Contact</span>
              <a href="mailto:likith.talla@svit.ac.in" className="text-white hover:underline">likith.talla@svit.ac.in</a>
              <span className="text-white/30 mt-3">&copy; 2026 Talla Likith. All rights reserved.</span>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
