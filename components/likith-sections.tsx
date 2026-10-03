'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Pill = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <span
    className={`inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full border w-fit ${
      dark ? 'text-white/80 bg-white/5 border-white/10' : 'text-zinc-900 bg-zinc-200/90 border-zinc-300/80'
    }`}
  >
    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
    {children}
  </span>
);

/* ---------------------------------------------------------------- */
/* 02 / SELECTED WORK — pinned horizontal scroll                     */
/* ---------------------------------------------------------------- */
export const PROJECTS = [
  {
    title: 'VOLTA AI Chatbot',
    desc: 'Production-grade conversational and voice agent backend for the VOLTA ride-booking platform, with multi-turn memory across text and voice and sub-second async responses.',
    tags: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'LLMs'],
    thumb: '/images/projects/volta.png',
    url: 'https://github.com/likith1502/volta-ai-chatbot',
    cta: 'View code',
  },
  {
    title: 'PowerPool',
    desc: 'AI neighbourhood energy platform that forecasts demand and solar output, then schedules flexible household loads to cut evening peak stress. Built for Yuva Yodha Energy Tech Hackathon 2026.',
    tags: ['Python', 'Forecasting', 'FastAPI', 'Scheduling'],
    thumb: '/images/projects/powerpool.png',
    url: 'https://github.com/likith1502/powerpool',
    cta: 'View code',
  },
  {
    title: 'ProjectHub',
    desc: 'A marketplace for academic resources: domain-wise projects with documentation, source code, PPTs and reports, searchable in one place.',
    tags: ['TypeScript', 'React', 'Vercel'],
    thumb: '/images/projects/projecthub.png',
    url: 'https://digital-project-marketplace.vercel.app',
    cta: 'Visit live',
  },
  {
    title: 'FindIt',
    desc: 'Public lost-and-found platform. Report lost or found items, get smart matches, and connect with finders securely.',
    tags: ['React', 'TypeScript', 'shadcn/ui'],
    thumb: '/images/projects/findit.png',
    url: 'https://github.com/likith1502/findit-safe-return',
    cta: 'View code',
  },
  {
    title: 'DataGenius AI',
    desc: 'An AI-powered web platform for intelligent data interaction. Ask questions in plain language and get insights back.',
    tags: ['React', 'Vite', 'TypeScript', 'AI'],
    thumb: '/images/projects/datagenius.png',
    url: '',
    cta: '',
  },
  {
    title: 'ANPR Traffic Challan',
    desc: 'Drone-based automatic number plate recognition for real-time traffic monitoring and automated challans. Smart India Hackathon 2023 Grand Finale.',
    tags: ['Computer Vision', 'OCR', 'Python'],
    thumb: '/images/projects/anpr.png',
    url: '',
    cta: '',
  },
  {
    title: 'CrewSpace',
    desc: 'A connecting space for students and coordinators at hackathons and events. Build a profile with your LinkedIn and links, find teammates and stay in touch with organisers.',
    tags: ['Next.js', 'TypeScript', 'Framer Motion', 'Community'],
    thumb: '/images/projects/crewspace.png',
    url: 'https://github.com/likith1502/crewspace',
    cta: 'View code',
  },
];

