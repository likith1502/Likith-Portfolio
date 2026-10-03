<div align="center">

# Talla Likith — Portfolio

**Applied AI Engineer · Full-Stack Builder · Hyderabad, India**

A cinematic, scroll-driven personal portfolio built with Next.js 14, GSAP and Lenis.

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=flat-square&logo=greensock&logoColor=black)](https://gsap.com)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com)

[**Live Site**](https://likith-portfolio.vercel.app) · [**LinkedIn**](https://www.linkedin.com/in/likith1502) · [**GitHub**](https://github.com/likith1502) · [**Email**](mailto:likith.talla@svit.ac.in)

</div>

---

## About

This is the source code for my personal portfolio. I'm a Computer Science (AI & ML) undergraduate at SVIT, Hyderabad, and I build AI chatbots, voice agents and agent workflows, along with the full-stack systems that run them.

The site is a single page that takes you through my work, experience and hackathon record, with smooth scrolling and motion throughout.

## Highlights

- **Multilingual hero:** my name cycles through English, Hindi and Telugu with line-by-line reveal animations.
- **Cursor reveal portrait:** a two-layer hero image with a radial mask that follows the cursor (or finger on mobile).
- **Horizontal project showcase:** a pinned section where vertical scrolling moves the project cards sideways, with a progress bar.
- **Scroll-drawn experience timeline:** the line draws itself as you scroll and each role slides into view.
- **Hackathon record:** animated count-up stats, achievement cards and a looping ticker.
- **Smooth scrolling:** Lenis synced with GSAP ScrollTrigger for consistent motion.
- **Fully responsive:** separate desktop and mobile animation paths through `gsap.matchMedia`.

## Sections

| # | Section | What it covers |
|---|---------|----------------|
| — | Hero | Name (EN / HI / TE), title, intro, social links |
| 01 | About | Who I am, in first person, with key stats |
| — | Approach | How I think about building with AI |
| 02 | Selected Work | VOLTA AI Chatbot, PowerPool, ProjectHub, FindIt, DataGenius AI, ANPR Traffic Challan, CrewSpace |
| 03 | Experience | Volta Cabs, Riksu, Single Point Solutions, Pilot Mobility, iSoftware Labs |
| 04 | Tech Stack | AI & ML, backend, frontend, tools |
| 05 | Hackathons | SIH 2023 Grand Finale, GDG Pixelverse Top 5, ISRO BAH 2026, Yuva Yodha 2026 |
| 06 | Beyond Code | Leadership (Synapse AIML Club, Techvani) and education |
| — | Contact | Email, LinkedIn, GitHub |

## Tech Stack

| Layer | Tools |
|-------|-------|
| Framework | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS, Google Fonts (Plus Jakarta Sans, JetBrains Mono, Noto Sans Devanagari, Noto Sans Telugu) |
| Motion | GSAP + ScrollTrigger, Lenis smooth scroll, Framer Motion |
| Deployment | Vercel |

## Project Structure

```
.
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Page entry and SEO metadata
│   └── globals.css             # Global styles and keyframes
├── components/
│   ├── glass-hero.tsx          # Header, hero, About, Approach, Tech Stack, Contact
│   ├── likith-sections.tsx     # Projects, Experience, Hackathons, Beyond Code
│   └── ui/                     # Shared UI pieces (magnetic button, cursor follower, ...)
└── public/
    └── images/
        ├── Base_image_desktop.png      # Hero base layer
        ├── Reveal_image_desktop.png    # Hero reveal layer
        ├── about-portrait.jpg          # About section portrait
        └── projects/                   # Project cover images
```

## Getting Started

**Prerequisites:** Node.js 18 or later and npm.

```bash
# Clone the repository
git clone https://github.com/likith1502/Likith-Portfolio.git
cd Likith-Portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Deployment

The site deploys on [Vercel](https://vercel.com) with zero configuration:

1. Import this repository on Vercel.
2. Click **Deploy**.

Every push to `main` triggers a new deployment automatically.

## Updating Content

Most content lives in plain data arrays, so updates don't require touching layout code:

- **Projects, experience, hackathons, leadership, education:** edit the `PROJECTS`, `EXPERIENCE`, `HACKATHONS`, `LEADERSHIP` and `EDUCATION` arrays in `components/likith-sections.tsx`.
- **Name variants and hero text:** edit `NAME_VARIANTS` and the hero copy in `components/glass-hero.tsx`.
- **Images:** replace files in `public/images/`. Hero layers should be 1920×1080 and pixel-aligned with each other; project covers work best at 1200×750.

## Credits

Design and layout are adapted from the open-source [glass portfolio](https://github.com/devendharoff/devendhar-glass-portfolio) by Devender Gopagoni. Content, sections and customizations are my own.

## Contact

**Talla Likith**
Email: [likith.talla@svit.ac.in](mailto:likith.talla@svit.ac.in)
LinkedIn: [linkedin.com/in/likith1502](https://www.linkedin.com/in/likith1502)
GitHub: [github.com/likith1502](https://github.com/likith1502)

---

<div align="center">
<sub>© 2026 Talla Likith. Personal content, images and text are not licensed for reuse.</sub>
</div>
