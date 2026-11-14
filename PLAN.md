# The Light We Carry

**Tagline:** Gratitude, expressed as light.
**Central line:** A little light. A thousand reasons to be grateful.
**Pitch:** A quiet night, one unlit diya, and two festivals that remind us gratitude is what keeps the light going.

| | |
|---|---|
| Competition | KUCC Tihar-Chhath Web UI Design Competition 2026 |
| Track | Beginner (responsive landing page / microsite) |
| Judged on | UI/UX, animation, storytelling |
| Submission deadline | Nov 19, 2026, 11:59 PM |
| **My submit target** | **Nov 18, 2026, by 6 PM** |
| Repo | `the-light-we-carry` |

This file replaces `PLAN.md`. It merges the cultural and story depth of the uploaded blueprint with a plan that fits the 5 days we actually have.

---

## 0. Three non-negotiables

1. **Confirm registration with KUCC today.** The listed registration deadline was Nov 8. Message the organizers now, keep building while you wait, and do not assume late entry is accepted.
2. **Finished beats ambitious.** Five scenes that all work and look polished beat eight scenes where two are broken.
3. **Protect the two moments judges will remember:** the diya ignition at the start, and the final diya that connects back to it.

---

## 1. Why this can win: seven levers

| Lever | What we do | What a judge feels |
|---|---|---|
| Memorable first 10 seconds | Dark screen, one unlit diya, the visitor lights it | "I started the festival myself" |
| Circular story | The final diya is the same diya from Scene 1, still glowing | A complete story, not a pile of sections |
| Motion with meaning | Every animation maps to a story beat (see section 6) | Intentional, not decorative |
| Cultural care | Accurate names, no rigid dates, Mha Puja kept distinct, both Arghyas shown | Respect, which most entries will skip |
| Craft | Two fonts, one palette, generous space, hand-made SVG | A real identity, not a template |
| Works everywhere | Mobile first, reduced motion, keyboard access, fast load | Reliable on the judge's own phone |
| A reason to share | The greeting card is a designed artifact people want to post | The entry is remembered after judging |

Honest note: nobody can promise a win. These levers are what separate a winner from a good entry.

---

## 2. Concept and core message

Tihar and Chhath are different festivals with their own traditions and religious contexts. This project does **not** claim they are the same. It uses **light and gratitude as a creative bridge** so a visitor can appreciate each on its own terms.

- Tihar: thanks to crows, dogs, cows, oxen, the self (in the Newar tradition) and siblings.
- Chhath: devotion to Surya, the Sun God, and Chhathi Maiya, with offerings at the water at sunset and at sunrise.

Do not write "Chhath thanks the river". The river is the place of the offering, not the object of worship.

---

## 3. The experience: five scenes

Single page, scroll-led, with three interactive moments (light the diya, tap a Tihar chapter, make a card).

### Scene 1: The First Flame
**Purpose:** set the tone and invite the visitor in.
- Dark warm background, one unlit clay diya near the center, almost no text.
- Button label: **Light the first diya**. The diya itself is also the button.
- On click, tap or Enter/Space: the wick catches, a warm glow expands, the page lifts out of darkness, the intro lines appear.
- **If the visitor scrolls before lighting it:** auto-light it softly. Never block the page.
- After 3 seconds with no interaction: a gentle pulse hints at the diya.
- **Shared state:** a small React context (`lit`, `light()`) so this diya and the closing diya are the same object.

### Scene 2: Five Days, Five Lights (Tihar)
**Purpose:** introduce five chapters through a row of five lights that acts as the timeline.
- The row of lights is an artistic device, not a claim that each day involves exactly one diya.
- Each chapter: a short text, a custom SVG illustration (crow, dog, cow, ox, tika plate), one small animated detail.
- Scrolling to a chapter lights its diya. Tapping a diya in the timeline jumps to its chapter.
- No rigid calendar dates. Observances overlap and vary by community and year.