export function WorkSection() {
  const sec = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const t = track.current!;
        const dist = () => t.scrollWidth - window.innerWidth + 80;
        const tween = gsap.to(t, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: sec.current,
            start: 'top top',
            end: () => '+=' + dist(),
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>('.work-card').forEach((card) => {
          gsap.fromTo(
            card.querySelector('img'),
            { scale: 1.15 },
            { scale: 1, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } }
          );
        });
        gsap.to('#work-progress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: sec.current, start: 'top top', end: () => '+=' + dist(), scrub: true } });
      });
      mm.add('(max-width: 1023px)', () => {
        gsap.utils.toArray<HTMLElement>('.work-card').forEach((c) =>
          gsap.fromTo(c, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 88%' } })
        );
      });
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} id="sec-showcase" className="story-sec relative z-20 bg-[#f8f9fa] text-zinc-900 overflow-hidden lg:h-screen flex flex-col justify-center py-20 lg:py-0">
      <div className="px-[max(5.6vw,1.5rem)] flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-12">
        <div className="flex flex-col gap-4">
          <Pill>02 / Selected Work</Pill>
          <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-semibold tracking-tight leading-[1.05]">
            Things I&apos;ve built<br className="hidden sm:inline" /> &amp; shipped.
          </h2>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <p className="text-zinc-500 font-light max-w-sm md:text-right text-sm sm:text-base">
            AI agents, data platforms and full-stack products. Keep scrolling to move through the work.
          </p>
          <a href="https://github.com/likith1502" target="_blank" rel="noreferrer" className="font-mono text-xs font-semibold tracking-wider text-blue-600 uppercase hover:translate-x-1 transition-transform">
            All repos on GitHub &rarr;
          </a>
        </div>
      </div>

      <div ref={track} className="flex flex-col lg:flex-row gap-6 lg:gap-8 px-[max(5.6vw,1.5rem)] lg:w-max will-change-transform">
        {PROJECTS.map((p, i) => (
          <article key={p.title} className="work-card group lg:w-[min(560px,42vw)] shrink-0 bg-white rounded-[2rem] border border-zinc-200/80 p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)] transition-shadow duration-500 flex flex-col gap-5">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-200/70 bg-zinc-900">
              <img src={p.thumb} alt={`${p.title} preview`} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
              <span className="absolute top-3 left-3 font-mono text-[11px] font-semibold text-white bg-black/50 backdrop-blur px-2.5 py-1 rounded-full">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <div className="flex flex-col gap-3 px-1 flex-1">
              <h3 className="text-2xl font-semibold tracking-tight">{p.title}</h3>
              <p className="text-zinc-500 font-light text-sm leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-[11px] font-mono px-3 py-1 rounded-full bg-zinc-50 text-zinc-600 border border-zinc-200/80">{t}</span>
                ))}
              </div>
            </div>
            {p.url ? (
              <a href={p.url} target="_blank" rel="noreferrer" className="self-start inline-flex items-center gap-2 font-mono text-xs font-semibold text-white bg-zinc-900 hover:bg-black px-5 py-3 rounded-full transition-all">
                {p.cta} <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </a>
            ) : (
              <span className="self-start font-mono text-xs text-zinc-400 px-1 py-3">Case study coming soon</span>
            )}
          </article>
        ))}
      </div>

      <div className="hidden lg:block mx-[max(5.6vw,1.5rem)] mt-10 h-px bg-zinc-200 relative">
        <div id="work-progress" className="absolute inset-0 bg-zinc-900 origin-left scale-x-0" />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 03 / EXPERIENCE — scroll-drawn timeline                           */
/* ---------------------------------------------------------------- */
const EXPERIENCE = [
  {
    company: 'Volta Cabs Pvt. Ltd.',
    role: 'AI/ML Developer · Chatbot Development',
    period: '2026 — Present',
    current: true,
    points: [
      'Building the AI-powered chatbot and voice agent for the Volta ride-booking platform.',
      'Designing chatbot workflows and backend services with LLM-based conversations and API-driven responses.',
    ],
    stack: ['FastAPI', 'PostgreSQL', 'LLMs'],
  },
  {
    company: 'RIKSU · AI Automation Agency',
    role: 'Software Developer Intern · Engineering & Product',
    period: 'Sep 2026 — Present',
    current: true,
    points: [
      'Building AI agents, chatbots and automation workflows across WhatsApp, Instagram, voice and web.',
      'Integrating databases, APIs and third-party tools into production-grade systems, from design and code reviews through deployment.',
    ],
    stack: ['AI Agents', 'Automation', 'APIs'],
  },
  {
    company: 'Single Point Solutions',
    role: 'AI/ML Intern',
    period: 'May 2026 — Aug 2026',
    points: [
      'Built agent-based AI workflows for intelligent task automation across real-world applications.',
      'Worked hands-on with LLM-powered systems and agent orchestration.',
    ],
    stack: ['AI Agents', 'LLMs', 'Automation'],
  },
  {
    company: 'Pilot Mobility Pvt. Ltd.',
    role: 'Backend Developer · Part-Time',
    period: 'Aug 2025 — Mar 2026',
    points: ['Designed scalable database schemas and backend architecture.', 'Worked closely with frontend teams for seamless integration.'],
    stack: ['Node.js', 'SQL', 'REST APIs'],
  },
  {
    company: 'iSoftware Labs',
    role: 'Frontend Lead · Part-Time',
    period: '2024 — 2025',
    points: [
      'Led frontend development with React and Tailwind CSS.',
      'Built responsive UI components, improved performance and shipped across the full product lifecycle.',
    ],
    stack: ['React', 'Tailwind CSS', 'TypeScript'],
  },
];

