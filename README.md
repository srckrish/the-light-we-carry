# The Light We Carry

An interactive site about Nepal’s festival of lights. Read the five days of Tihar and the river ritual of Chhath, light a diya, draw a rangoli, and play small games that send lanterns into the night sky.

## What you can do

**Home.** Tap the central diya to light the valley. Draw a rangoli with mirrored strokes, then step into the five days of Tihar and Chhath.

**Story.** Walk the days in order, or open one directly:

| Day | Observance | What it honours |
| --- | --- | --- |
| 1 | Kaag Tihar | Crows as messengers |
| 2 | Kukur Tihar | Dogs and their loyalty |
| 3 | Gai Tihar and Laxmi Puja | The cow, and lamps for Goddess Laxmi |
| 4 | Goru Tihar and Mha Puja | Oxen, and the Newar worship of the self |
| 5 | Bhai Tika | The bond between sisters and brothers |
| — | Chhath Puja | Surya and Chhathi Maiya at the river |

Each chapter has a short ritual action that releases lanterns. On Chhath, a slider moves the scene from evening Arghya through the night to dawn. Arrow keys move between chapters.

**Play.** Six games at `/play`: Rangoli Studio, Footsteps of Laxmi, Which Day?, Match Pairs, Light Catch, and Wish Card Maker. Wins and saved cards add lights to the sky. Press Escape to leave a game.

Sound is off until you unmute it in the header. The header also counts how many lanterns you have released.

## Cultural notes

Festival wording is drawn from public sources and written so it does not claim every community observes these days the same way. Mha Puja is a Newar observance, kept distinct from Goru Tihar. See [SOURCES.md](SOURCES.md) for the references and review notes. Spellings should still be checked by a fluent Nepali speaker before publication.

## Run it locally

Requires Node.js.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run Oxlint |

## Stack

React 19, Vite, React Router, Tailwind CSS, GSAP, and a canvas night sky. Festival copy and quiz content live in `src/data/festivalData.js`. Shared light, sound, and toast state live in `src/context/LightContext.jsx`.

## Routes

- `/` — home
- `/story` and `/story/:dayId` — story chapters (`1`–`6`, or slugs such as `kaag` and `chhath`)
- `/play` and `/play/:gameId` — game hub and a single game (`rangoli`, `steps`, `quiz`, `match`, `catch`, `card`)
