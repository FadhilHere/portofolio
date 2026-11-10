# Fadhil Parmata — Portfolio

Motion-graphic resume site: React + TypeScript, GSAP (ScrollTrigger, SplitText, Flip), Lenis smooth scroll, and an interactive isometric figure in the hero built with the [Anatomy](https://github.com/wheresryan22/anatomy) kit.

Look: pastel neo-brutalism. Anton for display type, Plus Jakarta Sans for text, ink borders with hard shadows.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve dist/ locally
```

## Edit content

All text lives in [`src/data/resume.ts`](src/data/resume.ts) — profile, stats, experience, projects, achievements, organizations, skills. Components only handle layout and motion. The downloadable CV is `public/CV_FadhilParmata.pdf`; replace the file to update it.

## How it fits together

| Path | Role |
| --- | --- |
| `src/sections/*` | One component per page section (Hero → Contact) |
| `src/components/SectionShell.tsx` | Section background colour + the curtain (split / blinds / iris) that opens into it |
| `src/components/*` | Preloader, Nav, cursor, stickers, magnetic buttons, section headings |
| `src/index.css` | Colour tokens (`--color-*`), fonts, stickers, cards, buttons |
| `src/lib/scroll.ts` | Lenis setup, scroll locking, smooth scroll-to |
| `src/figures/desk.ts` | The hero figure: a faceless person typing a work log at a desk, with an AI bot beside him. The log lines come from `src/data/resume.ts` |
| `src/figures/IsoPlate.tsx` | React wrapper that renders a figure's SVG and mounts its live loop |
| `src/iso/` | The Anatomy kit (`iso-kit.ts`, `iso.css`), MIT licensed |

The hero figure is static SVG built once with the Anatomy kit; only the hands, the bot, the beam and the screen text move, written straight to the DOM each frame. It stops when offscreen. To change what gets typed, edit `LOG` in `src/figures/desk.ts`.

To recolour the site, change the tokens at the top of `src/index.css`. Each section passes its own colour and the previous section's colour to `SectionShell`.

## Accessibility & performance

- `prefers-reduced-motion`: no smooth scroll, no text/entrance animations, no pointer effects; the hero figure shows the full log, still.
- The hero figure is keyboard-focusable: right arrow finishes the current line, left arrow retypes it.

## Deploy

`npm run build` produces a static `dist/` folder — deploy it to Vercel, Netlify, Cloudflare Pages, GitHub Pages or any static host.
