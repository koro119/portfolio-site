# Zylen Saldahna — Portfolio

A dark, lavender/violet-themed single-page portfolio for a final-year AI/ML Computer Science student. Content-first, data-driven from a machine-readable projects feed.

## Structure

Single scrollable page with a sticky nav (active-section highlighting, mobile menu):

1. **Hero / About Me** — photo, personality-forward intro, stats, and an interactive "About Me" quiz widget (a small rules-based model I built — weighted scoring over 4 dimensions → archetype readout).
2. **AI-Assisted** — projects built with heavy AI assistance and my direction. Transparent by design: fast execution that ships is a strength.
3. **From Scratch** — hand-written projects proving core CS fundamentals (cyan accent to tell it apart).
4. **Conceptual Experiments** — idea-first "lab notebook" entries (pink accent, dashed borders, open slots for future experiments).
5. **Work Experience** — the human side: hospitality/supervision/service roles, headlined by "I am not just 1s & 0s".
6. **Making of This Website** — an honest behind-the-scenes case study of the build process.

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 3 (custom lavender/violet + neon theme)
- Lucide icons, Geist + Geist Mono fonts

## How projects get onto the site

`public/projects.json` is the source of truth — copied from the `portfolio-index` repo (`~/repos/portfolio-index/projects.json`), which archives every project with tags:

- `AI-assisted` → AI-Assisted section
- `from-scratch` → From Scratch section
- `conceptual-experiment` → Conceptual Experiments section

To add/update a project: edit `public/projects.json` (or regenerate it from the archive) and rebuild. The UI filters by tag at runtime — no component changes needed.

## Content

- `src/config.ts` — all site copy: hero, about (incl. quiz questions/archetypes), work experience, making-of, footer, contact links.
- `src/hooks/useProjects.ts` — loads and groups the feed.
- `src/components/ProjectCard.tsx` — shared card with expandable "How I Did It" panel.
- `src/sections/` — one file per section.

## Quick Start

```bash
npm install
npm run dev      # local dev
npm run build    # production build → dist/
```

## Notes

- The **About/Hero photo** is `public/profile.jpg` (optimized from the original `IMG_1069.jpeg`).
- **Work Experience** is populated from the real CV (Farmer J, Oasis Lounge, The Real Eating Company, Marriott, Bubbleology, Knights Sound & Lights).
- **Contact details** (email, GitHub, LinkedIn) are set in `src/config.ts`.
- This site itself is an AI-assisted project in the archive (`portfolio-site`) — it's deliberately told in the "Making Of" section rather than as a card.

## Live

Deployed automatically to GitHub Pages on push to `main` (`.github/workflows/deploy.yml`): **https://koro119.github.io/portfolio-site/**
