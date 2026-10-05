# Fadhil Parmata — Portfolio

Motion-graphic resume site: React + TypeScript, three.js (via @react-three/fiber), GSAP (ScrollTrigger, SplitText, Flip) and Lenis smooth scroll.

Look: pastel neo-brutalism. Anton for display type, Plus Jakarta Sans for text, ink borders with hard shadows, a risograph grain, and halftone-dot particles.

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
| `src/index.css` | Colour tokens (`--color-*`), fonts, stickers, cards, buttons, grain |
| `src/lib/scroll.ts` | Lenis setup, shared scroll/pointer state, section → scene mapping |
| `src/three/shapes.ts` | Point-cloud generators (sphere, ring, helix, wave field, crystal, galaxy) |
| `src/three/scenes.ts` | One preset per section: shape, position, scale, tilt, opacity, colour balance |
| `src/three/shaders.ts` | Vertex/fragment shaders that morph particles between shapes |

The 3D layer is a single fixed, transparent `<Canvas>`. It sits above the section backgrounds and below the section content. As each section scrolls into view, the particle cloud morphs to that section's shape. To change what a section looks like in 3D (shape, position, dot colours), edit its row in `scenes.ts`. The order must match `SECTION_IDS` in `lib/scroll.ts`.

To recolour the site, change the tokens at the top of `src/index.css`. Each section passes its own colour and the previous section's colour to `SectionShell`.

## Accessibility & performance

- `prefers-reduced-motion`: no smooth scroll, no text/entrance animations, no idle drift or pointer effects.
- Phones and narrow screens use fewer particles and a centred, dimmed cloud.
- The three.js chunk is lazy-loaded; `PerformanceMonitor` drops the pixel ratio if FPS falls.

## Deploy

`npm run build` produces a static `dist/` folder — deploy it to Vercel, Netlify, Cloudflare Pages, GitHub Pages or any static host.
