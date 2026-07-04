# VAYU — Built to Flow

Premium cinematic brand site for **VAYU**, an Indian-origin athleisure / performance
fashion label. Pre-launch goals: brand identity, collection showcase, waitlist capture.

## Stack

- [Vite](https://vitejs.dev) — build + dev server
- [GSAP](https://gsap.com) + ScrollTrigger — reveals, pinned horizontal collection, parallax
- [Lenis](https://lenis.darkroom.engineering) — smooth scroll
- Vanilla JS + hand-rolled CSS (no framework), Space Grotesk + Manrope

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the build
npm run lint     # eslint over src/
```

## Structure

```
index.html                 # single-page site, SEO meta, JSON-LD (Organization + products)
src/main.js                # motion system (Lenis, GSAP, form, nav)
src/styles/main.css        # design system + all sections
docs/visual-direction.md   # brand + film art direction
docs/qa-report.md          # QA run results
asset-prompts/             # generation prompts for hero image + 5 campaign clips
```

## Sections

Hero → Desire → Collection (horizontal scroll / mobile swipe) → Fabric proof →
Philosophy (Flow · Discipline · Modern movement) → Lookbook (parallax / swipe) →
Waitlist form → Footer.

## Asset swap-in

Visual placeholders are gradient-and-light studies. Each section carries a
`data-asset` attribute naming the prompt file in `/asset-prompts` that produces
its final photography/film. Generate the assets, drop them in `public/`, and
replace the corresponding `*__placeholder` / `*__ph` elements.

## Waitlist data

There is no backend yet — submissions are validated client-side and stored in
`localStorage` under `vayu_waitlist`. Wire the form's submit handler in
`src/main.js` (`initWaitlistForm`) to your ESP/CRM endpoint before launch.