### Scene 3: Courtyard to Riverbank (Chhath)
**Purpose:** give Chhath its own chapter, not a short epilogue. One scroll-scrubbed scene with four states.
1. **Transition:** warm terracotta fades to blue hour. **The five Tihar diyas drift down and become the small lights along the riverbank.** This visual link ties the festivals together.
2. **Sandhya Arghya (sunset):** silhouettes standing in the water with offering baskets (soop, daura), sun sinking.
3. **Night:** stars, quiet water, small lights along the bank.
4. **Usha Arghya (sunrise):** first light on the water, sun rises, river turns gold.
- Also mention briefly: Nahay Khay and Kharna as the days before the Arghyas.
- Silhouettes only, at a distance, no faces. Never turn a sacred practice into spectacle.
- Do not show Chhath as only a sunrise ritual.

### Scene 4: A Light of Your Own (greeting card)
**Purpose:** turn the visitor from observer into participant.
- Input: name (max 24 characters) and a choice of three short wishes.
- Live preview, then **Download PNG**. **Share** via the Web Share API where supported, with download as the fallback.
- The card looks like a designed artifact: midnight background, diya glow, display serif, small motif border.
- Generated entirely in the browser. No name or message is uploaded, stored or logged.

### Scene 5: The Light Remains
**Purpose:** close the circle.
- Return to the original diya, now burning steadily. The environment is calmer and brighter.
- Copy: "The festivals may end. The light we carry stays." / "May gratitude find its way into every home."
- A clear **Light it again** control that scrolls back to the top with a smooth ease.

---

## 4. Copy bank (drafts, verify every line)

**Hero**
- A little light. A thousand reasons to be grateful.
- Every year we pause to honour the lives, bonds and blessings around us. It begins with a single flame.

**Tihar chapters** (Devanagari subtitle optional, see section 5)

| Day | Title | Draft line |
|---|---|---|
| 1 | Kaag Tihar, the crow | Crows are offered food and honoured as messengers. |
| 2 | Kukur Tihar, the dog | Dogs are thanked for their loyalty and protection with a tika and a garland. |
| 3 | Gai Tihar and Laxmi Puja | Cows are honoured by day, and at night homes glow with lamps to welcome Laxmi, goddess of prosperity. |
| 4 | Goru Tihar and Mha Puja | Oxen are thanked for the work of the fields. Around this day, the Newar community observes Mha Puja, honouring the self and welcoming the new year of Nepal Sambat. |
| 5 | Bhai Tika | Sisters bless their brothers with a colourful tika and wishes for a long life. |

**Chhath**
- Devotion to Surya, the Sun God, and Chhathi Maiya.
- At the water's edge, offerings are made to the setting sun, then to the rising sun.

**Closing**
- The festivals may end. The light we carry stays.

---

## 5. Cultural accuracy rules

1. Keep Tihar and Chhath distinct in text and visuals.
2. Describe Chhath as primarily dedicated to Surya and Chhathi Maiya, with offerings at rivers, ponds and other water bodies.
3. Include both **Sandhya Arghya** and **Usha Arghya**.
4. Present Mha Puja as its own Newar observance, not as another name for Goru Tihar.
5. No rigid dates. Say "around this day" where traditions overlap.
6. Do not imply every household or community does everything the same way. Kosi and similar practices are not universal.
7. Respectful imagery of worshippers: silhouettes, no faces, no spectacle.
8. Keep `SOURCES.md` with 4 to 6 credible sources (cultural, educational, tourism board, or community sources). Ask family or an elder to read the final copy.
9. **Nepali text:** use only text you or a fluent speaker has checked. A full language toggle is parked. The cheap, safe version is small **Devanagari subtitles** under the chapter titles, for example:
   - काग तिहार, कुकुर तिहार, गाई तिहार / लक्ष्मी पूजा, गोरु तिहार / म्ह पूजा, भाइटीका, छठ
   - Verify each spelling before it ships.

---

## 6. Visual identity and motion

**Feeling:** cinematic, warm, editorial, minimal. Negative space and light do the work. No stock photos.

### Palette (CSS variables, test contrast in real compositions)

