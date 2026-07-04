# VAYU Site — QA Report

**Date:** 2026-07-04 · **Environment:** Node 22.22.2, Vite 5.4.21, headless Chromium (Playwright)

## Commands

| Step | Command | Result |
| --- | --- | --- |
| Install | `npm install` | ✅ Pass — 0 vulnerabilities blocking, clean install |
| Lint | `npm run lint` (ESLint 9, flat config over `src/`) | ✅ Pass — 0 errors, 0 warnings |
| Build | `npm run build` | ✅ Pass — `dist/` in ~0.7s: HTML 23.8 kB (5.7 gz), CSS 22.0 kB (5.7 gz), JS 141.4 kB (53.3 gz) |
| Dev | `npm run dev` | ✅ Pass — serves at `http://localhost:5173` |

## Browser smoke test (headless Chromium)

Ran against the dev server at 1440×900 (desktop) and 390×844 (mobile), full-page
scroll to exercise every ScrollTrigger, plus form interaction.

| Check | Desktop | Mobile |
| --- | --- | --- |
| Page loads, preloader → hero intro plays | ✅ | ✅ |
| JS console errors / page errors | ✅ None (see note) | ✅ None (see note) |
| Body horizontal overflow | ✅ None | ✅ None |
| Pinned horizontal collection scroll | ✅ Track translates through all 7 cards | ✅ Falls back to native swipe + snap |
| Lookbook parallax / swipe | ✅ Parallax active | ✅ Swipe strip, captions always visible |
| Waitlist: empty submit blocked | ✅ Inline error + invalid field styling + focus | — |
| Waitlist: valid submit | ✅ Success state shown, lead persisted to `localStorage` (`vayu_waitlist`, 1 record) | — |
| Nav scroll behavior (blur bar, hide-on-scroll-down) | ✅ | ✅ burger menu opens/closes, locks scroll |

**Note:** the only failed network request in the sandbox was
`fonts.googleapis.com` (`ERR_CONNECTION_RESET`) — the test container blocks
external font CDNs. The site falls back gracefully to system sans; in
production the Google Fonts request resolves normally. If fully self-hosted
fonts are preferred before launch, download Space Grotesk + Manrope woff2 into
`public/fonts/` and swap the `<link>` for `@font-face` rules.

## Accessibility spot checks

- Landmarks: `header` nav, `main`, `footer`; labelled `nav` elements.
- All form inputs have explicit `<label for>`; error uses `role="alert"`.
- Focus-visible outlines styled; burger button has `aria-expanded`/`aria-controls`.
- Decorative layers (`grain`, placeholders, streaks) are `aria-hidden`.
- `prefers-reduced-motion`: preloader removed, Lenis/GSAP/parallax/magnetic all
  disabled, content rendered in final state.

## SEO checks

- Title, meta description, keywords, canonical, theme-color: ✅ present.
- Open Graph + Twitter card tags: ✅ (image URLs point to `/og/` — upload real
  OG image at launch).
- JSON-LD: ✅ `Organization` schema + `ItemList` of 6 placeholder `Product`
  entries (PreOrder availability).

## Known follow-ups (pre-launch)

1. Generate campaign assets from `/asset-prompts/` and replace gradient placeholders.
2. Wire `initWaitlistForm` in `src/main.js` to a real ESP/CRM endpoint (currently `localStorage`).
3. Upload real OG image (`/og/vayu-og.jpg`) and confirm final domain in canonical/schema URLs.
4. Optionally self-host fonts (see note above).
