# VAYU — Visual Direction

**Brand:** VAYU · Premium Indian-origin athleisure / performance fashion
**Tagline:** Built to Flow
**Core promise:** VAYU creates elevated performance wear built to move with the body and flow with modern life.

---

## 1. The World of VAYU

Vayu (वायु) is the Sanskrit word for wind — breath, air, movement. The visual world is
built on that single idea: **fabric behaving like air on a disciplined body.**

This is not an aggressive gym brand. No screaming reds, no distressed grunge, no
"beast mode" iconography. VAYU is quiet strength: a controlled studio, soft mist,
a body mid-motion, fabric a half-second behind it. Luxury athleisure campaign
language (Lululemon × Represent × fashion editorial) shot with the restraint of a
premium fragrance film.

**One-line brief for every asset:** *A premium motion-led fashion world where fabric,
breath, body movement, and light create a fluid performance atmosphere.*

---

## 2. Mood Pillars

| Pillar | Expression |
| --- | --- |
| **Fluid** | Fabric trailing motion, slow-motion drape, air streaks, floating dust |
| **Elegant** | Large negative space, editorial crops, restrained palette |
| **Futuristic** | Clean rim light, graphite surfaces, subtle blue-gray cast |
| **Breathable** | Mist, backlit knit texture, visible airflow, translucency |
| **Disciplined** | Symmetry, controlled poses, quiet intensity, no chaos |

---

## 3. Color System

| Token | Hex | Role |
| --- | --- | --- |
| Ink (black) | `#0B0C0E` | Primary background, cinematic base |
| Carbon | `#121417` | Section alternation |
| Graphite | `#1C1F24` | Cards, surfaces |
| Slate | `#2A2F37` | Elevated surfaces, numerals |
| Mist (soft blue-gray) | `#8B95A3` | Secondary text, atmosphere |
| Muted silver | `#C8CDD5` | Body text, fabric highlights |
| Paper / white | `#EEF0F3` / `#FAFBFC` | Headlines, primary CTA |
| Electric accent | `#8AB4FF` | Sparing: CTAs, glows, kickers, fabric rim |

Rule: the accent is **air, not neon** — it appears as glow, rim light, and micro-detail,
never as a flood fill. Ratio in any frame: ≥80% neutrals, ≤5% accent.

---

## 4. Typography

- **Display:** Space Grotesk (600–700) — geometric, slightly technical, futuristic
  without being sci-fi. Used for the wordmark, headlines, section titles, buttons.
- **Body:** Manrope (300–500) — elegant, airy sans for copy, forms, captions.
- Headlines set tight (`-0.01em`), kickers and labels wide-tracked (`+0.3em`,
  uppercase) — the tension between compressed display and airy labels is the
  typographic signature.

---

## 5. Camera Language

Reference register: luxury athleisure campaign · fashion editorial · performance
movement film · minimal futuristic sportswear campaign.

- **Lenses:** 35mm/50mm for environment, 85mm for portrait beats, 100mm macro for fabric.
- **Movement:** slow orbits (10–20°/s), push-ins on breath, gimbal-smooth tracking.
  Nothing handheld-jittery; the camera *flows* like the fabric.
- **Speed:** 50–120 fps conformed to 24 — motion should feel suspended, not slowed
  into syrup.
- **Framing:** generous headroom, negative space on the leading side of motion,
  editorial crops (waist-up, fabric-only frames, detail isolations).

---

## 6. Lighting

- Soft directional key (large source, 30–45° off axis), graphite falloff.
- **Clean rim light** — the brand's light signature: a cool silver/blue edge tracing
  shoulder, jaw, and fabric folds.
- Fabric highlights: raking light across knit to reveal texture and breathability.
- Airy shadows: lifted blacks in atmosphere, true black only in frame corners.
- Subtle mist / haze for depth; controlled floor reflections (semi-gloss, never mirror).

---

## 7. Motion Principles (film + web)

1. **Body-led:** movement starts from the body; fabric and camera respond.
2. **Breath cadence:** loops and eases follow an inhale–exhale rhythm (~4s cycles).
3. **Float, don't snap:** long ease-outs (`power3/power4`), 0.8–1.2s reveals.
4. **One hero motion per frame:** a single element flows; everything else is still.
5. **Continuity of air:** transitions read as wind — wipes of mist, fabric passing lens.

---

## 8. Web Art Direction

- Dark cinematic canvas, sections alternating Ink ↔ Carbon.
- Editorial storytelling order: Hero → Desire → Collection (horizontal scroll) →
  Fabric proof → Philosophy (Flow / Discipline / Modern movement) → Lookbook →
  Waitlist → Footer.
- Large whitespace, oversized display type, masked line reveals.
- Interactions: Lenis smooth scroll, GSAP ScrollTrigger, pinned horizontal
  collection rail, magnetic buttons, hover-lift product cards, parallax lookbook,
  mobile swipe galleries, film-grain overlay at 5% opacity.
- Placeholders: gradient-and-light studies stand in for photography until campaign
  assets are produced from `/asset-prompts/`.

---

## 9. Asset Map

| Asset | File | Used in |
| --- | --- | --- |
| Master hero image | `asset-prompts/00-master-hero-image.md` | Hero background |
| Clip 1 — Hero orbit | `asset-prompts/01-hero-orbit.md` | Hero (video swap) |
| Clip 2 — Macro detail | `asset-prompts/02-macro-detail.md` | Fabric proof section |
| Clip 3 — Process story | `asset-prompts/03-process-story.md` | Philosophy section |
| Clip 4 — Experience environment | `asset-prompts/04-experience-environment.md` | Lookbook |
| Clip 5 — Finale CTA | `asset-prompts/05-finale-cta.md` | Waitlist section |

Sections in `index.html` carry `data-asset` attributes pointing at their intended
asset so the swap-in is mechanical.

---

## 10. Guardrails

- **No fake logos** on garments unless the real VAYU mark is supplied; keep chests
  and thighs clean or use tonal texture.
- No aggressive tropes: no chalk clouds, no screaming, no dark-red "beast" grading.
- Skin: natural, warm-neutral retouch; athletic Indian models, 20s–30s, diverse builds.
- Never crush fabric detail — texture legibility is the proof of the product.