| Token | Hex | Use |
|---|---|---|
| `--midnight` | `#11110F` | Main dark background |
| `--ivory` | `#F5EDDF` | Main text on dark |
| `--diya-gold` | `#D9A441` | Flame, glow, key accents |
| `--marigold` | `#E7A33E` | Tihar accent |
| `--vermilion` | `#9F452A` | Tika and small accents |
| `--terracotta` | `#B85C38` | Courtyard and earth tones |
| `--river` | `#416C70` | Chhath water |
| `--sunset` | `#E88D45` | Sandhya Arghya sky |
| `--sunrise` | `#F2C56E` | Usha Arghya sky |
| `--night` | `#0F1B2A` | Chhath night (added so the night state reads blue, not black) |

Do not use `--river` for body text on dark backgrounds, the contrast is too low.

### Typography
- Display: **Cormorant Garamond**, weight 500 to 600 and large sizes only (thin strokes fade at small sizes on dark)
- Body and UI: **DM Sans**
- Nepali: **Noto Sans Devanagari**
- Self-host through Fontsource or use Google Fonts with `display=swap` and a `preconnect`. Always define fallbacks.

### Imagery
- **No photography.** All visuals are original SVG. This avoids licensing risk, keeps one consistent look and keeps the page fast.
- Do not present AI-generated scenes as real festival photography.

### Motion map

| Motion | Meaning |
|---|---|
| Lighting the diya | Beginning and gratitude |
| Lights igniting one by one | The five chapters of Tihar |
| Diyas drifting to the riverbank | The bridge between the festivals |
| Sunset, night, sunrise | Chhath's ritual journey |
| Final diya connects to the first | Continuity: the light we carry |

Rules: animate `transform` and `opacity` only. Build glows with radial gradients, not large blur filters. One idea per animation. If it does not serve the story, cut it.

---

## 7. Tech stack

| Layer | Tool | Role |
|---|---|---|
| Framework | React + Vite | Components, shared light state |
| Styling | Tailwind CSS | Layout, spacing, tokens |
| Animation | GSAP + ScrollTrigger + `@gsap/react` | Ignition, scroll states, Chhath scrub |
| Graphics | Hand-made inline SVG | Diyas, animals, river, silhouettes |
| Card export | **Canvas 2D drawing** | Downloadable PNG |
| Hosting | GitHub + Vercel or Netlify | Live URL from day 1 |

**Decision log**

| Decision | Choice | Why |
|---|---|---|
| Three.js | **Not planned.** Decision gate on Tue evening only | An animated SVG flame plus a radial glow looks right and costs little. Three.js is the most likely thing to hurt mobile performance |
| Card export | Canvas drawing, not an HTML-to-image library | Fewer font and Safari bugs, full control of layout |
| Photography | Cut | Licensing, consistency, weight |
| Language toggle | Parked, Devanagari subtitles instead | Unreviewed Nepali is worse than none |
| Scenes | 5, not 6 | Merged Chhath and the transition into one scrubbed scene |
| Pinned scroll on mobile | Fallback to stacked panels | Pinning can feel janky on phones |

**Key patterns**

```js
// Respect reduced motion and handle mobile in one place
const mm = gsap.matchMedia();
mm.add(
  { reduce: "(prefers-reduced-motion: reduce)", small: "(max-width: 767px)" },
  (ctx) => {
    const { reduce, small } = ctx.conditions;
    if (reduce) { /* show final states, no scrub */ return; }
    // build timelines; skip pin when `small` is true
  }
);
```

- Use `useGSAP` with a `scope` ref so animations clean up properly in React.
- Card export: wait for `document.fonts.load(...)` before drawing, shrink the name text to fit the width, draw to a 1080 x 1350 canvas, export with `canvas.toBlob`, share with `navigator.canShare({ files })` when available.
- iOS Safari may open the image instead of saving it, so show a small "press and hold to save" hint as a fallback.

---

## 8. Project structure