export function ExperienceSection() {
  const sec = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('#exp-line', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '#exp-list', start: 'top 70%', end: 'bottom 70%', scrub: true } });
      gsap.utils.toArray<HTMLElement>('.exp-item').forEach((el) => {
        gsap.fromTo(el, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 82%' } });
        gsap.fromTo(el.querySelector('.exp-dot'), { scale: 0 }, { scale: 1, duration: 0.6, ease: 'back.out(3)', scrollTrigger: { trigger: el, start: 'top 75%' } });
      });
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} id="sec-experience" className="story-sec relative z-20 bg-[#0B0B0D] text-white py-24 sm:py-32 px-[max(5.6vw,1.5rem)] overflow-hidden">
      <div className="absolute -left-40 top-1/3 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-32 self-start">
          <Pill dark>03 / Experience</Pill>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
            Where I&apos;ve<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">shipped.</span>
          </h2>
          <p className="text-white/55 font-light leading-relaxed">
            Five roles across AI, automation, backend and frontend. I&apos;ve worked on chatbots, agent workflows, database design and the UIs on top.
          </p>
        </div>

        <div id="exp-list" className="lg:col-span-8 relative pl-8 sm:pl-12">
          <div className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-white/10" />
          <div id="exp-line" className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-300 to-blue-600 origin-top" />
          <div className="flex flex-col gap-8">
            {EXPERIENCE.map((e) => (
              <div key={e.company} className="exp-item relative group">
                <span className={`exp-dot absolute -left-8 sm:-left-12 top-7 w-[15px] h-[15px] sm:w-[23px] sm:h-[23px] rounded-full border-2 ${e.current ? 'border-cyan-300 bg-cyan-300/30' : 'border-white/30 bg-[#0B0B0D]'}`} />
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-cyan-300/30 p-6 sm:p-8 transition-all duration-500">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">{e.company}</h3>
                      <p className="text-cyan-300/90 text-sm mt-1">{e.role}</p>
                    </div>
                    <span className="font-mono text-[11px] tracking-widest uppercase text-white/45 shrink-0 flex items-center gap-2">
                      {e.current && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
                      {e.period}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-2 text-white/65 font-light text-sm sm:text-[15px] leading-relaxed">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex gap-3"><span className="text-cyan-300/70 mt-[2px]">&#8250;</span>{pt}</li>
                    ))}
                  </ul>
                  {e.stack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {e.stack.map((s) => (
                        <span key={s} className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 05 / HACKATHONS                                                   */
/* ---------------------------------------------------------------- */
const HACKATHONS = [
  { name: 'Smart India Hackathon 2023', badge: 'Grand Finalist', detail: 'Built a drone-based ANPR traffic challan system using computer vision for real-time monitoring.', org: 'Govt. of India', year: '2023', accent: 'from-orange-400 to-amber-300' },
  { name: 'GDG Pixelverse', badge: 'Top 5 · National', detail: 'Secured a top-5 finish at the national-level hackathon held in Mumbai.', org: 'Google Developer Groups', year: 'Mumbai', accent: 'from-blue-400 to-cyan-300' },
  { name: 'Bharatiya Antariksh Hackathon', badge: 'Participant', detail: 'Competed in ISRO’s national space-tech hackathon.', org: 'ISRO', year: '2026', accent: 'from-indigo-400 to-violet-300' },
  { name: 'Yuva Yodha Energy Tech Hackathon', badge: 'Built PowerPool', detail: 'Challenge 03, Grid Reliability: an AI platform that shifts household loads to solar-surplus hours.', org: 'Energy Tech', year: '2026', accent: 'from-lime-400 to-emerald-300' },
];

export function HackathonSection() {
  const sec = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hack-card', { y: 80, opacity: 0, rotateX: -12 }, { y: 0, opacity: 1, rotateX: 0, stagger: 0.12, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '#hack-grid', start: 'top 80%' } });
      gsap.utils.toArray<HTMLElement>('.hack-count').forEach((el) => {
        const end = Number(el.dataset.to);
        const o = { v: 0 };
        gsap.to(o, { v: end, duration: 1.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' }, onUpdate: () => { el.textContent = Math.round(o.v) + (el.dataset.suffix || ''); } });
      });
      gsap.to('#hack-marquee', { xPercent: -50, ease: 'none', duration: 30, repeat: -1 });
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} id="sec-hackathons" className="story-sec relative z-20 bg-[#f8f9fa] text-zinc-900 py-24 sm:py-32 overflow-hidden border-t border-zinc-200">
      <div className="px-[max(5.6vw,1.5rem)] max-w-7xl mx-auto flex flex-col gap-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="flex flex-col gap-5">
            <Pill>05 / Hackathons</Pill>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.02]">
              Built under<br />the clock.
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-6 sm:gap-10">
            {[
              { to: 30, s: '+', l: 'Hackathons' },
              { to: 15, s: '', l: 'Wins' },
              { to: 1, s: '', l: 'SIH Grand Finale' },
            ].map((x, i) => (
              <div key={i} className="flex flex-col">
                <span className="hack-count text-4xl sm:text-6xl font-semibold tracking-tight" data-to={x.to} data-suffix={x.s}>0</span>
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500 mt-1">{x.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div id="hack-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6 [perspective:1200px]">
          {HACKATHONS.map((h) => (
            <div key={h.name} className="hack-card group relative rounded-[2rem] bg-white border border-zinc-200/80 p-7 sm:p-9 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)] transition-shadow duration-500">
              <div className={`absolute -right-16 -top-16 w-56 h-56 rounded-full bg-gradient-to-br ${h.accent} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500`} />
              <div className="relative flex items-center justify-between mb-8">
                <span className={`font-mono text-[11px] font-bold tracking-widest uppercase text-white px-3 py-1.5 rounded-full bg-gradient-to-r ${h.accent}`}>{h.badge}</span>
                <span className="font-mono text-xs text-zinc-400">{h.year}</span>
              </div>
              <h3 className="relative text-2xl sm:text-3xl font-semibold tracking-tight mb-3">{h.name}</h3>
              <p className="relative text-zinc-500 font-light leading-relaxed">{h.detail}</p>
              <p className="relative font-mono text-[11px] uppercase tracking-widest text-zinc-400 mt-6">{h.org}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 border-y border-zinc-200 py-5 overflow-hidden">
        <div id="hack-marquee" className="flex w-max gap-12 font-mono text-sm uppercase tracking-[0.25em] text-zinc-400">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12 shrink-0">
              {['SIH 2023 Grand Finale', 'GDG Pixelverse Top 5', 'ISRO BAH 2026', 'Yuva Yodha 2026', '30+ Hackathons', '15 Wins', 'Founder · Synapse AIML Club'].map((t) => (
                <span key={t + k} className="flex items-center gap-12">{t}<span className="text-cyan-500">✦</span></span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 06 / BEYOND CODE — leadership + education                         */
/* ---------------------------------------------------------------- */
const LEADERSHIP = [
  { title: 'Founder & President', org: 'Synapse · AI/ML Club, SVIT', detail: 'Started the club and run it: workshops, industrial tours and hackathons for students getting into AI.', tag: 'Leadership' },
  { title: 'Editorial Board Member', org: 'Techvani · College Newsletter', detail: 'Writing and editing for the college tech newsletter (Sep – Dec 2026).', tag: 'Writing' },
  { title: 'Author, in progress', org: 'DataGenius AI', detail: 'Writing an article on building DataGenius AI, from idea to platform.', tag: 'Writing' },
];
const EDUCATION = [
  { school: 'Swami Vivekananda Institute of Technology', short: 'SVIT, Hyderabad', degree: 'B.Tech · CSE (AI & ML)', years: '2023 — 2027' },
  { school: 'St. Mary\u2019s Junior College', short: 'Secunderabad', degree: 'Intermediate · MPC', years: '2021 — 2023' },
  { school: 'Sarojini Naidu Memorial High School', short: 'Secunderabad', degree: 'SSC', years: '2020 — 2021' },
];

export function BeyondSection() {
  const sec = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.lead-card', { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '#lead-grid', start: 'top 82%' } });
      gsap.fromTo('.edu-row', { x: -40, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '#edu-list', start: 'top 85%' } });
    }, sec);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={sec} id="sec-beyond" className="story-sec relative z-20 bg-[#0B0B0D] text-white py-24 sm:py-32 px-[max(5.6vw,1.5rem)] overflow-hidden">
      <div className="absolute right-[-10%] top-10 w-[520px] h-[520px] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none" />
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <Pill dark>06 / Beyond Code</Pill>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.02]">
            Leading, writing,<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">learning.</span>
          </h2>
        </div>
        <div id="lead-grid" className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {LEADERSHIP.map((l) => (
            <div key={l.title} className="lead-card rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-cyan-300/30 transition-colors duration-500 p-7 flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/80">{l.tag}</span>
              <h3 className="text-xl font-semibold tracking-tight">{l.title}</h3>
              <p className="text-white/80 text-sm">{l.org}</p>
              <p className="text-white/55 font-light text-sm leading-relaxed">{l.detail}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-6">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/45">Education</span>
          <div id="edu-list" className="flex flex-col border-t border-white/10">
            {EDUCATION.map((e, i) => (
              <div key={e.school} className="edu-row group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-6 border-b border-white/10 items-baseline hover:bg-white/[0.02] transition-colors">
                <span className="md:col-span-1 font-mono text-xs text-white/35">0{i + 1}</span>
                <div className="md:col-span-6">
                  <h3 className={`tracking-tight ${i === 0 ? 'text-2xl sm:text-3xl font-semibold' : 'text-xl font-medium text-white/85'}`}>{e.school}</h3>
                  <p className="text-white/45 text-sm mt-1">{e.short}</p>
                </div>
                <span className={`md:col-span-3 text-sm ${i === 0 ? 'text-cyan-300' : 'text-white/60'}`}>{e.degree}</span>
                <span className="md:col-span-2 md:text-right font-mono text-xs text-white/45">{e.years}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