```
the-light-we-carry/
  public/            favicon.svg
  src/
    components/
      diya/          Diya.jsx, Flame.jsx
      tihar/         TiharTimeline.jsx, TiharChapter.jsx
      chhath/        RiverScene.jsx, Silhouettes.jsx
      greeting/      GreetingForm.jsx, GreetingPreview.jsx
      svg/           Crow.jsx, Dog.jsx, Cow.jsx, Ox.jsx, TikaPlate.jsx, Offerings.jsx
    sections/        Hero, Tihar, Chhath, Greeting, Closing
    context/         LightContext.jsx
    hooks/           useReducedMotion.js
    data/            tihar.js, chhath.js, copy.js
    lib/             drawCard.js
    index.css
    App.jsx
    main.jsx
  IDEAS.md  PLAN.md  SOURCES.md  README.md
```

Add files when needed. Do not create empty abstractions.

---



## 10. Scope tiers

| Tier | Items |
|---|---|
| **P0 (must ship)** | Ignition hero, five Tihar chapters, Chhath sunset and sunrise, card preview and download, circular closing, responsive, reduced motion, keyboard access, deployed |
| **P1 (if on schedule)** | Devanagari subtitles, Chhath night state, Share action, pointer glow, README screenshots and a short screen recording |
| **P2 (only after P0 and P1 are polished)** | One extra micro-interaction, Three.js decision gate |
| **Parked** | Rangoli maker, Lenis, Spline, Rive, audio, Deusi-Bhailo section, full language toggle (see `IDEAS.md`) |

---

## 11. Quality gates

### The 30-second phone test (run daily from Sunday)
- [ ] Within 3 seconds, I know to tap the diya
- [ ] Ignition feels smooth, no stutter
- [ ] Scrolling stays smooth through Tihar and Chhath
- [ ] No horizontal scroll, text readable without zooming
- [ ] The card downloads on this phone

### Accessibility
- [ ] Diya is a real `<button>` with an accessible name, visible focus, Enter and Space work
- [ ] An `aria-live="polite"` message announces "The diya is lit"
- [ ] Reduced motion: lit state shows instantly, no scrub, Chhath states stack as panels
- [ ] Contrast checked on every background
- [ ] Logical heading order, `lang` attribute set, `aria-label` or alt on meaningful SVGs

### Performance
- [ ] Total transfer under about 1.5 MB
- [ ] No layout shift, fonts do not jump
- [ ] Test the production build, not just the dev server
- [ ] Fast on a slow connection and a mid-range phone

### Content
- [ ] Every cultural line checked against `SOURCES.md`
- [ ] No placeholder text, no console errors, favicon and page title set

---

## 12. Submission package

- [ ] Registration or late entry confirmed in writing by KUCC
- [ ] Exact submission method and required deliverables confirmed
- [ ] Public production URL tested on two phones and two browsers
- [ ] GitHub repo with a clean README (concept, stack, how to run, credits)
- [ ] 3 to 4 polished screenshots (mobile and desktop)
- [ ] A 30 to 45 second screen recording of the full journey (if the format allows)
- [ ] A short design note of about 150 words: the idea, why light, how motion serves the story
- [ ] All fonts, libraries and assets credited
- [ ] Submitted on Nov 18 with Nov 19 left as buffer

---

## 13. Risks

| Risk | Plan |
|---|---|
| Registration not accepted | Ask KUCC today, in writing. Keep building, since the work is still portfolio material |
| Not enough hours | Cut lines in section 9, P0 first |
| Pulled toward new ideas | Write them in `IDEAS.md`, keep building |
| Janky scroll on phones | Transform and opacity only, no pin on small screens, test daily |
| Cultural error | `SOURCES.md`, family review, softer wording when unsure |
| Card export fails on some browsers | Download plus press-and-hold fallback, test on your own phone early |
| Visitor never taps the diya | Auto-light on scroll, pulse hint after 3 seconds |

---

## 14. Working agreement

- I write the code, Claude explains, reviews and helps debug. When stuck, paste the code and the error and ask for an explanation, not a rewrite.
- End each day by checking the "done when" line. If met, stop.
- New ideas go in `IDEAS.md`.

## Guiding principles

1. Story before effects.
2. Accuracy before decoration.
3. Originality before templates.
4. Quality before quantity.
5. Mobile is first class.
6. Performance is part of polish.
7. Use only what I can explain and debug.
8. Finish what I start.